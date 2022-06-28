const express = require('express');

const router = express.Router();
router.use('/auth', require('./authentication-controller'));
// router.use('/media', require('./media-controller'));
router.use('/user', require('./user-controller'));

module.exports = router;
