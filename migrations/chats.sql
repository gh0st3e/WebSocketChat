CREATE TABLE IF NOT EXISTS chats
(
    id SERIAL,
    name TEXT NOT NULL,
    creator INT,
    CONSTRAINT chats_pkey PRIMARY KEY (id),
    CONSTRAINT users_fkey FOREIGN KEY (creator)
        REFERENCES users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)