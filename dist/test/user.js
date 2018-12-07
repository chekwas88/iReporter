'use strict';

var _mocha = require('mocha');

var _chai = require('chai');

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _app = require('../app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _chai.use)(_chaiHttp2.default);

(0, _mocha.describe)('POST /api/v1/users', function () {
  var user = {
    firstname: 'klaus',
    lastname: 'Huron',
    othername: 'Diablo',
    phoneNumber: '098726617',
    registered: '98/98/98',
    username: 'AgentCorbinus',
    email: 'email@mail.com'
  };
  (0, _mocha.it)('it should register a user', function (done) {
    (0, _chai.request)(_app2.default).post('/api/v1/users').send(user).end(function (err, res) {
      if (err) done(err);
      _chai.assert.equal(res.body.users[0].message, 'user has been registered successfully', 'error occured, user registration is unsuccessful');
      _chai.assert.equal(res.status, 200, 'request was unsuccessful');
    });
    done();
  });
});

(0, _mocha.describe)('/Get user/:id', function () {
  (0, _mocha.it)('it should get a red-flag', function (done) {
    (0, _chai.request)(_app2.default).get('/api/v1/users/0').end(function (err, res) {
      if (err) done(err);
      _chai.assert.exists(res.body.users[0].firstname, 'an error occured, firstname does not exist');
      _chai.assert.exists(res.body.users[0].email, 'an error occured, email does not exist');
      _chai.assert.equal(res.status, 200, 'request was unsuccessful');
    });
    done();
  });
});