const express = require('express');

const router = express.Router();
router.use('/auth', require('./authentication-controller'));
// router.use('/media', require('./media-controller'));
router.use('/user', require('./user-controller'));
router.use('/media/upload', require('./upload-controller'));

module.exports = router;
