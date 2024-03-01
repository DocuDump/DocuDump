import Database from "better-sqlite3";
import { readdirSync, existsSync } from "fs";
import * as crockford from "@/util/crockford";
import { randNum } from "@/util/randnum";
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

export const db = new Database(databasePath, {
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
export function getAllUserNames(): string[] {
    const stmt = db.prepare(`
        SELECT name FROM users
    `);
    // Technically name IS NOT NULL but this is an example of how to filter
    // out nulls (or rather filtering by type)
    const result = stmt.all() as { name: string | null }[];
    return result.map((row) => row.name).filter(isString);
}

// TODO: remove this function
export function getAllUsers() {
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

export type ShortcodeType = "redirect"; // | "paste" | "file";

interface Shortcode {
    id: number;
    crockford_num: number | null;
    custom_slug: string | null;
    type: ShortcodeType;
    redirect_id: number | null;
}

interface Redirect {
    id: number;
    redirect_url: string;
}

function getShortcodeByCustomSlug(customSlug: string): Shortcode | null {
    const stmt = db.prepare(`
        SELECT
            id, crockford_num, custom_slug, type, redirect_id
        FROM
            shortcodes
        WHERE
            custom_slug = ?
    `);
    const result = stmt.all(customSlug) as Shortcode[];

    if (result.length >= 1) {
        return result[0];
    }

    return null;
}

function getShortcodeByCrockfordNum(num: number): Shortcode | null {
    if (!Number.isInteger(num) || num <= 0) {
        throw TypeError("num must be an integer > 0");
    }

    const stmt = db.prepare(`
        SELECT
            id, crockford_num, custom_slug, type, redirect_id
        FROM
            shortcodes
        WHERE
            crockford_num = ?
    `);
    const result = stmt.all(num) as Shortcode[];

    if (result.length >= 1) {
        return result[0];
    }

    return null;
}

function getRedirectById(id: number): Redirect | null {
    if (!Number.isInteger(id) || id <= 0) {
        throw TypeError("id must be an integer > 0");
    }

    const stmt = db.prepare(`
        SELECT
            id, redirect_url
        FROM
            redirects
        WHERE
            id = ?
    `);
    const result = stmt.all(id) as Redirect[];

    if (result.length >= 1) {
        return result[0];
    }

    return null;
}

export function queryShortcode(slug: string): { redirect?: Redirect } {
    // Check for custom shortcode first
    let result = getShortcodeByCustomSlug(slug.toLowerCase());

    if (!result) {
        try {
            let num = crockford.decode(slug);
            result = getShortcodeByCrockfordNum(num);
        } catch {
            // Nom: invalid crockford num
        }
    }

    if (!result) {
        // Ran out of things to make of this slug
        return {};
    }

    if (result.type === "redirect") {
        if (!result.redirect_id) {
            return {};
        }
        let redirect = getRedirectById(result.redirect_id);
        if (!redirect) {
            return {};
        }
        return { redirect };
    }

    return {};
}

export function createShortcodeForURL(url: string): string {
    const insertRedirect = db.prepare(`
        INSERT INTO redirects (redirect_url)
        VALUES (?)
    `);

    const insertShortcode = db.prepare(`
        INSERT INTO shortcodes (crockford_num, custom_slug, type, redirect_id)
        VALUES (?, ?, ?, ?)
    `);

    let redirectId: number;
    let crockfordNum: number;

    const existingRedirect = db
        .prepare(
            `
        SELECT id FROM redirects WHERE redirect_url = ?
    `,
        )
        .get(url);

    db.transaction(() => {
        if (!existingRedirect) {
            const result = insertRedirect.run(url);
            redirectId = result.lastInsertRowid;
        } else {
            redirectId = existingRedirect.id;
        }

        // Generate a unique crockford encoded number for the shortcode
        let unique = false;
        while (!unique) {
            crockfordNum = randNum();

            const existingCrockford = db
                .prepare(
                    `
                SELECT id FROM shortcodes WHERE crockford_num = ?
            `,
                )
                .get(crockfordNum);

            unique = !existingCrockford;
        }

        insertShortcode.run(crockfordNum, null, "redirect", redirectId);
    })();

    return crockford.encode(crockfordNum);
}
