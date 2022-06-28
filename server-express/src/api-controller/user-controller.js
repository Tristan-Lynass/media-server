const express = require('express');
const validateBody = require('../middleware/validate-body');

const router = express.Router();

router.get('/', async (req, res) => {
  console.log(req);

  // await req.tx('public.testtest').insert({
  //   id: 'Old Books',
  //   email: 'wow@gmail.com',
  // });
  // res.send({ id: 'g87tg76guy' });
});

router.post('/', async (req, res) => {
  console.log(req);
  // await req.tx('core.user').insert({
  //   id: 'Old Books',
  //   email: 'wow@gmail.com',
  // });
  res.send({ id: 'g87tg76guy' });
});

module.exports = router;
