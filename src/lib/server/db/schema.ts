import {
  sqliteTable,
  integer,
  text,
  real,
  numeric,
} from "drizzle-orm/sqlite-core";

export const invTypes = sqliteTable("invTypes", {
  typeId: integer().primaryKey(),
  groupId: integer().notNull(),
  typeName: text().notNull(),
  description: text().notNull(),
  mass: real().notNull(),
  volume: real().notNull(),
  capacity: real().notNull(),
  portionSize: integer().notNull(),
  raceId: integer(),
  basePrice: numeric(),
  published: numeric().notNull(),
  marketGroupId: integer(),
  iconId: integer(),
  soundId: integer(),
  graphicId: integer().notNull(),
});

export const invMarketGroups = sqliteTable("invMarketGroups", {
  marketGroupId: integer().primaryKey(),
  parentGroupId: integer(),
  marketGroupName: text().notNull(),
  description: text().notNull(),
  iconId: integer(),
  hasTypes: numeric().notNull(),
});
