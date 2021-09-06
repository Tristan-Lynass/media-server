module.exports = {
    init_media: `create table if not exists media (
        id text primary key,
        ext text,
        filename text,
        uploadedAt datetime,
        width integer,
        height integer,
        size integer,
        md5 text
    );`,
    init_tag: `create table if not exists tag (
        name text primary key,
        media_id text,
        foreign key(media_id) references media(id)
    );`,
    insert: `insert into media values (?, ?, ?, ?, ?, ?, ?, ?);`,
    getAllByPage: `select * from media limit ?, ?;`
};
