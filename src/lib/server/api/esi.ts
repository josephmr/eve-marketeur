import * as z from "zod";
import { db } from "$lib/server/db";
import { staStations } from "$lib/server/db/schema";

// Helper function to convert snake_case to camelCase
function snakeToCamel(str: string): string {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}

// Helper function to convert object keys from snake_case to camelCase
function convertKeysToCamelCase<T extends Record<string, any>>(
  obj: T
): CamelCaseKeys<T> {
  const result: any = {};
  for (const [key, value] of Object.entries(obj)) {
    result[snakeToCamel(key)] = value;
  }
  return result;
}

type SnakeToCamel<S extends string> = S extends `${infer T}_${infer U}`
  ? `${T}${Capitalize<SnakeToCamel<U>>}`
  : S;
type CamelCaseKeys<T> = {
  [K in keyof T as SnakeToCamel<string & K>]: T[K];
};

const MarketOrderApiSchema = z.object({
  duration: z.number(),
  is_buy_order: z.boolean(),
  issued: z.string(),
  location_id: z.number(),
  min_volume: z.number(),
  order_id: z.number(),
  price: z.number(),
  range: z.enum([
    "station",
    "solarsystem",
    "region",
    "1",
    "2",
    "3",
    "4",
    "5",
    "10",
    "20",
    "30",
    "40",
  ]),
  system_id: z.number(),
  type_id: z.number(),
  volume_remain: z.number(),
  volume_total: z.number(),
});

const MarketOrder = MarketOrderApiSchema.transform(convertKeysToCamelCase);
export type MarketOrder = z.infer<typeof MarketOrder> & {
  locationName?: string;
};

const getAllMarketOrders = async (
  regionId: number,
  typeId: number
): Promise<{ buy: MarketOrder[]; sell: MarketOrder[] }> => {
  let page = 1;
  let pages = 1;
  let buyOrders: MarketOrder[] = [];
  let sellOrders: MarketOrder[] = [];

  let stations = db
    .select({
      stationId: staStations.stationId,
      stationName: staStations.stationName,
    })
    .from(staStations)
    .then(
      (stations) => new Map(stations.map((s) => [s.stationId, s.stationName]))
    );

  do {
    console.time(`esi:fetch:orders:${typeId}:${page}`);
    const response = await fetch(
      `https://esi.evetech.net/latest/markets/${regionId}/orders/?type_id=${typeId}&order_type=all&page=${page}`
    );
    console.timeEnd(`esi:fetch:orders:${typeId}:${page}`);
    const data: MarketOrder[] = z
      .array(MarketOrder)
      .parse(await response.json());

    for (const order of data) {
      if (order.isBuyOrder) {
        buyOrders.push(order);
      } else {
        sellOrders.push(order);
      }
    }

    if (response.headers.get("X-Pages")) {
      pages = parseInt(response.headers.get("X-Pages") || "1", 10);
    }
  } while (++page <= pages);

  const stationMap = await stations;
  for (const orderList of [buyOrders, sellOrders]) {
    for (const order of orderList) {
      if (stationMap.has(order.locationId)) {
        order.locationName = stationMap.get(order.locationId)!;
      } else {
        order.locationName = order.locationId.toString();
      }
    }
  }

  buyOrders.sort((a, b) => b.price - a.price);
  sellOrders.sort((a, b) => a.price - b.price);

  return { buy: buyOrders, sell: sellOrders };
};

const esi = {
  market: {
    orders: {
      getAll: getAllMarketOrders,
    },
  },
};

export default esi;
