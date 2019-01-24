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

(0, _mocha.describe)('E) PATCH incidents', function () {
  (0, _mocha.before)(function (done) {
    (0, _chai.request)(_app2.default).post('/auth/users/login').send({ email: 'mark@mail.com', password: 'alternate' }).end(function (err, res) {
      // eslint-disable-next-line prefer-destructuring
      token = res.body.data[0].token;
      done(err);
    });
  });

  (0, _mocha.it)('it should return an error if token cannot be verifed', function (done) {
    (0, _chai.request)(_app2.default).patch('/api/v1/incidents/1').set('authorization', 'Bearer kkjdduu88999jxxxxxxxxxxxxnns66s').send({
      comment: 'Bribery at ijk bank',
      location: 'Rumuola, PortHarcourt',
      title: 'Bribery and corruption'
    }).end(function (err, res) {
      _chai.assert.equal(res.status, 401);
      _chai.assert.equal(res.body.message, 'Error, token not verified', 'error occured, wrong token');
      done(err);
    });
  });
  (0, _mocha.it)('it should return an error if no authorization token is provided', function (done) {
    (0, _chai.request)(_app2.default).patch('/api/v1/incidents/1').set('authorization', '').send({
      comment: 'Bribery at ijk bank',
      location: 'Rumuola, PortHarcourt',
      title: 'Bribery and corruption'
    }).end(function (err, res) {
      _chai.assert.equal(res.status, 401);
      _chai.assert.equal(res.body.message, 'no authorization provided', 'error occured, token is not provided');
      done(err);
    });
  });
  (0, _mocha.it)('it should update given records\'s location', function (done) {
    (0, _chai.request)(_app2.default).patch('/api/v1/incidents/1/location').set('authorization', 'Bearer ' + token).send({
      location: 'Rumuola, PortHarcourt'
    }).end(function (err, res) {
      _chai.assert.equal(res.status, 200);
      _chai.assert.equal(res.body.message, 'Location has been updated successfully');
      _chai.assert.isArray(res.body.data, 'This should be an array of objects');
      done(err);
    });
  });
  (0, _mocha.it)('it should return an error when invalid incident id is requested', function (done) {
    (0, _chai.request)(_app2.default).patch('/api/v1/incidents/jjkm/location').set('authorization', 'Bearer ' + token).end(function (err, res) {
      _chai.assert.equal(res.status, 404);
      _chai.assert.equal(res.body.message, 'invalid incident id');
      done(err);
    });
  });
  (0, _mocha.it)('it should return an error if location is not provided', function (done) {
    (0, _chai.request)(_app2.default).patch('/api/v1/incidents/1/location').set('authorization', 'Bearer ' + token).send({
      location: ''
    }).end(function (err, res) {
      _chai.assert.equal(res.status, 400);
      _chai.assert.equal(res.body.message, '"location" is not allowed to be empty');
      done(err);
    });
  });
  (0, _mocha.it)('it should update given records\'s comment', function (done) {
    (0, _chai.request)(_app2.default).patch('/api/v1/incidents/1/comment').set('authorization', 'Bearer ' + token).send({
      comment: 'Gross misconduct at xyz bank'
    }).end(function (err, res) {
      _chai.assert.equal(res.status, 200);
      _chai.assert.equal(res.body.message, 'Comment has been updated successfully');
      _chai.assert.isArray(res.body.data, 'This should be an array of objects');
      done(err);
    });
  });
  (0, _mocha.it)('it should return an error when invalid incident id is requested', function (done) {
    (0, _chai.request)(_app2.default).patch('/api/v1/incidents/jjkm/comment').set('authorization', 'Bearer ' + token).end(function (err, res) {
      _chai.assert.equal(res.status, 404);
      _chai.assert.equal(res.body.message, 'invalid incident id');
      done(err);
    });
  });
  (0, _mocha.it)('it should return an error if comment is not provided', function (done) {
    (0, _chai.request)(_app2.default).patch('/api/v1/incidents/1/comment').set('authorization', 'Bearer ' + token).send({
      comment: ''
    }).end(function (err, res) {
      _chai.assert.equal(res.status, 400);
      _chai.assert.equal(res.body.message, '"comment" is not allowed to be empty');
      done(err);
    });
  });
  (0, _mocha.it)('it should return an error when invalid incident id is requested', function (done) {
    (0, _chai.request)(_app2.default).patch('/api/v1/incidents/jjkm').set('authorization', 'Bearer ' + token).end(function (err, res) {
      _chai.assert.equal(res.status, 404);
      _chai.assert.equal(res.body.message, 'invalid incident id');
      done(err);
    });
  });
  (0, _mocha.it)('it should update a given record', function (done) {
    (0, _chai.request)(_app2.default).patch('/api/v1/incidents/1').set('authorization', 'Bearer ' + token).send({
      comment: 'Bribery at ijk bank',
      location: 'Asaba Delta',
      title: 'Bribery and corruption'
    }).end(function (err, res) {
      _chai.assert.equal(res.status, 200);
      _chai.assert.equal(res.body.message, 'Record has been updated successfully');
      _chai.assert.isArray(res.body.data, 'This should be an array of object');
      done(err);
    });
  });
  (0, _mocha.it)('it should return an error if comment is no provided', function (done) {
    (0, _chai.request)(_app2.default).patch('/api/v1/incidents/1').set('authorization', 'Bearer ' + token).send({
      comment: '',
      location: 'Asaba Delta',
      title: 'Bribery and corruption'
    }).end(function (err, res) {
      _chai.assert.equal(res.status, 400);
      _chai.assert.equal(res.body.message, '"comment" is not allowed to be empty');
      done(err);
    });
  });
  (0, _mocha.it)('it should return an error if location is not provided', function (done) {
    (0, _chai.request)(_app2.default).patch('/api/v1/incidents/1').set('authorization', 'Bearer ' + token).send({
      comment: 'Bribery at ijk bank',
      location: '',
      title: 'Bribery and corruption'
    }).end(function (err, res) {
      _chai.assert.equal(res.status, 400);
      _chai.assert.equal(res.body.message, '"location" is not allowed to be empty');
      done(err);
    });
  });

  (0, _mocha.it)('it should return an error when invalid incident id is requested', function (done) {
    (0, _chai.request)(_app2.default).patch('/api/v1/incidents/jjkm/status').set('authorization', 'Bearer ' + token).end(function (err, res) {
      _chai.assert.equal(res.status, 404);
      _chai.assert.equal(res.body.message, 'invalid incident id');
      done(err);
    });
  });

  (0, _mocha.it)('it should update given records\'s status', function (done) {
    (0, _chai.request)(_app2.default).patch('/api/v1/incidents/1/status').set('authorization', 'Bearer ' + token).send({
      status: 'draft'
    }).end(function (err, res) {
      _chai.assert.equal(res.status, 200);
      _chai.assert.equal(res.body.message, 'Status changed successfully');
      _chai.assert.isArray(res.body.data, 'This should be an array of objects');
      done(err);
    });
  });
});