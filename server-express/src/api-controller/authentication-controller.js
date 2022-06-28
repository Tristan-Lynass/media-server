const express = require('express');
const passport = require('passport');

const router = express.Router();

router.get('/xsrf', (req, res) => {
  res.send();
});

router.post('/login', passport.authenticate('local'), (req, res) => res.send());

module.exports = router;
