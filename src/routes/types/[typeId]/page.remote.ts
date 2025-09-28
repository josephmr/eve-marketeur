import * as z from "zod";
import { query } from "$app/server";
import esi, { type MarketOrder } from "$lib/server/api/esi";

const REGION_ID = 10000002; // The Forge

export const getMarketOrders = query(z.number(), async (typeId: number) => {
  return esi.market.orders.getAll(REGION_ID, typeId);
});

export const getMarketHistory = query(z.number(), async (typeId: number) => {
  return esi.market.orders.getHistory(REGION_ID, typeId);
});
