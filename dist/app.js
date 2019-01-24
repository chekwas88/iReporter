'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _users = require('./routes/users');

var _users2 = _interopRequireDefault(_users);

var _incidents = require('./routes/incidents');

var _incidents2 = _interopRequireDefault(_incidents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.use((0, _express.json)());
app.use(_users2.default);
app.use(_incidents2.default);

app.get('/api/v1/', function (req, res) {
  res.status(200).json({
    message: 'Welcome to iReporter'
  });
});

app.all('*', function (req, res) {
  res.status(404).json({
    message: 'No such endpoint exist'
  });
});
var port = process.env.PORT || 4001;
app.listen(port, function () {
  return console.log('Listening on port ' + port);
});

exports.default = app;