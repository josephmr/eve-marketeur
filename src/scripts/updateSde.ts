import Database from "better-sqlite3";
import fs from "fs";
import path from "path";
import { env } from "$env/dynamic/private";
import readline from "readline";

const client = new Database(env.DATABASE_URL);

const sdePath = path.join(process.cwd(), process.argv[2]);

if (!sdePath || !fs.statSync(sdePath).isFile()) {
  console.error("Please provide a valid path to the SDE directory.");
  process.exit(1);
}

const TABLES = ["invTypes", "invMarketGroups"];

function updateTableSql(table: string): string {
  return `
  DELETE FROM main.${table};
  INSERT INTO main.${table} SELECT * FROM sde.${table};
  `;
}

const statement = `
  ATTACH DATABASE '${sdePath}' AS sde;

  BEGIN TRANSACTION;

  PRAGMA foreign_keys = OFF;
  ${TABLES.map(updateTableSql).join("")}
  PRAGMA foreign_keys = ON;

  COMMIT;
  `;

console.log("Updating SDE from", sdePath);
console.log("Executing SQL:\n", statement);

readline
  .createInterface({
    input: process.stdin,
    output: process.stdout,
  })
  .question(
    "Are you sure you want to proceed? This will overwrite existing data. (y/N) ",
    (answer) => {
      if (answer.toLowerCase() === "y") {
        try {
          client.exec(statement);
          console.log("Update complete");
        } catch (error) {
          console.error("Error executing SQL:", error);
        }
      } else {
        console.log("Operation cancelled.");
      }
      process.exit(0);
    }
  );
