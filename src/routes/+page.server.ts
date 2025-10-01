import { redirect } from "@sveltejs/kit";

export function load() {
  redirect(307, "/types/36");
}
