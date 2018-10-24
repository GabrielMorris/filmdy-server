'use strict';
const { app } = require('../index');
const Users = require('../models/users');
const Films = require('../models/films');
const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { users, films } = require('../db/seed');

const { TEST_DATABASE_URL } = require('../config');
const JWT_SECRET = process.env.JWT_SECRET;
const { dbConnect, dbDisconnect } = require('../db-mongoose');

// Set NODE_ENV to `test` to disable http layer logs
// You can do this in the command line, but this is cross-platform
process.env.NODE_ENV = 'test';

// Clear the console before each run
process.stdout.write('\x1Bc\n');

const expect = chai.expect;
chai.use(chaiHttp);

before(function() {
  return dbConnect(TEST_DATABASE_URL).then(() => {
    mongoose.connection.db.dropDatabase();
  });
});

beforeEach(function() {
  mongoose.connection.db.dropDatabase();
  let token;
  let user;

  return Promise.all([Users.insertMany(users), Films.insertMany(films)]).then(
    ([users]) => {
      user = users[0];
      token = jwt.sign({ user }, JWT_SECRET, { subject: user.username });
    }
  );
});

afterEach(function() {
  return mongoose.connection.db.dropDatabase();
});

after(function() {
  return dbDisconnect();
});

describe('Auth route test', function() {
  it("Should get all the films from a user's diary", function() {
    let authToken;
    let res;

    return chai
      .request(app)
      .post('/api/login')
      .send({ username: 'bobuser', password: 'password' })
      .then(res => {
        authToken = res.body.authToken;
      })
      .then(() => {
        return chai
          .request(app)
          .get('/api/films')
          .set('Authorization', `Bearer ${authToken}`)
          .then(_res => {
            res = _res;
            expect(_res.body).to.be.an('array');
            expect(_res.body.length).to.be.greaterThan(0);
          });
      })
      .then(() => {
        return Films.findOne({ userID: res.body[0].userID });
      })
      .then(diary => {
        expect(res.body[0].diaryFilms).to.deep.equal(diary.diaryFilms);
      });
  });

  it('Should create a new film in a diary', function() {
    const newFilm = {
      imdbID: '12345',
      title: 'Hello title',
      plot: 'Hello plot',
      actors: 'Blah, blah, blah',
      poster: 'http://google.com',
      ratings: {},
      userRating: true
    };

    let authToken;
    let res;

    return chai
      .request(app)
      .post('/api/login')
      .send({ username: 'bobuser', password: 'password' })
      .then(res => {
        authToken = res.body.authToken;
      })
      .then(() => {
        return chai
          .request(app)
          .post('/api/films')
          .send({ film: newFilm })
          .set('Authorization', `Bearer ${authToken}`)
          .then(_res => {
            res = _res;
            expect(_res.body).to.be.an('object');
          });
      })
      .then(() => {
        return Films.findOne({ userID: res.body.userID });
      })
      .then(diary => {
        expect(res.body.diaryFilms).to.deep.equal(diary.diaryFilms);
      });
  });

  it('Should throw an error if no film in request body when creating a new film', function() {
    let authToken;

    return chai
      .request(app)
      .post('/api/login')
      .send({ username: 'bobuser', password: 'password' })
      .then(res => {
        authToken = res.body.authToken;
      })
      .then(() => {
        return chai
          .request(app)
          .post('/api/films')
          .send({})
          .set('Authorization', `Bearer ${authToken}`)
          .then(_res => {
            expect(_res.body).to.have.keys('status', 'message');
            expect(_res.body.message).to.equal('Missing film in request body');
          });
      });
  });

  it('Should throw an error if new film is missing a key', function() {
    const newFilm = {
      imdbID: '12345',
      title: 'Hello title',
      actors: 'Blah, blah, blah',
      poster: 'http://google.com',
      ratings: {},
      userRating: true
    };

    let authToken;

    return chai
      .request(app)
      .post('/api/login')
      .send({ username: 'bobuser', password: 'password' })
      .then(res => {
        authToken = res.body.authToken;
      })
      .then(() => {
        return chai
          .request(app)
          .post('/api/films')
          .send({ film: newFilm })
          .set('Authorization', `Bearer ${authToken}`)
          .then(_res => {
            expect(_res.body).to.have.keys('status', 'message');
            expect(_res.body.message).to.equal('Missing keys in request body');
          });
      });
  });

  it('Should delete a film if provided a valid imdbID', function() {
    const imdbID = 'tt1856101';
    let authToken;

    return chai
      .request(app)
      .post('/api/login')
      .send({ username: 'bobuser', password: 'password' })
      .then(res => {
        authToken = res.body.authToken;
      })
      .then(() => {
        return chai
          .request(app)
          .delete('/api/films')
          .send({ imdbID })
          .set('Authorization', `Bearer ${authToken}`)
          .then(res => {
            expect(res).to.have.status(204);
          });
      });
  });

  it("Should toggle a film's rating", function() {
    const imdbID = 'tt1856101';

    let res;
    let authToken;

    return chai
      .request(app)
      .post('/api/login')
      .send({ username: 'bobuser', password: 'password' })
      .then(res => {
        authToken = res.body.authToken;
      })
      .then(() => {
        return chai
          .request(app)
          .put('/api/films')
          .send({ imdbID })
          .set('Authorization', `Bearer ${authToken}`)
          .then(_res => {
            res = _res;
            expect(_res.body).to.be.an('object');
          });
      })
      .then(() => {
        return Films.findOne({ userID: res.body.userID });
      })
      .then(diary => {
        expect(res.body.diaryFilms).to.deep.equal(diary.diaryFilms);
      });
  });
});
