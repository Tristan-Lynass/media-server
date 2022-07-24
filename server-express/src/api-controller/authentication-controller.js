const express = require('express');
const passport = require('passport');

const router = express.Router();

router.get('/xsrf', (req, res) => {
  // res.cookie('XSRF-TOKEN', req.csrfToken());
  res.send();
});

router.post('/login', passport.authenticate('local'), (req, res) => res.send());

router.post('/logout', (req, res) => {
  req?.session.destroy((e) => {
    if (e) {
      res.status(500).send();
    } else {
      res.send();
    }
  });
});

module.exports = router;
