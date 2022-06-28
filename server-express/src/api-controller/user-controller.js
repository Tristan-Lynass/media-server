const express = require('express');
const validateBody = require('../middleware/validate-body');
const validateQuery = require('../middleware/validate-query');
const requireLoggedIn = require('../middleware/require-logged-in');
const requireAdmin = require('../middleware/require-admin');

const router = express.Router();
router.get('/', requireLoggedIn, async (req, res) => res.send({
  id: req.user.id,
  username: req.user.username,
  is_admin: req.user.is_admin,
}));

router.post('/', requireAdmin, async (req, res) => {
  console.log(req);
  res.send({ id: 'g87tg76guy' });
});

module.exports = router;
