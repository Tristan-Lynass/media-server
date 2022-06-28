module.exports = (req, res, next) => {
  if (req.user && req.user.is_admin) {
    return next();
  }
  return res.status(401).send();
};
