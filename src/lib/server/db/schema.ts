import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';

export const typeIds = sqliteTable('type_ids', {
    id: integer('id').primaryKey(),
    name: text('name').notNull(),
});

export const marketHistory = sqliteTable('market_history', {
    typeId: integer('type_id')
        .references(() => typeIds.id)
        .notNull()
        .primaryKey(),
    lastDate: text('last_date').notNull(),
    volYesterday: integer('vol_yesterday').notNull(),
    avgPriceYesterday: integer('avg_price_yesterday').notNull(),
    orderCountYesterday: integer('order_count_yesterday').notNull(),
    sizeYesterday: integer('size_yesterday').notNull(),
});
