import { drizzle } from "drizzle-orm/node-postgres";
import { eq } from "drizzle-orm";
import * as schema from "./schema";
import { env } from "$env/dynamic/private";

if (!env.DATABASE_URL) throw new Error("DATABASE_URL is not set");

export const db = drizzle(env.DATABASE_URL, { schema });

const { invTypes, invMarketGroups } = schema;

export const getTypeInfo = async (typeID: number) => {
  const rows = await db
    .select({ typeInfo: invTypes, marketGroup: invMarketGroups })
    .from(invTypes)
    .where(eq(invTypes.typeID, typeID))
    .leftJoin(
      invMarketGroups,
      eq(invTypes.marketGroupID, invMarketGroups.marketGroupID)
    )
    .limit(1);
  if (rows.length === 1) {
    return rows[0];
  }
  return null;
};
