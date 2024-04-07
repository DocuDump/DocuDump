import Database from "better-sqlite3";
import * as fs from "fs";
import * as crockford from "@/util/crockford";
import { randomCrockfordNumber } from "@/util/randcrockford";
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
let migrationFiles = fs
    .readdirSync(migrationsDir)
    .filter((entry) => entry.endsWith(".sql"));

// Sanity check that at least one migration file exists
if (migrationFiles.length < 1) {
    throw new Error("No migration files found. Ensure the cwd is properly set");
}

let databasePath = process.env.DATABASE_URL?.split("sqlite3:")[1];
if (typeof databasePath !== "string") {
    databasePath = path.join(process.cwd(), "db.sqlite3");
}

// Ensure database exists and is readable
fs.accessSync(databasePath, fs.constants.F_OK | fs.constants.R_OK);

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

export type ShortcodeType = "redirect" | "file"; // | "paste";

interface Shortcode {
    id: number;
    crockford_num: number | null;
    custom_slug: string | null;
    type: ShortcodeType;
    redirect_id: number | null;
    file_id: number | null;
}

interface Redirect {
    id: number;
    redirect_url: string;
}

interface FileEntry {
    id: number;
    sha256: string;
    file_name: string;
    mime_type: string;
}

function getShortcodeByCustomSlug(customSlug: string): Shortcode | null {
    const stmt = db.prepare(`
        SELECT
            id, crockford_num, custom_slug, type, redirect_id, file_id
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
            id, crockford_num, custom_slug, type, redirect_id, file_id
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

function getFileById(id: number): FileEntry | null {
    if (!Number.isInteger(id) || id <= 0) {
        throw TypeError("id must be an integer > 0");
    }

    const stmt = db.prepare(`
        SELECT
            id, sha256, file_name, mime_type
        FROM
            files
        WHERE
            id = ?
    `);
    const result = stmt.all(id) as FileEntry[];

    if (result.length >= 1) {
        return result[0];
    }

    return null;
}

export function queryShortcode(slug: string): {
    redirect?: Redirect;
    file?: FileEntry;
} {
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
    } else if (result.type === "file") {
        if (!result.file_id) {
            return {};
        }
        let file = getFileById(result.file_id);
        if (!file) {
            return {};
        }
        return { file };
    }

    return {};
}

export function createShortcodeForURL(url: string): {
    success?: boolean;
    message?: string;
} {
    const findRedirect = db.prepare(`
        SELECT id FROM redirects WHERE redirect_url = ?
    `);

    const findShortcode = db.prepare(`
        SELECT crockford_num FROM shortcodes WHERE redirect_id = ?
    `);

    const insertRedirect = db.prepare(`
        INSERT INTO redirects (redirect_url) VALUES (?)
    `);

    const insertShortcode = db.prepare(`
        INSERT INTO shortcodes (crockford_num, custom_slug, type, redirect_id) VALUES (?, ?, ?, ?)
    `);

    try {
        // Start a transaction to ensure atomic operations
        const transactionResult = db.transaction(() => {
            let redirectId: number | BigInt;
            let crockfordNum = 0;

            // Return appropriate shortcode if redirectID exists
            const existingRedirect = findRedirect.get(url) as
                | Redirect
                | undefined;

            if (existingRedirect) {
                redirectId = existingRedirect.id;
                const existingShortcode = findShortcode.get(redirectId) as
                    | Shortcode
                    | undefined;
                if (
                    existingShortcode &&
                    existingShortcode.crockford_num !== null
                ) {
                    const shortcode = crockford.encode(
                        existingShortcode.crockford_num,
                    );
                    return { success: true, message: shortcode };
                }
            } else {
                const result = insertRedirect.run(url);
                redirectId = result.lastInsertRowid;
            }

            // Finds a unique Crockford number
            let unique = false;
            while (!unique) {
                crockfordNum = randomCrockfordNumber(4);

                const existingCrockford = db
                    .prepare(
                        `SELECT id FROM shortcodes WHERE crockford_num = ?`,
                    )
                    .get(crockfordNum);

                unique = !existingCrockford;
            }

            insertShortcode.run(crockfordNum, null, "redirect", redirectId);
            const shortcode = crockford.encode(crockfordNum);
            return { success: true, message: shortcode };
        })();

        return transactionResult;
    } catch (error) {
        return {
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "An unknown error occurred",
        };
    }
}

export function createCustomURL(
    url: string,
    customSlug: string,
): { success?: boolean; message?: string } {
    const findRedirect = db.prepare(`
        SELECT id FROM redirects WHERE redirect_url = ?
    `);

    const findShortcodeByCustomSlug = db.prepare(`
        SELECT id FROM shortcodes WHERE custom_slug = ?
    `);

    const insertRedirect = db.prepare(`
        INSERT INTO redirects (redirect_url) VALUES (?)
    `);

    const insertShortcode = db.prepare(`
        INSERT INTO shortcodes (custom_slug, type, redirect_id) VALUES (?, ?, ?)
    `);

    try {
        // Start a transaction to ensure atomic operations
        const transactionResult = db.transaction(() => {
            let redirectId;

            // Check if the customSlug already exists
            const existingCustomSlug =
                findShortcodeByCustomSlug.get(customSlug);
            if (existingCustomSlug) {
                throw new Error("Custom URL already in use");
            }

            // Check for existing redirectID, otherwise creates redirectID
            const existingRedirect = findRedirect.get(url) as
                | Redirect
                | undefined;
            if (existingRedirect) {
                redirectId = existingRedirect.id;
            } else {
                const result = insertRedirect.run(url);
                redirectId = result.lastInsertRowid;
            }

            // Now, using customSlug instead of generating a new one.
            insertShortcode.run(customSlug, "redirect", redirectId);
            return { success: true, message: customSlug };
        })();

        return transactionResult;
    } catch (error) {
        return {
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "An unknown error occurred",
        };
    }
}

export function createFileUpload(
    fileName: string,
    sha256: string,
    mimeType: string,
): { success?: boolean; message?: string } {
    const findFileIdByHash = db.prepare(`
        SELECT id FROM files WHERE sha256 = ?
    `);

    const findShortcodeCrockNumByFileId = db.prepare(`
        SELECT crockford_num FROM shortcodes WHERE file_id = ?
    `);

    const insertFile = db.prepare(`
        INSERT INTO files (sha256, file_name, mime_type) VALUES (?, ?, ?)
    `);

    const insertShortcode = db.prepare(`
        INSERT INTO shortcodes (crockford_num, type, file_id) VALUES (?, ?, ?)
    `);

    try {
        // Start a transaction to ensure atomic operations
        const transactionResult = db.transaction(() => {
            let fileId: number | BigInt;
            let crockfordNum = 0;

            // Return appropriate shortcode if redirectID exists
            const existingFile = findFileIdByHash.get(sha256) as
                | { id: number }
                | undefined;

            if (existingFile) {
                fileId = existingFile.id;
                const existingShortcode = findShortcodeCrockNumByFileId.get(
                    fileId,
                ) as { crockford_num: number } | undefined;
                if (
                    existingShortcode &&
                    existingShortcode.crockford_num !== null
                ) {
                    const shortcode = crockford.encode(
                        existingShortcode.crockford_num,
                    );
                    return { success: true, message: shortcode };
                }
            } else {
                const result = insertFile.run(sha256, fileName, mimeType);
                fileId = result.lastInsertRowid;
            }

            // Finds a unique Crockford number
            let unique = false;
            while (!unique) {
                crockfordNum = randomCrockfordNumber(4);

                const existingCrockford = db
                    .prepare(
                        `SELECT id FROM shortcodes WHERE crockford_num = ?`,
                    )
                    .get(crockfordNum);

                unique = !existingCrockford;
            }

            insertShortcode.run(crockfordNum, "file", fileId);
            const shortcode = crockford.encode(crockfordNum);
            return { success: true, message: shortcode };
        })();

        return transactionResult;
    } catch (error) {
        return {
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "An unknown error occurred",
        };
    }
}
