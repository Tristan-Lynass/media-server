const express = require('express');
const passport = require('passport');

const router = express.Router();
router.use('/auth', require('./authentication-controller'));
// router.use('/media', require('./media-controller'));
router.use('/user', /* passport.authenticate('local'), */require('./user-controller'));

module.exports = router;
