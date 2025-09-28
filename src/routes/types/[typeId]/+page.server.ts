import { eq } from "drizzle-orm";
import { error } from "@sveltejs/kit";

import { db } from "$lib/server/db";
import { marketGroups, types } from "$lib/server/db/schema";

import { getMarketOrders } from "./page.remote";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
  const typeId = parseInt(params.typeId, 10);
  if (isNaN(typeId)) {
    throw error(400, "Invalid item type ID");
  }

  try {
    const rows = await db
      .select({ typeInfo: types, marketGroup: marketGroups })
      .from(types)
      .where(eq(types.typeId, typeId))
      .leftJoin(
        marketGroups,
        eq(types.marketGroupId, marketGroups.marketGroupId)
      )
      .limit(1);
    if (rows.length === 1) {
      const data = rows[0];
      const typeId = data.typeInfo.typeId;
      const orders = await getMarketOrders(typeId);
      return { ...data, orders };
    }
  } catch (e) {
    console.error("Database query error:", e);
    throw error(500, "Internal Server Error");
  }
  throw error(404, "Item not found");
};
