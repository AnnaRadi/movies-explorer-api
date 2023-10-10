const NotFoundError = require('./NotFoundError');

module.exports = (req, res, next) => {
  const err = new NotFoundError('Ресурс не обнаружен');
  next(err);
};
