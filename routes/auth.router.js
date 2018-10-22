// Express
const express = require('express');
const router = express.Router();

// Passport
const passport = require('passport');
const options = { session: false, failWithError: true };
const localAuth = passport.authenticate('local', options);
const jwtAuth = passport.authenticate('jwt', {
  session: false,
  failWithError: true
});

// Controllers
const AuthController = require('../controllers/auth.controller');

router.post('/', localAuth, AuthController.createNewAuth);
router.post('/refresh', jwtAuth, AuthController.refreshAuth);

module.exports = router;
