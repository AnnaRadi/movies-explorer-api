const router = require('express').Router();
const userRoutes = require('./users');
const movieRoutes = require('./movies');
const logout = require('./logout');
const NotFoundDocumentError = require('../errs/NotFoundDocumentError');

router.use('/users', userRoutes);
router.use('/movies', movieRoutes);
router.use('/logout', logout);

router.use('*', NotFoundDocumentError);

module.exports = router;
