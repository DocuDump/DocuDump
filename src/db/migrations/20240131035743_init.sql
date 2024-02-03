-- migrate:up

CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255)
);

-- migrate:down

DROP TABLE IF EXISTS users;