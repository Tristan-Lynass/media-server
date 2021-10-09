create table if not exists media (
    id text primary key,
    extension text not null,
    filename text not null,
    uploaded_at datetime not null,
    width integer,
    height integer,
    size integer not null,
    md5 text not null,
    is_favourite integer not null,
    is_deleted integer not null
);
-- Schema TODO in order of decreasing priority
-- geolocation text (lat, long, alt)
-- created_at datetime not null (from taken at, else created at, else uploaded_at)
-- duration real
-- user_id text not null

create table if not exists tag (
    id text primary key,
    name text not null
);

create table if not exists media_tag (
    media_id  integer not null references media(id),
    tag_id text not null references tag(id),
    primary key (media_id, tag_id)
);

create table if not exists user (
    id text primary key,
    username text not null,
    password text not null,
    is_admin integer not null
)
