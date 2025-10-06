import { sessions } from "$lib/server/db/schema";
import { db } from "$lib/server/db";
import { timingSafeEqual, randomBytes, createHash } from "crypto";
import { eq } from "drizzle-orm";
import {
  encryptToken,
  decryptToken,
  refreshOauth,
} from "$lib/server/api/oauth";
import type { RequestEvent } from "@sveltejs/kit";
import type { TokenInfo, EncryptedToken } from "$lib/server/api/oauth";
import type { AccessToken } from "$lib/server/api/esi";
import { subSeconds, addSeconds } from "date-fns";
import { getRequestEvent } from "$app/server";

const SESSION_EXPIRATION_SECONDS = 7 * 24 * 60 * 60; // 7 days
const OAUTH_REFRESH_MARGIN_SECONDS = 30; // 30 seconds

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

export async function getAccessToken(session: Session): Promise<AccessToken> {
  const time = new Date();
  if (
    time >= subSeconds(session.oauthExpiresAt, OAUTH_REFRESH_MARGIN_SECONDS)
  ) {
    console.log("Refreshing access token for session", session.id);
    const refreshedOauth = await refreshOauth(
      decryptToken(session.oauthRefreshToken)
    );
    const updatedSessions = await refreshSession(session, {
      oauthAccessToken: encryptToken(refreshedOauth.access_token),
      oauthExpiresAt: addSeconds(new Date(), refreshedOauth.expires_in),
    });

    if (!updatedSessions || updatedSessions.length !== 1) {
      throw new Error("Failed to update session with refreshed token");
    }

    const event = getRequestEvent();
    if (event) {
      event.locals.session = updatedSessions[0];
    }

    return decryptToken(
      updatedSessions[0].oauthAccessToken
    ) as unknown as AccessToken;
  }

  return decryptToken(session.oauthAccessToken) as unknown as AccessToken;
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

async function refreshSession(
  session: Session,
  updates: Partial<Pick<Session, "oauthAccessToken" | "oauthExpiresAt">>
) {
  if (Object.keys(updates).length === 0) {
    return;
  }

  return await db
    .update(sessions)
    .set({
      ...updates,
      lastActivity: new Date(),
    })
    .where(eq(sessions.id, session.id))
    .returning()
    .execute();
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
