import { getRequestEvent, query } from "$app/server";
import * as db from "$lib/server/db";
import esi from "$lib/server/api/esi";
import z from "zod";
import { error } from "@sveltejs/kit";

export const getCharacterID = query(async () => {
  const { locals } = getRequestEvent();
  return locals.session?.oauthCharacterID || null;
});

export const getCharacterInfo = query(async () => {
  const characterID = await getCharacterID();
  if (!characterID) {
    return null;
  }
  const info = await esi.character.getInfo(characterID);
  return {
    ...info,
    characterID,
  };
});

export const getTypeInfo = query(z.number(), async (typeID: number) => {
  const info = await db.getTypeInfo(typeID);
  if (!info) {
    error(404, "Item not found");
  }
  return info;
});
