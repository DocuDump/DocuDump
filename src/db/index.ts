import Database from "better-sqlite3";
import { readdirSync, existsSync } from "fs";
import path from "path";

// TODO: load DB path from config (or default) and ensure it is valid, else die
// TODO: add type support to database helper functions
// TODO: consider interface definitions like this, probably in another file
// interface User {
//     id: number;
//     name: string;
//     email: string;
// }

// List all migrations
let migrationsDir = path.join(process.cwd(), "src/db/migrations");
let migrationFiles = readdirSync(migrationsDir).filter((entry) =>
    entry.endsWith(".sql"),
);

// Sanity check that at least one migration file exists
if (migrationFiles.length < 1) {
    throw new Error("No migration files found. Ensure the cwd is properly set");
}

let databasePath = process.env.DATABASE_URL?.split("sqlite3:")[1];
if (typeof databasePath !== "string") {
    databasePath = path.join(process.cwd(), "db.sqlite3");
}

if (!existsSync(databasePath)) {
    throw new Error("Database not instantiated");
}

const db = new Database(databasePath, {
    fileMustExist: true,
});

// Check that all migrations have been applied (sanity check upon first db use)
const stmt = db.prepare(`
    SELECT version FROM schema_migrations
`);
const result = stmt.all() as { version: string }[];
const versions = result.map((row) => row.version);

for (const migrationFile of migrationFiles) {
    if (!versions.includes(migrationFile.split("_")[0])) {
        throw new Error(
            `Migration ${migrationFile} not applied to database. Apply migrations and restart`,
        );
    }
}

// TODO: move this into a lib file and import it
const isString = (x: any): x is string => typeof x === "string";

// TODO: remove this function
function getAllUserNames(): string[] {
    const stmt = db.prepare(`
        SELECT name FROM users
    `);
    // Technically name IS NOT NULL but this is an example of how to filter
    // out nulls (or rather filtering by type)
    const result = stmt.all() as { name: string | null }[];
    return result.map((row) => row.name).filter(isString);
}

// TODO: remove this function
function getAllUsers() {
    const stmt = db.prepare(`
        SELECT id, name, email FROM users
    `);
    const result = stmt.all() as {
        id: number;
        name: string;
        email: string | null;
    }[];
    return result;
}

export { db, getAllUserNames, getAllUsers };
