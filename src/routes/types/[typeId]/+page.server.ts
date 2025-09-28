import { eq } from "drizzle-orm";
import { error } from "@sveltejs/kit";

import { db } from "$lib/server/db";
import { invMarketGroups, invTypes } from "$lib/server/db/schema";

import { getMarketOrders } from "./page.remote";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
  console.time(`load:${params.typeId}`);
  const typeId = parseInt(params.typeId, 10);
  if (isNaN(typeId)) {
    throw error(400, "Invalid item type ID");
  }

  try {
    console.time(`load:db:${params.typeId}`);
    const rows = await db
      .select({ typeInfo: invTypes, marketGroup: invMarketGroups })
      .from(invTypes)
      .where(eq(invTypes.typeId, typeId))
      .leftJoin(
        invMarketGroups,
        eq(invTypes.marketGroupId, invMarketGroups.marketGroupId)
      )
      .limit(1);
    console.timeEnd(`load:db:${params.typeId}`);
    if (rows.length === 1) {
      const data = rows[0];
      console.time(`load:orders:${params.typeId}`);
      const orders = await getMarketOrders(data.typeInfo.typeId);
      console.timeEnd(`load:orders:${params.typeId}`);
      console.timeEnd(`load:${params.typeId}`);
      return { ...data, orders, time: new Date() };
    }
  } catch (e) {
    console.error("Database query error:", e);
    throw error(500, "Internal Server Error");
  }
  throw error(404, "Item not found");
};
