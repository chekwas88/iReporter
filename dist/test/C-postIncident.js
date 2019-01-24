'use strict';

var _mocha = require('mocha');

var _chai = require('chai');

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _app = require('../app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _chai.use)(_chaiHttp2.default);

var token = void 0;

(0, _mocha.describe)('C) POST incidents', function () {
  (0, _mocha.before)(function (done) {
    (0, _chai.request)(_app2.default).post('/auth/users/login').send({ email: 'mark@mail.com', password: 'alternate' }).end(function (err, res) {
      // eslint-disable-next-line prefer-destructuring
      token = res.body.data[0].token;
      done(err);
    });
  });
  (0, _mocha.it)('it should post an incident record', function (done) {
    (0, _chai.request)(_app2.default).post('/api/v1/incidents').set('authorization', 'Bearer ' + token).send({
      title: 'Money Laundering',
      comment: 'Money Laundering in ABC bank',
      location: 'Surulere Lagos'
    }).end(function (err, res) {
      _chai.assert.equal(res.status, 201);
      _chai.assert.equal(res.body.data[0].message, 'Record created successfully');
      _chai.assert.exists(res.body.data[0].record);
      _chai.assert.isObject(res.body.data[0].record);
      _chai.assert.isNotEmpty(res.body.data[0].record);
      done(err);
    });
  });
  (0, _mocha.it)('it should return an error if no authorization token is provided', function (done) {
    (0, _chai.request)(_app2.default).post('/api/v1/incidents').set('authorization', '').send({
      title: 'Money Laundering',
      comment: 'Money Laundering in ABC bank',
      location: 'Surulere Lagos'
    }).end(function (err, res) {
      _chai.assert.equal(res.status, 401);
      _chai.assert.equal(res.body.message, 'no authorization provided', 'error occured, token is not provided');
      done(err);
    });
  });
  (0, _mocha.it)('it should return an error if token cannot be verifed', function (done) {
    (0, _chai.request)(_app2.default).post('/api/v1/incidents').set('authorization', 'Bearer kkjdduu88999jxxxxxxxxxxxxnns66s').send({
      title: 'Money Laundering',
      comment: 'Money Laundering in ABC bank',
      location: 'surulere, Lagos'
    }).end(function (err, res) {
      _chai.assert.equal(res.status, 401);
      _chai.assert.equal(res.body.message, 'Error, token not verified', 'error occured, wrong token');
      done(err);
    });
  });

  (0, _mocha.it)('it should return an error if no comment is provided', function (done) {
    (0, _chai.request)(_app2.default).post('/api/v1/incidents').set('authorization', 'Bearer ' + token).send({
      title: 'Money Laundering',
      comment: '',
      location: 'Surulere Lagos'
    }).end(function (err, res) {
      _chai.assert.equal(res.status, 400);
      _chai.assert.equal(res.body.message, '"comment" is not allowed to be empty', 'error occured, comment is not provided');
      done(err);
    });
  });

  (0, _mocha.it)('it should return an error if no location is provided', function (done) {
    (0, _chai.request)(_app2.default).post('/api/v1/incidents').set('authorization', 'Bearer ' + token).send({
      title: 'Money Laundering',
      comment: 'Money Laundering in ABC bank',
      location: ''
    }).end(function (err, res) {
      _chai.assert.equal(res.status, 400);
      _chai.assert.equal(res.body.message, '"location" is not allowed to be empty', 'error occured, location is not provided');
      done(err);
    });
  });
});