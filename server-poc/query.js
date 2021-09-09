module.exports = {

    insert: `insert into media values (?, ?, ?, ?, ?, ?, ?, ?);`,
    getAllByPage: `select * from media limit ?, ?;`,

    addMediaTag: `insert into media_tag values (?, ?);`,
    removeMediaTag: `delete from media_tag where media_id = ? and tag_id = ?;`,

    getTagId: `select id from tag where name = ?;`,
    createTag: `insert into tag values (?, ?);`,
    getAllTagsByMedia: `select t.name from media_tag mt
    join tag t on t.id = mt.tag_id
    where mt.media_id = ?`,
    getTagUsageCount: `select count(*) c from media_tag where tag_id = ?`,
    deleteTag: `delete from tag where id = ?`
}
