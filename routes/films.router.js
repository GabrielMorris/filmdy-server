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

/* GET/POST/PUT/DELETE */
router
  .route('/')
  .get(FilmController.getAllFilms)
  .post(FilmController.createNewFilm)
  .put(FilmController.updateFilmRating)
  .delete(FilmController.deleteFilm);

module.exports = router;
