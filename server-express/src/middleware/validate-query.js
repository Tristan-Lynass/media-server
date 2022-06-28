const validate = require('validate.js');

module.exports = (constraints) => (req, res, next) => {
  const errors = validate(req.query, constraints);
  if (errors) {
    res.status(400).send(errors);
    return;
  }
  next();
};
