import { env } from "$env/dynamic/private";
import { redirect, type RequestEvent } from "@sveltejs/kit";
import { createSession, setSessionTokenCookie } from "$lib/server/sessions";
import * as crypto from "crypto";

export interface TokenInfo {
  characterID: number;
  characterName: string;
  expiresAt: Date;
  scopes: string;
  accessToken: DecryptedToken;
  refreshToken: DecryptedToken;
}

export type EncryptedToken = string & { __brand: "encrypted_token" };
export type DecryptedToken = string & { __brand: "decrypted_token" };

const ENCRYPTION_ALGORITHM = "aes-256-cbc";
const ENCRYPTION_KEY = Buffer.from(env.OAUTH_ENCRYPTION_KEY, "hex");

export function encryptToken(token: DecryptedToken): EncryptedToken {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(
    ENCRYPTION_ALGORITHM,
    ENCRYPTION_KEY,
    iv
  );

  let encrypted = cipher.update(token, "utf8", "hex");
  encrypted += cipher.final("hex");

  return (iv.toString("hex") + ":" + encrypted) as EncryptedToken;
}

export function decryptToken(token: EncryptedToken): DecryptedToken {
  try {
    const [ivHex, encrypted] = token.split(":");
    const iv = Buffer.from(ivHex, "hex");

    const decipher = crypto.createDecipheriv(
      ENCRYPTION_ALGORITHM,
      ENCRYPTION_KEY,
      iv
    );

    let decrypted = decipher.update(encrypted, "hex", "utf8");
    decrypted += decipher.final("utf8");

    return decrypted as DecryptedToken;
  } catch (error) {
    throw new Error("Failed to decrypt token");
  }
}

export async function initiateLogin(event: RequestEvent) {
  const state = crypto.randomUUID();

  event.cookies.set("eve_oauth_state", state, {
    path: "/",
    maxAge: 600, // 10 minutes
  });

  const params = new URLSearchParams({
    response_type: "code",
    client_id: env.EVE_CLIENT_ID!,
    redirect_uri: env.EVE_REDIRECT_URI!,
    scope: "publicData",
    state,
  });

  redirect(
    302,
    `https://login.eveonline.com/v2/oauth/authorize?${params.toString()}`
  );
}

export async function callback(event: RequestEvent) {
  const storedState = event.cookies.get("eve_oauth_state");
  event.cookies.delete("eve_oauth_state", { path: "/" });

  const code = event.url.searchParams.get("code");
  const state = event.url.searchParams.get("state");

  if (!state || !storedState || state !== storedState) {
    return new Response("Invalid state", { status: 400 });
  }

  const response = await fetch("https://login.eveonline.com/v2/oauth/token", {
    method: "POST",
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(`${env.EVE_CLIENT_ID}:${env.EVE_CLIENT_SECRET}`).toString(
          "base64"
        ),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code: code || "",
    }),
  });

  if (!response.ok) {
    console.error("Failed to fetch token:", await response.text());
    return new Response("Failed to fetch token", { status: 500 });
  }

  const data = await response.json();

  const tokenInfo = await verifyToken(data.access_token as DecryptedToken);
  if (!tokenInfo) {
    throw new Response("Failed to verify token", { status: 500 });
  }

  const session = await createSession({
    characterID: tokenInfo.CharacterID,
    characterName: tokenInfo.CharacterName,
    expiresAt: new Date(tokenInfo.ExpiresOn),
    scopes: tokenInfo.Scopes,
    accessToken: data.access_token as DecryptedToken,
    refreshToken: data.refresh_token as DecryptedToken,
  });

  setSessionTokenCookie(event, session.token);

  redirect(302, "/transactions");
}

interface VerifiedTokenInfo {
  CharacterID: number;
  CharacterName: string;
  ExpiresOn: string;
  Scopes: string;
  TokenType: string;
  CharacterOwnerHash: string;
  IntellectualProperty: string;
}

async function verifyToken(
  accessToken: DecryptedToken
): Promise<VerifiedTokenInfo | null> {
  const response = await fetch("https://login.eveonline.com/oauth/verify", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!response.ok) {
    return null;
  }
  const tokenInfo = await response.json();
  return tokenInfo;
}
