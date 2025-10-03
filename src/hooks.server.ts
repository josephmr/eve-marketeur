import type { Handle } from "@sveltejs/kit";
import {
  deleteSessionTokenCookie,
  validateSessionToken,
} from "$lib/server/sessions";

const authHandle: Handle = async ({ event, resolve }) => {
  const sessionToken = event.cookies.get("session");

  if (sessionToken) {
    const session = await validateSessionToken(sessionToken);
    if (session) {
      event.locals.session = session;
      return resolve(event);
    } else {
      deleteSessionTokenCookie(event);
    }
  }

  event.locals.session = null;
  return resolve(event);
};

export const handle = authHandle;
