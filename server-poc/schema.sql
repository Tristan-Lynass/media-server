create table if not exists media (
    id text primary key,
    ext text not null,
    filename text not null,
    uploadedAt datetime not null,
    width integer,
    height integer,
    size integer not null,
    md5 text not null
);
-- Schema TODO in order of decreasing priority
-- is_favorite integer not null
-- is_deleted integer not null
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
