import Database from "better-sqlite3";
import { readdirSync, existsSync } from "fs";
import path from "path";

// TODO: load DB path from config (or default) and ensure it is valid, else die
// TODO: add type support to database helper functions

// List all migrations
let migrationsDir = path.join(process.cwd(), "src/db/migrations");
let migrationFiles = readdirSync(migrationsDir).filter((entry) =>
    entry.endsWith(".sql"),
);

let databasePath = path.join(process.cwd(), "db.sqlite3");
if (!existsSync(databasePath)) {
    throw new Error("Database not instantiated");
}
const db = new Database(databasePath);

// Check that all migrations have been applied (sanity check upon first db use)
const stmt = db.prepare(`
    SELECT version FROM schema_migrations
`);
const result = stmt.all();
const versions = result.map((row) => row.version);

for (const migrationFile of migrationFiles) {
    if (!versions.includes(migrationFile.split("_")[0])) {
        throw new Error(
            `Migration ${migrationFile} not applied to database. Apply migrations and restart`,
        );
    }
}

// TODO: remove this function
function getAllUserNames(): string[] {
    const stmt = db.prepare(`
        SELECT name FROM users
    `);
    const result = stmt.all();
    return result.map((row) => row.name);
}

export { db, getAllUserNames };
