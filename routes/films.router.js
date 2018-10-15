// Express
const express = require('express');
const router = express.Router();

// Passport
const passport = require('passport');

// Controllers
const FilmController = require('../controllers/films.controller');

// TODO: authentication stuff here
router.use(
  '/',
  passport.authenticate('jwt', { session: false, failWithError: true })
);

/* GET/POST */
router
  .route('/')
  .get(FilmController.getAllFilms)
  .post(FilmController.createNewFilm)
  .delete(FilmController.deleteFilm);

/* GET/PUT/DELETE by ID */

module.exports = router;
