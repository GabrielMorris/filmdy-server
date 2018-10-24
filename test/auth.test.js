'use strict';
const { app } = require('../index');
const Users = require('../models/users');
const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { users } = require('../db/seed');

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
  let token;
  let user;

  return Promise.all([Users.insertMany(users)]).then(([users]) => {
    user = users[0];
    token = jwt.sign({ user }, JWT_SECRET, { subject: user.username });
  });
});

afterEach(function() {
  return mongoose.connection.db.dropDatabase();
});

after(function() {
  return dbDisconnect();
});

describe('Auth route test', function() {
  it('Should log in a user and return an auth token when they provide correct log in information', function() {
    return chai
      .request(app)
      .post('/api/login')
      .send({ username: 'bobuser', password: 'password' })
      .then(res => {
        expect(res).to.exist;
        expect(res.body).to.have.keys('authToken');
        expect(res.body.authToken).to.be.a('string');
      });
  });

  it('Should refresh an auth token', function() {
    let authToken;

    return chai
      .request(app)
      .post('/api/login')
      .send({ username: 'bobuser', password: 'password' })
      .then(res => {
        authToken = res.body.authToken;
        expect(res).to.exist;
        expect(res.body).to.have.keys('authToken');
        expect(res.body.authToken).to.be.a('string');
      })
      .then(() => {
        return chai
          .request(app)
          .post('/api/login')
          .set('Authorization', `Bearer ${authToken}`)
          .send({ username: 'bobuser', password: 'password' })
          .then(response => {
            expect(response.body).to.be.an('object');
            expect(response.body).to.have.keys('authToken');
            expect(response.body.authToken).to.be.a('string');
          });
      });
  });

  it('Should fail to authenticate a user with incorrect information', function() {
    return chai
      .request(app)
      .post('/api/login')
      .send({ username: 'bobuser', password: 'nopenopenope' })
      .then(res => {
        expect(res.body).to.have.keys('name', 'message', 'status');
        expect(res).to.have.status(401);
        expect(res.body.name).to.be.equal('AuthenticationError');
      });
  });
});
