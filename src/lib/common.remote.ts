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

export const getTypeInfoOrError = query(z.number(), async (typeID) => {
  const info = await db.getTypeInfo([typeID]);
  if (info.length === 0) {
    throw error(404, "Type not found");
  }
  return info[0];
});

export const getTypeInfo = query.batch(
  z.number(),
  async (typeIDs: number[]) => {
    const info = await db.getTypeInfo(typeIDs);
    const map = new Map(info.map((i) => [i.typeInfo.typeID, i]));
    return (typeID: number) => {
      return map.get(typeID) || null;
    };
  }
);
