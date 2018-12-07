'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _incident = require('./controllers/incident');

var _incident2 = _interopRequireDefault(_incident);

var _users = require('./controllers/users');

var _users2 = _interopRequireDefault(_users);

var _validate = require('./middleware/validate');

var _validate2 = _interopRequireDefault(_validate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.use((0, _express.json)());
// incidents endpoints
app.get('/api/v1/red-flags', _incident2.default.getIncidents);
app.post('/api/v1/red-flags', _validate2.default.validatePost, _incident2.default.createIncident);
app.get('/api/v1/red-flags/:id', _incident2.default.getIncident);
app.patch('/api/v1/red-flags/:id/location', _validate2.default.validatePatchLocation, _incident2.default.updateLocation);
app.patch('/api/v1/red-flags/:id/comment', _validate2.default.validatePatchComment, _incident2.default.updateComment);
app.delete('/api/v1/red-flags/:id', _incident2.default.deleteIncident);
app.patch('/api/v1/red-flags/:id', _validate2.default.validatePatchEdit, _incident2.default.updateAll);

// users endpoints
app.post('/api/v1/users', _validate2.default.validateUser, _users2.default.registerUser);
app.get('/api/v1/users/:id', _users2.default.getUser);

var port = process.env.PORT || 4001;
app.listen(port, function () {
  return console.log('Listening on port ' + port);
});

exports.default = app;