'use strict';

var _mocha = require('mocha');

var _chai = require('chai');

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _app = require('../app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _chai.use)(_chaiHttp2.default);

(0, _mocha.describe)('A) POST registration /users/register', function () {
  var user = {
    firstname: 'Mark',
    lastname: 'Oluwadara',
    password: 'alternate',
    othername: 'Diablo',
    phoneNumber: '0777726617',
    username: 'Markitic',
    email: 'mark@mail.com'
  };
  (0, _mocha.it)('it should register a user', function (done) {
    (0, _chai.request)(_app2.default).post('/users/register').send(user).end(function (err, res) {
      _chai.assert.isObject(res.body, 'Should return an object');
      _chai.assert.equal(res.body.data[0].message, 'user has been registered successfully', 'error occured, user registration is unsuccessful');
      _chai.assert.equal(res.status, 201, 'request was unsuccessful');
      done(err);
    });
  });

  (0, _mocha.it)('it should return an error if there is no email provided', function (done) {
    (0, _chai.request)(_app2.default).post('/users/register').send({
      firstname: 'Pablo',
      lastname: 'Chux',
      othername: 'Dike',
      password: 'password',
      phoneNumber: '081237743299999',
      username: 'Pman',
      email: ''
    }).end(function (err, res) {
      _chai.assert.equal(res.status, 400);
      _chai.assert.equal(res.body.message, '"email" is not allowed to be empty', 'error occured, no email provided');
      done(err);
    });
  });
  (0, _mocha.it)('it should return an error if there is no firstname provided', function (done) {
    (0, _chai.request)(_app2.default).post('/users/register').send({
      firstname: '',
      lastname: 'Chux',
      othername: 'Dike',
      password: 'password',
      phoneNumber: '081237743299999',
      username: 'Pman',
      email: 'pablo@mail.com'
    }).end(function (err, res) {
      _chai.assert.equal(res.status, 400);
      _chai.assert.equal(res.body.message, '"firstname" is not allowed to be empty', 'error occured, no firstname provided');
      done(err);
    });
  });

  (0, _mocha.it)('it should return an error if there is no lastname provided', function (done) {
    (0, _chai.request)(_app2.default).post('/users/register').send({
      firstname: 'Pablo',
      lastname: '',
      othername: 'Dike',
      password: 'password',
      phoneNumber: '081237743299999',
      username: 'Pman',
      email: 'pablo@mail.com'
    }).end(function (err, res) {
      _chai.assert.equal(res.status, 400);
      _chai.assert.equal(res.body.message, '"lastname" is not allowed to be empty', 'error occured, no lasttname provided');
      done(err);
    });
  });

  (0, _mocha.it)('it should return an error if there is no password provided', function (done) {
    (0, _chai.request)(_app2.default).post('/users/register').send({
      firstname: 'Pablo',
      lastname: 'Chux',
      othername: 'Dike',
      password: '',
      phoneNumber: '081237743299999',
      username: 'Pman',
      email: 'pablo@mail.com'
    }).end(function (err, res) {
      _chai.assert.equal(res.status, 400);
      _chai.assert.equal(res.body.message, '"password" is not allowed to be empty', 'error occured, no password provided');
      done(err);
    });
  });

  (0, _mocha.it)('it should return an error if there is no phoneNumber provided', function (done) {
    (0, _chai.request)(_app2.default).post('/users/register').send({
      firstname: 'Pablo',
      lastname: 'Chux',
      othername: 'Dike',
      password: 'password',
      phoneNumber: '',
      username: 'Pman',
      email: 'pablo@mail.com'
    }).end(function (err, res) {
      _chai.assert.equal(res.status, 400);
      _chai.assert.equal(res.body.message, '"phoneNumber" is not allowed to be empty', 'error occured, no phoneNumber provided');
      done(err);
    });
  });

  (0, _mocha.it)('it should return an error if there is no username provided', function (done) {
    (0, _chai.request)(_app2.default).post('/users/register').send({
      firstname: 'Pablo',
      lastname: 'Chux',
      othername: 'Dike',
      password: 'password',
      phoneNumber: '081237743299999',
      username: '',
      email: 'pablo@mail.com'
    }).end(function (err, res) {
      _chai.assert.equal(res.status, 400);
      _chai.assert.equal(res.body.message, '"username" is not allowed to be empty', 'error occured, no username provided');
      done(err);
    });
  });
});

(0, _mocha.describe)('B) POST login /auth/users/login', function () {
  (0, _mocha.it)('it should login in a user', function (done) {
    (0, _chai.request)(_app2.default).post('/auth/users/login').send({
      email: 'mark@mail.com',
      password: 'alternate'
    }).end(function (err, res) {
      _chai.assert.equal(res.body.data[0].message, 'login was successful');
      _chai.assert.exists(res.body.data[0].user, 'an error occured, firstname does not exist');
      _chai.assert.isObject(res.body.data[0].user, 'it should be an object');
      _chai.assert.isNotEmpty(res.body.data[0].user, 'it should not empty');
      _chai.assert.equal(res.status, 201, 'request was unsuccessful');
      done(err);
    });
  });

  (0, _mocha.it)('it should return an error if there is no email provided', function (done) {
    (0, _chai.request)(_app2.default).post('/auth/users/login').send({
      email: '',
      password: 'alternate'
    }).end(function (err, res) {
      _chai.assert.equal(res.status, 400);
      _chai.assert.equal(res.body.message, '"email" is not allowed to be empty', 'error occured, email is not provided');
      done(err);
    });
  });

  (0, _mocha.it)('it should return an error if there is no password provided', function (done) {
    (0, _chai.request)(_app2.default).post('/auth/users/login').send({
      email: 'mark@mail.com',
      password: ''
    }).end(function (err, res) {
      _chai.assert.equal(res.status, 400);
      _chai.assert.equal(res.body.message, '"password" is not allowed to be empty', 'error occured, password is not provided');
      done(err);
    });
  });

  (0, _mocha.it)('it should return an error if the wrong email is provided', function (done) {
    (0, _chai.request)(_app2.default).post('/auth/users/login').send({
      email: 'marksddf@mail.com',
      password: 'alternate'
    }).end(function (err, res) {
      _chai.assert.equal(res.status, 401);
      _chai.assert.equal(res.body.message, 'Email or password is incorrect');
      done(err);
    });
  });

  (0, _mocha.it)('it should return an error if the wrong password is provided', function (done) {
    (0, _chai.request)(_app2.default).post('/auth/users/login').send({
      email: 'mark@mail.com',
      password: 'allterbb'
    }).end(function (err, res) {
      _chai.assert.equal(res.status, 401);
      _chai.assert.equal(res.body.message, 'Email or password is incorrect');
      done(err);
    });
  });
});