const express = require('express');

const router = express.Router();

router.get('/xsrf', (req, res) => {
  res.send();
});

module.exports = router;
