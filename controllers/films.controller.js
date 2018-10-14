// Mongoose
const mongoose = require('mongoose');

// Models
const Films = require('../models/films');

// Get all films
exports.getAllFilms = function(req, res, next) {
  // const { folderID, tagID } = req.query;

  Films.find()
    .then(results => {
      console.log(results);
      res.json(results);
    })
    .catch(next);
};

// Get film by ID

// Update film by ID

// Create new film

// Delete film
