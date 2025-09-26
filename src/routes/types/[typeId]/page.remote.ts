import * as z from "zod";
import { query } from "$app/server";

const REGION_ID = 10000002; // The Forge

interface MarketOrder {
  duration: number;
  is_buy_order: boolean;
  issued: string;
  location_id: number;
  min_volume: number;
  order_id: number;
  price: number;
  range:
    | "station"
    | "solarsystem"
    | "region"
    | "1"
    | "2"
    | "3"
    | "4"
    | "5"
    | "10"
    | "20"
    | "30"
    | "40";
  system_id: number;
  type_id: number;
  volume_remain: number;
  volume_total: number;
}

export const getMarketOrders = query(z.number(), async (typeId: number) => {
  let page = 1;
  let pages = 1;
  let buyOrders: MarketOrder[] = [];
  let sellOrders: MarketOrder[] = [];
  do {
    const response = await fetch(
      `https://esi.evetech.net/latest/markets/${REGION_ID}/orders/?type_id=${typeId}&order_type=all&page=${page}`
    );
    const data: MarketOrder[] = await response.json();
    for (const order of data) {
      if (order.is_buy_order) {
        buyOrders.push(order);
      } else {
        sellOrders.push(order);
      }
    }
    if (response.headers.get("X-Pages")) {
      pages = parseInt(response.headers.get("X-Pages") || "1", 10);
    }
  } while (++page <= pages);
  return { buy: buyOrders, sell: sellOrders };
});
