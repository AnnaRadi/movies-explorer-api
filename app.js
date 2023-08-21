const express = require('express');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const { login, createUser } = require('./controllers/users');
const { validationLogin, validationCreateUser } = require('./middlewares/validations');
const auth = require('./middlewares/auth');
const extractJwt = require('./middlewares/extractJwt');
const handleError = require('./middlewares/handleError');
const NotFoundDocumentError = require('./errs/NotFoundDocumentError');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const routes = require('./routes/index');

const app = express();
const {
  PORT = 3000,
  // eslint-disable-next-line no-unused-vars
  MONGO_URL = 'mongodb://localhost:27017',
} = process.env;

app.use(cors({
  origin: [
    'https://aradion0va.nomoreparties.sbs',
    'http://aradion0va.nomoreparties.sbs',
    'http://localhost:3000',
  ],
  credentials: true,
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(extractJwt);

// app.get('/crash-test', () => {
//   setTimeout(() => {
//     throw new Error('Сервер сейчас упадёт');
//   }, 0);
// });

app.use(requestLogger);

app.post('/signin', validationLogin, login);
app.post('/signup', validationCreateUser, createUser);

app.use(auth);
app.use(routes);

// eslint-disable-next-line no-template-curly-in-string
mongoose.connect(`${MONGO_URL}/bitfilmsdb`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  family: 4,
});

app.use('*', NotFoundDocumentError);

app.use(errorLogger);
app.use(errors());
app.use(handleError);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Сервер запущен ${PORT}`);
});
