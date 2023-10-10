const { JWT_SECRET, NODE_ENV } = process.env;
const jwt = require('jsonwebtoken');
const AuthError = require('../errs/AuthError');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new AuthError('Авторизируетесь'));
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, `${NODE_ENV === 'production' ? JWT_SECRET : 'yandex-praktikum'}`);
  } catch (err) {
    return next(new AuthError('Авторизируетесь'));
  }
  req.user = payload;
  next();
};
