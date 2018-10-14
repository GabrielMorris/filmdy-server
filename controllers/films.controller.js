// Mongoose
const mongoose = require('mongoose');

// Models
const Films = require('../models/films');

exports.getAllFilms = function(req, res, next) {
  // const { folderID, tagID } = req.query;

  Films.find()
    .then(results => {
      console.log(results);
      res.json(results);
    })
    .catch(next);
};
