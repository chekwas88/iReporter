'use strict';

var _mocha = require('mocha');

var _chai = require('chai');

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _createTables = require('../db/createTables');

var _createTables2 = _interopRequireDefault(_createTables);

var _app = require('../app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _chai.use)(_chaiHttp2.default);

(0, _mocha.describe)('A) GET index', function () {
  (0, _mocha.before)(function (done) {
    _createTables2.default.createTables();
    done();
  });
  (0, _mocha.it)('should return 200 and success message for the / route', function (done) {
    (0, _chai.request)(_app2.default).get('/api/v1/').end(function (err, res) {
      _chai.assert.equal(res.status, 200);
      _chai.assert.equal(res.body.message, 'Welcome to iReporter');
      done(err);
    });
  });

  (0, _mocha.it)('should return a 404 for all invalid routes', function (done) {
    (0, _chai.request)(_app2.default).post('/api/v1/endpoint').end(function (err, res) {
      _chai.assert.equal(res.status, 404);
      _chai.assert.equal(res.body.message, 'No such endpoint exist');
      done(err);
    });
  });
});