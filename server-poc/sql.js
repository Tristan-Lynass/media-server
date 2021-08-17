module.exports = {
    initialise: `create table if not exists uploads (
        filename text primary key,
        ext text,
        md5 text
      );`,
    insert: `insert into uploads values (?, ?, ?);`,
    getAllByPage: `select filename, ext from uploads limit ?, ?;`
};
