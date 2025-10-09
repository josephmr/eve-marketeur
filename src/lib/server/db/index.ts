import { drizzle } from "drizzle-orm/node-postgres";
import { eq, inArray } from "drizzle-orm";
import * as schema from "./schema";
import { env } from "$env/dynamic/private";

if (!env.DATABASE_URL) throw new Error("DATABASE_URL is not set");

export const db = drizzle(env.DATABASE_URL, { schema });

const { invTypes, invMarketGroups } = schema;

export const getTypeInfo = async (typeIDs: number[]) => {
  const rows = await db
    .select({ typeInfo: invTypes, marketGroup: invMarketGroups })
    .from(invTypes)
    .where(inArray(invTypes.typeID, typeIDs))
    .leftJoin(
      invMarketGroups,
      eq(invTypes.marketGroupID, invMarketGroups.marketGroupID)
    );
  return rows;
};
