CREATE TABLE users(
    user_id UUID PRIMARY KEY,
    version UUID NOT NULL,
    created TIMESTAMPTZ NOT NULL,
    updated TIMESTAMPTZ NOT NULL,
    username TEXT NOT NULL,
    email TEXT NOT NULL,
    name TEXT NOT NULL,
    password TEXT NOT NULL,

    CONSTRAINT UK_users_username UNIQUE (username),
    CONSTRAINT UK_users_email UNIQUE (email)
);
