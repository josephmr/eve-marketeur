import { callback } from "$lib/server/api/oauth";
import { type RequestEvent } from "@sveltejs/kit";

export async function GET(event: RequestEvent) {
  await callback(event);
}
