/* TODO: do some sort of migration system */

/*
core.sessions
    "sessions_pkey" PRIMARY KEY, btree (sid)
    "sessions_expired_index" btree (expired)

 */

create table if not exists core.user (
    id uuid primary key,
    username text not null,
    password text not null,
    is_admin boolean not null
);

create table if not exists core.media (
    id uuid primary key,
--     user_id text not null references user(id),
--     extension text not null,
--     original_filename text not null,
--     uploaded_at datetime not null,
--     width integer,
--     height integer,
--     size integer not null,
--     md5 text,
--     favourite integer not null,
--     deleted integer not null,
--     processed integer not null
);