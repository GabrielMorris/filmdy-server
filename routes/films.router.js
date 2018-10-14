const express = require('express');
const router = express.Router();
// const passport = require('passport');
const FilmController = require('../controllers/films.controller');

// TODO: authentication stuff here
// router.use('/');

/* GET/POST */
router.route('/').get(FilmController.getAllFilms);

/* GET/PUT/DELETE by ID */

module.exports = router;
