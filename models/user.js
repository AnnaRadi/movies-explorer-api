const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const AuthError = require('../errs/AuthError');

const userSchema = new mongoose.Schema({
  name: {
    minlength: 2,
    maxlength: 30,
    type: String,
    required: true,
  },
  email: {
    required: true,
    unique: true,
    type: String,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: 'Электронная почта введена неверно',
    },
  },
  password: {
    select: false,
    type: String,
    required: true,
  },
});

// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new AuthError('Почта или пароль введены неверно'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new AuthError('Почта или пароль введены неверно'));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
