'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const { PORT, CLIENT_ORIGIN } = require('./config');
const { dbConnect } = require('./db-mongoose');

const app = express();

app.use(
  morgan(process.env.NODE_ENV === 'production' ? 'common' : 'dev', {
    skip: (req, res) => process.env.NODE_ENV === 'test'
  })
);

app.use(
  cors({
    origin: CLIENT_ORIGIN
  })
);

app.get('/api/diary', (req, res, next) => {
  const a = {
    error: null,
    diaryFilms: [
      {
        diaryID: '12345',
        imdbID: 'tt3896198',
        title: 'Guardians of the Galaxy Vol. 2',
        plot:
          "The Guardians must fight to keep their newfound family together as they unravel the mystery of Peter Quill's true parentage.",
        actors: ['Jessica Chastain', 'Joaquin Phoenix'],
        poster:
          'https://m.media-amazon.com/images/M/MV5BMTg2MzI1MTg3OF5BMl5BanBnXkFtZTgwNTU3NDA2MTI@._V1_SX300.jpg',
        ratings: [
          {
            Source: 'Internet Movie Database',
            Value: '7.7/10'
          },
          {
            Source: 'Rotten Tomatoes',
            Value: '83%'
          },
          {
            Source: 'Metacritic',
            Value: '67/100'
          }
        ]
      },
      {
        diaryID: '22345',
        imdbID: 'tt3896198',
        title: 'Guardians of the Galaxy Vol. 2',
        plot:
          "The Guardians must fight to keep their newfound family together as they unravel the mystery of Peter Quill's true parentage.",
        actors: ['Jessica Chastain', 'Joaquin Phoenix'],
        poster:
          'https://m.media-amazon.com/images/M/MV5BMTg2MzI1MTg3OF5BMl5BanBnXkFtZTgwNTU3NDA2MTI@._V1_SX300.jpg',
        ratings: [
          {
            Source: 'Internet Movie Database',
            Value: '7.7/10'
          },
          {
            Source: 'Rotten Tomatoes',
            Value: '83%'
          },
          {
            Source: 'Metacritic',
            Value: '67/100'
          }
        ]
      },
      {
        diaryID: '32345',
        imdbID: 'tt3896198',
        title: 'Guardians of the Galaxy Vol. 2',
        plot:
          "The Guardians must fight to keep their newfound family together as they unravel the mystery of Peter Quill's true parentage.",
        actors: ['Jessica Chastain', 'Joaquin Phoenix'],
        poster:
          'https://m.media-amazon.com/images/M/MV5BMTg2MzI1MTg3OF5BMl5BanBnXkFtZTgwNTU3NDA2MTI@._V1_SX300.jpg',
        ratings: [
          {
            Source: 'Internet Movie Database',
            Value: '7.7/10'
          },
          {
            Source: 'Rotten Tomatoes',
            Value: '83%'
          },
          {
            Source: 'Metacritic',
            Value: '67/100'
          }
        ]
      }
    ]
  };
  res.json(a);
});

function runServer(port = PORT) {
  const server = app
    .listen(port, () => {
      console.info(`App listening on port ${server.address().port}`);
    })
    .on('error', err => {
      console.error('Express failed to start');
      console.error(err);
    });
}

if (require.main === module) {
  dbConnect();
  runServer();
}

module.exports = { app };
