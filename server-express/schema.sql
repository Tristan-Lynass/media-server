/*
    TODO: do some sort of migration system
    TODO: Indices
*/

/*
core.sessions
    "sessions_pkey" PRIMARY KEY, btree (sid)
    "sessions_expired_index" btree (expired)

 */

CREATE SCHEMA IF NOT EXISTS core;

create table if not exists core.user (
    id uuid primary key,
    username text not null unique,
    password text not null,
    is_admin boolean not null
);

create table if not exists core.media (
    id uuid primary key,
    user_id uuid not null references core.user(id),
    extension text not null,
    original_filename text not null,
    created_at timestamp not null default now(),
    width numeric,  -- for pictures and video
    height numeric, -- for pictures and video
    length numeric, -- for audio and video
    size numeric not null,
    md5 text not null,
    favourite boolean not null default false,
    deleted boolean not null default false,
    processed boolean not null default false
);

create table if not exists core.tag (
    id uuid primary key,
    name text not null unique
);

create table if not exists core.media_tag (
    media_id uuid not null references core.media(id),
    tag_id uuid not null references core.tag(id),
    primary key (media_id, tag_id)
);
