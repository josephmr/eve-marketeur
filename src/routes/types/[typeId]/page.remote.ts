import * as z from "zod";
import { query } from "$app/server";
import esi from "$lib/server/api/esi";

const REGION_ID = 10000002; // The Forge

export const getMarketOrders = query(z.number(), async (typeId: number) => {
  return esi.market.orders.getAll(REGION_ID, typeId);
});
