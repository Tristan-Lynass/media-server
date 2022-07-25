const express = require('express');
const requireLoggedIn = require('../middleware/require-logged-in');
const validateQuery = require('../middleware/validate-query');
const {knex} = require("./db");
const {v4: uuid} = require("uuid");
const bcrypt = require("bcryptjs");

const router = express.Router();
router.get('/', requireLoggedIn, validateQuery({}), (req, res) => {
  const page = req.query.page;
  const size = req.query.size;

  const offset = page * size;

  await req.tx.select().from('core.media').where({ user_id: req.user })
      .then((user) => {
        if (!user) {
          console.log('Creating default admin user. Change password immediately.');
          return knex.insert({
            id: uuid(),
            username: 'admin',
            password: bcrypt.hashSync('admin', bcrypt.genSaltSync(10), null),
            is_admin: true,
          }).into('core.user');
        }
        return Promise.resolve();
      });
  // try {
  //   const rows = db.prepare(query.getAllByPage).all(offset, size)
  //   return res.send(rows.map(row => {
  //     row.tags = db.prepare(query.getAllTagsByMedia).all(row.id).map(r => r.name)
  //     return row
  //   }))
  // } catch (e) {
  //   console.error(e)
  //   return res.status(500).send()
  // }
});

router.post('/', requireLoggedIn, async (req, res) => {
  console.log(req);
  res.send({ id: 'g87tg76guy' });
});

module.exports = router;
