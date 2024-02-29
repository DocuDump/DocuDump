DELETE FROM users;
INSERT INTO users (name, email) VALUES
    ("user1", "user1@email.com"),
    ("user2", "user2@email.com"),
    ("user3", "user3@email.com"),
    ("user4", "user4@email.com");

DELETE FROM redirects;
INSERT INTO redirects (id, redirect_url) VALUES
    (1, "https://www.google.com"),
    (2, "https://www.nd.edu"),
    (3, "https://docudump.github.io");

DELETE FROM shortcodes;
INSERT INTO shortcodes (crockford_num, custom_slug, type, redirect_id) VALUES
    (762706, NULL, "redirect", 1),
    (822103, NULL, "redirect", 2),
    (251069, NULL, "redirect", 3),
    (NULL, "customurl", "redirect", 2);
