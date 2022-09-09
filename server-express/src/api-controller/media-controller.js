const express = require('express');
const requireLoggedIn = require('../middleware/require-logged-in');
const { knex } = require('../db');
const validateQuery = require('../middleware/validate-query');

const router = express.Router();

// TODO: This isn't consistent. Will need to bind a cursor with timeout to a session. Not needed
//  now but good to keep in mind for retrofit.
router.get('/search', requireLoggedIn, validateQuery({}), async (req, res) => {
  const { page, size } = req.query;
  const offset = page * size;

  const result = await knex('core.media').select()
    .where({ user_id: req.user.id })
    .limit(size)
    .offset(offset);
  return res.send(result);
});

module.exports = router;
