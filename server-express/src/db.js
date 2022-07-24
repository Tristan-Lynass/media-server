const knex = require('knex');
// const { v4: uuid } = require('uuid');
// const bcrypt = require('bcryptjs');

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
