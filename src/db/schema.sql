CREATE TABLE IF NOT EXISTS "schema_migrations" (version varchar(128) primary key);
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255)
);
CREATE TABLE redirects (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  redirect_url TEXT NOT NULL
);
CREATE TABLE files (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  sha256 TEXT NOT NULL,
  file_name TEXT NOT NULL,
  mime_type TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS "shortcodes" (
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
-- Dbmate schema migrations
INSERT INTO "schema_migrations" (version) VALUES
  ('20240131035743'),
  ('20240228211608'),
  ('20240331190500');
