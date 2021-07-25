module.exports = {
    initialise: `create table if not exists uploads (
        id integer primary key autoincrement,
        filename TEXT
      );`,
    insert: `insert into uploads values (NULL, ?);`,
    getPage: `select filename from uploads limit ?, ?;`
};