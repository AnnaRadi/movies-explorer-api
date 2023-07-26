module.exports = (req, res, next) => {
  const { jwt } = req.cookies;
  if (jwt) {
    req.headers.authorization = `Bearer ${jwt}`;
  }
  next();
};
