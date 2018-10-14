require('dotenv').config();
const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI;

const { films } = require('../db/seed');

const Films = require('../models/films');

mongoose
  .connect(
    MONGODB_URI,
    { useNewUrlParser: true }
  )
  .then(() => mongoose.connection.db.dropDatabase())
  .then(() => {
    return Films.create(films);
    // return Films.insertMany(films);
  })
  .then(results => {
    console.info(`Inserted ${results.length} films`);
  })
  .then(() => mongoose.disconnect())
  .catch(err => {
    console.error(err);
  });
