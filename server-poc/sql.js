module.exports = {
    init_media: `create table if not exists media (
        id text primary key,
        ext text not null,
        filename text not null,
        uploadedAt datetime not null,
        width integer,
        height integer,
        size integer not null,
        md5 text not null
    );`,
    init_tag: `create table if not exists tag (
        id text primary key,
        name text not null
    );`,
    init_media_tag: `create table if not exists media_tag (
        media_id  integer not null references media(id),
        tag_id text not null references tag(id),
        primary key (media_id, tag_id)
    );`,
    insert: `insert into media values (?, ?, ?, ?, ?, ?, ?, ?);`,
    getAllByPage: `select * from media limit ?, ?;`,
    addMediaTag: `insert into media_tag values (?, ?);`,
    removeMediaTag: `delete from media_tag where tag_id = ?;`,
    getTagId: `select id from tag where name = ?;`,
    createTag: `insert into tag values (?, ?);`
}
