const knex = require('knex');
const pg = require('pg');

// Otherwise knex turns numeric into a JS string. This is probably unsafe, because numeric
// could under/overflow a JS number.
pg.types.setTypeParser(pg.types.builtins.NUMERIC, Number);

// FIXME: Actually configure DB
const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    port: 5432,
    user: 'postgres',
    password: 'password',
    database: 'test',
  },
});

module.exports = {
  knex: db,
  transactional: async (req, res, next) => {
    try {
      await db.transaction(async (tx) => {
        // console.log('started txn');
        req.tx = tx;
        next();
      });
    } catch (error) {
      console.error(error);
      res.status(500).send();
    }
  },
};
