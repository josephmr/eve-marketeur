import { type RequestEvent } from "@sveltejs/kit";
import { initiateLogin } from "$lib/server/api/oauth";

export async function GET(event: RequestEvent) {
  await initiateLogin(event);
}
