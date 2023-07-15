CREATE TABLE IF NOT EXISTS messages
(
    id SERIAL,
    msg TEXT,
    chat_id INT,
    sender INT,
    msg_type TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT messages_pkey PRIMARY KEY (id),
    CONSTRAINT users_fkey FOREIGN KEY (sender)
        REFERENCES users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT chats_fkey FOREIGN KEY (chat_id)
        REFERENCES chats (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)