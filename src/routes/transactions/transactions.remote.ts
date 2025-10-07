import { getRequestEvent, query } from "$app/server";
import { getAccessToken } from "$lib/server/sessions";
import esi from "$lib/server/api/esi";

export const getTransactions = query(async () => {
  const { locals } = getRequestEvent();
  if (!locals.session) return [];

  return await esi.wallet.getTransactions(
    await getAccessToken(locals.session),
    locals.session.oauthCharacterID
  );
});
