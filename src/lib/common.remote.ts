import { query } from "$app/server";
import esi from "$lib/server/api/esi";
import z from "zod";

export const getCharacterInfo = query(z.number(), async (characterID) => {
  return await esi.character.getInfo(characterID);
});
