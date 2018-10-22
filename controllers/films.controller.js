// CUID
const cuid = require('cuid');

// Models
const Films = require('../models/films');

// Get all films
exports.getAllFilms = function(req, res, next) {
  const userID = req.user.id;

  Films.find({ userID })
    .then(results => res.json(results))
    .catch(next);
};

// Update film by ID
exports.updateFilmRating = function(req, res, next) {
  const { imdbID } = req.body;
  const userID = req.user.id;

  Films.findOne({ userID })
    .then(existingDiary => {
      const updatedDiary = existingDiary;

      updatedDiary.diaryFilms.map(film => {
        if (film.imdbID === imdbID) {
          film.userRating = !film.userRating;
          return film;
        }
        return film;
      });
      return updatedDiary;
    })
    .then(updatedDiary => {
      return Films.findOneAndUpdate({ userID }, updatedDiary, { new: true })
        .then(result => result)
        .catch(error => next(error));
    })
    .then(result => res.status(200).json(result))
    .catch(error => next(error));
};

// Create new film
exports.createNewFilm = function(req, res, next) {
  const { film } = req.body;
  const userID = req.user.id;

  /* === Validate the film === */
  const requiredKVPs = [
    'imdbID',
    'title',
    'plot',
    'actors',
    'poster',
    'ratings',
    'userRating'
  ];

  // Make sure the film is in the request body
  if (!film) {
    const err = new Error('Missing film in request body');
    err.status = 400;
    return next(err);
  }

  // Make sure we've got all the keys in the request body
  const filmHasAllKeys = requiredKVPs.every(key => {
    if (Object.keys(film).includes(key)) {
      return true;
    }

    return false;
  });

  if (!filmHasAllKeys) {
    const err = new Error('Missing keys in request body');
    err.status = 400;
    return next(err);
  }

  // Add a unique diaryID to the film
  film.diaryID = cuid();

  Films.findOne({ userID })
    .then(existingDiary => {
      existingDiary.diaryFilms.push(film);

      return existingDiary;
    })
    .then(newDiary => {
      return Films.findOneAndUpdate({ userID }, newDiary, { new: true })
        .then(result => {
          return result;
        })
        .catch(error => next(error));
    })
    .then(result => {
      res.status(201).json(result);
    })
    .catch(error => next(error));
};

// Delete film
exports.deleteFilm = function(req, res, next) {
  const { imdbID } = req.body;
  const userID = req.user.id;

  Films.findOne({ userID })
    .then(existingDiary => {
      const updatedDiary = existingDiary;

      updatedDiary.diaryFilms = updatedDiary.diaryFilms.filter(
        film => film.imdbID != imdbID
      );

      return updatedDiary;
    })
    .then(updatedDiary => {
      return Films.findOneAndUpdate({ userID }, updatedDiary, { new: true })
        .then(result => result)
        .catch(error => next(error));
    })
    .then(() => res.status(204).end())
    .catch(error => next(error));
};
