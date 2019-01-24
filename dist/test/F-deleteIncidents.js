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
(0, _mocha.describe)('F) Delete incident', function () {
  (0, _mocha.before)(function (done) {
    (0, _chai.request)(_app2.default).post('/auth/users/login').send({ email: 'mark@mail.com', password: 'alternate' }).end(function (err, res) {
      // eslint-disable-next-line prefer-destructuring
      token = res.body.data[0].token;
      done(err);
    });
  });
  (0, _mocha.it)('it should return an error if token cannot be verifed', function (done) {
    (0, _chai.request)(_app2.default).delete('/api/v1/incidents/1').set('authorization', 'Bearer kkjdduu88999jxxxxxxxxxxxxnns66s').end(function (err, res) {
      _chai.assert.equal(res.status, 401);
      _chai.assert.equal(res.body.message, 'Error, token not verified', 'error occured, wrong token');
      done(err);
    });
  });
  (0, _mocha.it)('it should return an error if no authorization token is provided', function (done) {
    (0, _chai.request)(_app2.default).delete('/api/v1/incidents/1').set('authorization', '').end(function (err, res) {
      _chai.assert.equal(res.status, 401);
      _chai.assert.equal(res.body.message, 'no authorization provided', 'error occured, token is not provided');
      done(err);
    });
  });
  (0, _mocha.it)('it should return an error when invalid incident id is requested', function (done) {
    (0, _chai.request)(_app2.default).delete('/api/v1/incidents/jjkm').set('authorization', 'Bearer ' + token).end(function (err, res) {
      _chai.assert.equal(res.status, 404);
      _chai.assert.equal(res.body.message, 'invalid incident id');
      done(err);
    });
  });
  (0, _mocha.it)('it should delete a given record', function (done) {
    (0, _chai.request)(_app2.default).delete('/api/v1/incidents/1').set('authorization', 'Bearer ' + token).end(function (err, res) {
      _chai.assert.equal(res.status, 200);
      _chai.assert.equal(res.body.message, 'Report has been deleted successfully');
      done(err);
    });
  });
});