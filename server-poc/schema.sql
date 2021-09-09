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

create table if not exists tag (
    id text primary key,
    name text not null
);

create table if not exists media_tag (
    media_id  integer not null references media(id),
    tag_id text not null references tag(id),
    primary key (media_id, tag_id)
);
