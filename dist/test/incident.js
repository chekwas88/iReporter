'use strict';

var _mocha = require('mocha');

var _chai = require('chai');

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _app = require('../app');

var _app2 = _interopRequireDefault(_app);

var _incident = require('../model/incident');

var _incident2 = _interopRequireDefault(_incident);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _chai.use)(_chaiHttp2.default);

(0, _mocha.describe)('/GET all red-flags', function () {
  (0, _mocha.it)('it should return all red-flags', function (done) {
    (0, _chai.request)(_app2.default).get('/api/v1/red-flags').end(function (err, res) {
      if (err) done();
      _chai.assert.exists(_incident2.default.incidents, 'incidents does not exist');
      _chai.assert.isArray(_incident2.default.incidents, 'incident is not an array');
      _chai.assert.equal(res.status, 200, 'request was not successful');
    });
    done();
  });
});

(0, _mocha.describe)('/POST red-flags', function () {
  var incident = {
    createdBy: 7,
    type: 'redflag',
    title: 'ffd',
    comment: 'p',
    location: 'lag',
    createdOn: '9/8/19'
  };
  (0, _mocha.it)('it should Create a red-flag', function (done) {
    (0, _chai.request)(_app2.default).post('/api/v1/red-flags').send(incident).end(function (err, res) {
      if (err) done(err);
      _chai.assert.equal(res.body.incidents[0].message, 'red-flag incident was created successfully', 'error occured while posting incident');
      _chai.assert.equal(res.status, 200, 'request was successful');
    });
    done();
  });
});

(0, _mocha.describe)('/Get red-flags/:id', function () {
  (0, _mocha.it)('it should get a red-flag', function (done) {
    (0, _chai.request)(_app2.default).get('/api/v1/red-flags/0').end(function (err, res) {
      if (err) done(err);
      _chai.assert.exists(res.body.incidents[0].location, 'an error occured, location does not exist');
      _chai.assert.exists(res.body.incidents[0].comment, 'an error occured, comment does not exist');
      _chai.assert.equal(res.status, 200, 'request was unsuccessful');
    });
    done();
  });
});

(0, _mocha.describe)('/PATCH red-flags/:id/location', function () {
  var place = {
    location: 'Ikeja, Lagos'

  };
  (0, _mocha.it)('it should get a red-flag location', function (done) {
    (0, _chai.request)(_app2.default).patch('/api/v1/red-flags/0/location').send(place).end(function (err, res) {
      if (err) done(err);
      _chai.assert.equal(res.body.incidents[0].message, 'location has been successfully updated', 'error occured while patching location');
      _chai.assert.equal(res.status, 200, 'request was unsuccessful');
    });
    done();
  });
});

(0, _mocha.describe)('/PATCH red-flags/:id/comment', function () {
  (0, _mocha.it)('it should get a red-flag comment', function (done) {
    (0, _chai.request)(_app2.default).patch('/api/v1/red-flags/0/comment').send({ comment: 'Ikeja, Lagos' }).end(function (err, res) {
      if (err) done(err);
      _chai.assert.equal(res.body.incidents[0].message, 'comment has been successfully updated', 'error occured while patching comment');
      _chai.assert.equal(res.status, 200, 'request was unsuccessful');
    });
    done();
  });
});

(0, _mocha.describe)('PATCH /api/v1/red-flags/:id', function () {
  var incident = {
    type: 'redflag',
    title: 'ffd',
    comment: 'p',
    location: 'lag'
  };
  (0, _mocha.it)('it should update an incident', function (done) {
    (0, _chai.request)(_app2.default).patch('/api/v1/red-flags/0').send(incident).end(function (err, res) {
      if (err) done(err);
      _chai.assert.equal(res.body.incidents[0].message, 'redcord has been successfully updated', 'error occured, while record is updating');
      _chai.assert.equal(res.status, 200, 'request was unsuccessful');
    });
    done();
  });
});

(0, _mocha.describe)('/Get red-flags/:id', function () {
  (0, _mocha.it)('it should delete a red-flag', function (done) {
    (0, _chai.request)(_app2.default).delete('/api/v1/red-flags/0').end(function (err, res) {
      if (err) done(err);
      _chai.assert.equal(res.body.incidents[0].message, 'record deleted successfully', 'it should delete a record');
      _chai.assert.equal(res.status, 200, 'request was unsuccessful');
    });
    done();
  });
});