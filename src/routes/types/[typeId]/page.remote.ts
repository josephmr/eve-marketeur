import * as z from "zod";
import { query } from "$app/server";
import { db } from "$lib/server/db";
import { staStations } from "$lib/server/db/schema";
import esi, { type MarketOrder } from "$lib/server/api/esi";
import { inArray } from "drizzle-orm";

const REGION_ID = 10000002; // The Forge

type MarketOrderWithLocationName = MarketOrder & {
  locationName?: string;
};

export const getMarketOrders = query(z.number(), async (typeId: number) => {
  const orders: {
    buy: MarketOrderWithLocationName[];
    sell: MarketOrderWithLocationName[];
  } = await esi.market.orders.getAll(REGION_ID, typeId);
  const locationIds = new Set<number>([
    ...orders.buy.map((o) => o.locationId),
    ...orders.sell.map((o) => o.locationId),
  ]);

  const stations = await db
    .select({
      stationId: staStations.stationId,
      stationName: staStations.stationName,
    })
    .from(staStations)
    .where(inArray(staStations.stationId, Array.from(locationIds)));

  const stationMap = new Map(stations.map((s) => [s.stationId, s.stationName]));

  for (const orderList of [orders.buy, orders.sell]) {
    for (const order of orderList) {
      if (stationMap.has(order.locationId)) {
        order.locationName = stationMap.get(order.locationId)!;
      } else {
        order.locationName = order.locationId.toString();
      }
    }
  }

  return orders;
});
