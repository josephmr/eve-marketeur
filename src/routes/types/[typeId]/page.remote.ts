import * as z from "zod";
import { query } from "$app/server";
import { db } from "$lib/server/db";
import { staStations } from "$lib/server/db/schema";
import esi from "$lib/server/api/esi";

const REGION_ID = 10000002; // The Forge

export const getMarketOrders = query(z.number(), async (typeId: number) => {
  const orders = await esi.market.orders.getAll(REGION_ID, typeId);
  const locationIds = new Set<number>([
    ...orders.buy.map((o) => o.locationId),
    ...orders.sell.map((o) => o.locationId),
  ]);

  return orders;
});
