import { sessions } from "$lib/server/db/schema";
import { db } from "$lib/server/db";
import { timingSafeEqual, randomBytes, createHash } from "crypto";
import { eq } from "drizzle-orm";
import { encryptToken } from "$lib/server/api/oauth";
import type { RequestEvent } from "@sveltejs/kit";
import type { TokenInfo, EncryptedToken } from "$lib/server/api/oauth";

const SESSION_EXPIRATION_SECONDS = 7 * 24 * 60 * 60; // 7 days

export interface Session {
  id: string;
  secretHash: string;

  createdAt: Date;
  lastActivity: Date;

  oauthCharacterID: number;
  oauthAccessToken: EncryptedToken;
  oauthRefreshToken: EncryptedToken;
  oauthScopes: string;
  oauthExpiresAt: Date;
}

interface SessionWithToken extends Session {
  token: string;
}

export function setSessionTokenCookie(event: RequestEvent, token: string) {
  event.cookies.set("session", token, {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
  });
}

export function deleteSessionTokenCookie(event: RequestEvent) {
  event.cookies.delete("session", { path: "/" });
}

export async function createSession(
  tokenInfo: TokenInfo
): Promise<SessionWithToken> {
  const now = new Date();

  const id = randomBytes(16).toString("hex");
  const secret = randomBytes(32).toString("hex");
  const secretHash = createHash("sha256").update(secret).digest("hex");

  const token = `${id}:${secret}`;

  const session: Session = {
    id,
    secretHash,
    createdAt: now,
    lastActivity: now,

    oauthCharacterID: tokenInfo.characterID,
    oauthAccessToken: encryptToken(tokenInfo.accessToken),
    oauthRefreshToken: encryptToken(tokenInfo.refreshToken),
    oauthScopes: tokenInfo.scopes,
    oauthExpiresAt: tokenInfo.expiresAt,
  };

  await db.insert(sessions).values(session);

  return { ...session, token };
}

export async function validateSessionToken(
  token: string
): Promise<Session | null> {
  const tokenParts = token.split(":");
  if (tokenParts.length !== 2) {
    return null;
  }
  const sessionId = tokenParts[0];
  const sessionSecret = tokenParts[1];

  const session = await getSession(sessionId);
  if (!session) {
    return null;
  }

  const providedHash = createHash("sha256").update(sessionSecret).digest("hex");

  const validSecret = timingSafeEqual(
    Buffer.from(providedHash),
    Buffer.from(session.secretHash)
  );

  if (!validSecret) {
    return null;
  }

  return session;
}

async function getSession(sessionId: string): Promise<Session | null> {
  const now = new Date();

  const rows = await db
    .select()
    .from(sessions)
    .where(eq(sessions.id, sessionId))
    .limit(1)
    .execute();
  if (rows.length === 0) {
    return null;
  }
  const session = rows[0];

  // Check expiration
  if (
    now.getTime() - session.createdAt.getTime() >=
    SESSION_EXPIRATION_SECONDS * 1000
  ) {
    await deleteSession(sessionId);
    return null;
  }

  return session;
}

async function deleteSession(sessionId: string): Promise<void> {
  await db.delete(sessions).where(eq(sessions.id, sessionId)).execute();
}
