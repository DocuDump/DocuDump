-- migrate:up

CREATE TABLE IF NOT EXISTS files (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  sha256 TEXT NOT NULL,
  file_name TEXT NOT NULL,
  mime_type TEXT NOT NULL
);

PRAGMA foreign_keys = OFF;

CREATE TABLE IF NOT EXISTS new_shortcodes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  crockford_num INTEGER DEFAULT NULL,
  custom_slug TEXT DEFAULT NULL,
  type TEXT NOT NULL,
  redirect_id INTEGER NULL,
  file_id INTEGER NULL,
  UNIQUE (crockford_num),
  FOREIGN KEY (redirect_id) REFERENCES redirects(id),
  FOREIGN KEY (file_id) REFERENCES files(id)
);

INSERT INTO new_shortcodes (id, crockford_num, custom_slug, type, redirect_id)
    SELECT id, crockford_num, custom_slug, type, redirect_id FROM shortcodes;

DROP TABLE shortcodes;

ALTER TABLE new_shortcodes RENAME TO shortcodes;

PRAGMA foreign_key_check;

PRAGMA foreign_keys = ON;

-- migrate:down

PRAGMA foreign_keys = OFF;

CREATE TABLE IF NOT EXISTS new_shortcodes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  crockford_num INTEGER DEFAULT NULL,
  custom_slug TEXT DEFAULT NULL,
  type TEXT NOT NULL,
  redirect_id INTEGER NULL,
  UNIQUE (crockford_num),
  FOREIGN KEY (redirect_id) REFERENCES redirects(id)
);

INSERT INTO new_shortcodes (id, crockford_num, custom_slug, type, redirect_id)
    SELECT id, crockford_num, custom_slug, type, redirect_id FROM shortcodes;

DROP TABLE shortcodes;

ALTER TABLE new_shortcodes RENAME TO shortcodes;

PRAGMA foreign_key_check;

PRAGMA foreign_keys = ON;

DROP TABLE IF EXISTS files;

