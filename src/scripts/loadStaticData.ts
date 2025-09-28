import { db } from "$lib/server/db";
import { marketGroups, types } from "$lib/server/db/schema";
import type { SQLiteTable } from "drizzle-orm/sqlite-core";
import {
  parse,
  type CastingContext,
  type CastingFunction,
  type ColumnOption,
} from "csv-parse/sync";

const chunkSize = 500;

function typesCast(value: string, context: CastingContext) {
  if (context.header) return value;

  const intColumns = [
    "typeId",
    "groupId",
    "mass",
    "volume",
    "capacity",
    "portionSize",
    "raceId",
    "basePrice",
    "published",
    "marketGroupId",
    "iconId",
    "soundId",
    "graphicId",
  ];
  if (intColumns.includes(context.column as string)) {
    const intValue = parseInt(value, 10);
    if (context.column === "graphicId" && intValue === 0) return null;
    return isNaN(intValue) ? null : intValue;
  }
  return value;
}

const typesColumns = () => [
  "typeId",
  "groupId",
  "typeName",
  "description",
  "mass",
  "volume",
  "capacity",
  "portionSize",
  "raceId",
  "basePrice",
  "published",
  "marketGroupId",
  "iconId",
  "soundId",
  "graphicId",
];

const marketGroupsColumns = () => [
  "marketGroupId",
  "parentGroupId",
  "marketGroupName",
  "description",
  "iconId",
  "hasTypes",
];

function marketGroupsCast(value: string, context: CastingContext) {
  if (context.header) return value;

  const intColumns = ["marketGroupId", "parentGroupId", "iconId", "hasTypes"];
  if (intColumns.includes(context.column as string)) {
    const intValue = parseInt(value, 10);
    return isNaN(intValue) ? null : intValue;
  }
  return value;
}

async function importCsv(
  url: string,
  table: SQLiteTable,
  cast: CastingFunction,
  columns: () => ColumnOption<string>[]
) {
  const response = await fetch(url);
  const text = await response.text();
  const data = parse(text, {
    delimiter: ",",
    skip_empty_lines: true,
    cast,
    columns,
  });
  for (let i = 0; i < data.length; i += chunkSize) {
    const chunk = data.slice(i, i + chunkSize);
    await db.insert(table).values(chunk).onConflictDoNothing();
  }
  console.log(`[+] imported ${data.length} rows from ${url}`);
}

try {
  await importCsv(
    "https://www.fuzzwork.co.uk/dump/latest/invTypes.csv",
    types,
    typesCast,
    typesColumns
  );
  await importCsv(
    "https://www.fuzzwork.co.uk/dump/latest/invMarketGroups.csv",
    marketGroups,
    marketGroupsCast,
    marketGroupsColumns
  );
} catch (e) {
  console.error("Error loading static data:", e);
}
