'use strict';
const { app } = require('../index');
const Users = require('../models/users');
const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');

const { TEST_DATABASE_URL } = require('../config');
const { dbConnect, dbDisconnect } = require('../db-mongoose');

// Set NODE_ENV to `test` to disable http layer logs
// You can do this in the command line, but this is cross-platform
process.env.NODE_ENV = 'test';

// Clear the console before each run
process.stdout.write('\x1Bc\n');

const expect = chai.expect;
chai.use(chaiHttp);

before(function() {
  return dbConnect(TEST_DATABASE_URL).then(() =>
    mongoose.connection.db.dropDatabase()
  );
});

afterEach(function() {
  return mongoose.connection.db.dropDatabase();
});

after(function() {
  return dbDisconnect();
});

describe('User route test', function() {
  it('Should create a new user when we post with valid information', function() {
    const username = 'testuser';
    const password = 'potatohead';

    const testUser = {
      username,
      password
    };

    let res;

    return chai
      .request(app)
      .post('/api/users')
      .send(testUser)
      .then(_res => {
        res = _res;

        expect(res).to.have.status(201);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.keys('id', 'username');

        expect(res.body.id).to.exist;
        expect(res.body.username).to.equal(testUser.username);

        return Users.findOne({ username });
      })
      .then(user => {
        expect(user).to.exist;
        expect(user.id).to.be.equal(res.body.id);
        return user.validatePassword(password);
      })
      .then(isValid => {
        expect(isValid).to.be.true;
      });
  });

  it('Should fail to create a user when we are missing required fields', function() {
    const username = 'thisshouldfail';

    const testUser = { username };

    let res;

    return chai
      .request(app)
      .post('/api/users')
      .send(testUser)
      .then(_res => {
        res = _res;

        expect(res).to.have.status(422);
        expect(res.body).to.have.keys('status', 'message');
        expect(res.body.message).to.equal('Missing password in request body');

        return Users.findOne({ username });
      })
      .then(user => {
        expect(user).to.be.null;
      });
  });

  it('Should fail to create a user when a required field is not a string', function() {
    const username = 12345;
    const password = 'thisshouldfail';

    const testUser = { username, password };

    let res;

    return chai
      .request(app)
      .post('/api/users')
      .send(testUser)
      .then(_res => {
        res = _res;

        expect(res).to.have.status(422);
        expect(res.body).to.have.keys('status', 'message');
        expect(res.body.message).to.equal('All values must be strings');

        return Users.findOne({ username });
      })
      .then(user => {
        expect(user).to.be.null;
      });
  });

  it('Should fail to create a user with leading/trailing whitespace', function() {
    const username = 'thisshouldfail   ';
    const password = 'hellomoto';

    const testUser = { username, password };

    let res;

    return chai
      .request(app)
      .post('/api/users')
      .send(testUser)
      .then(_res => {
        res = _res;

        expect(res).to.have.status(422);
        expect(res.body).to.have.keys('status', 'message');
        expect(res.body.message).to.equal(
          'Values may not contain leading/trailing whitespace'
        );

        return Users.findOne({ username });
      })
      .then(user => {
        expect(user).to.be.null;
      });
  });

  it('Should fail to create a user if the username is <= 1 character', function() {
    const username = 'h';
    const password = 'helklkleak';

    const testUser = { username, password };

    let res;

    return chai
      .request(app)
      .post('/api/users')
      .send(testUser)
      .then(_res => {
        res = _res;

        expect(res).to.have.status(422);
        expect(res.body).to.have.keys('status', 'message');
        expect(res.body.message).to.equal('Username must be >1 character');

        return Users.findOne({ username });
      })
      .then(user => {
        expect(user).to.be.null;
      });
  });

  it('Should fail to create a user with a password that is not 8-72 characters', function() {
    const username = 'hellomoto';
    const password = 'hh';

    const testUser = { username, password };

    let res;

    return chai
      .request(app)
      .post('/api/users')
      .send(testUser)
      .then(_res => {
        res = _res;

        expect(res).to.have.status(422);
        expect(res.body).to.have.keys('status', 'message');
        expect(res.body.message).to.equal(
          'Password must be between 8-72 characters'
        );

        return Users.findOne({ username });
      })
      .then(user => {
        expect(user).to.be.null;
      });
  });
});
