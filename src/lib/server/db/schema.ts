import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";

export const types = sqliteTable("types", {
  typeId: integer("type_id").primaryKey(),
  groupId: integer("group_id").notNull(),
  typeName: text("type_name").notNull(),
  description: text("description"),
  mass: integer("mass").notNull(),
  volume: integer("volume").notNull(),
  capacity: integer("capacity").notNull(),
  portionSize: integer("portion_size").notNull(),
  raceId: integer("race_id"),
  basePrice: integer("base_price"),
  published: integer("published").notNull(),
  marketGroupId: integer("market_group_id"),
  iconId: integer("icon_id"),
  soundId: integer("sound_id"),
  graphicId: integer("graphic_id"),
});

export const marketGroups = sqliteTable("market_groups", {
  marketGroupId: integer("market_group_id").primaryKey(),
  parentGroupId: integer("parent_group_id"),
  marketGroupName: text("market_group_name").notNull(),
  description: text("description"),
  iconId: integer("icon_id"),
  hasTypes: integer("has_types").notNull(),
});

export const marketHistory = sqliteTable("market_history", {
  typeId: integer("type_id")
    .references(() => types.typeId)
    .notNull()
    .primaryKey(),
  lastDate: text("last_date").notNull(),
  volYesterday: integer("vol_yesterday").notNull(),
  avgPriceYesterday: integer("avg_price_yesterday").notNull(),
  orderCountYesterday: integer("order_count_yesterday").notNull(),
  sizeYesterday: integer("size_yesterday").notNull(),
});
