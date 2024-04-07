-- migrate:up

CREATE TABLE IF NOT EXISTS redirects (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  redirect_url TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS shortcodes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  crockford_num INTEGER DEFAULT NULL,
  custom_slug TEXT DEFAULT NULL,
  type TEXT NOT NULL,
  redirect_id INTEGER NULL,
  UNIQUE (crockford_num),
  FOREIGN KEY (redirect_id) REFERENCES redirects(id)
);

-- migrate:down

DROP TABLE IF EXISTS shortcodes;
DROP TABLE IF EXISTS redirects;
