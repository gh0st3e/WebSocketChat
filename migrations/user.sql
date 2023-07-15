CREATE TABLE IF NOT EXISTS users
(
    id SERIAL,
    login TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    name TEXT NOT NULL,
    CONSTRAINT users_pkey PRIMARY KEY (id)
) 