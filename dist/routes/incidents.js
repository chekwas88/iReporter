'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _incident = require('../controllers/incident');

var _incident2 = _interopRequireDefault(_incident);

var _admin = require('../controllers/admin');

var _admin2 = _interopRequireDefault(_admin);

var _validate = require('../middleware/validate');

var _validate2 = _interopRequireDefault(_validate);

var _token = require('../middleware/token');

var _token2 = _interopRequireDefault(_token);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/api/v1/incidents', _token2.default.verifyToken, _admin2.default.getIncidents);
router.patch('/api/v1/incidents/:id/status', _token2.default.verifyToken, _validate2.default.validateIncidentId, _admin2.default.updateStatus);

router.get('/api/v1/user/profile/incidents', _token2.default.verifyToken, _incident2.default.getUserIncidents);

router.post('/api/v1/incidents', _token2.default.verifyToken, _validate2.default.validatePost, _incident2.default.createIncident);

router.get('/api/v1/incidents/:id', _token2.default.verifyToken, _validate2.default.validateIncidentId, _incident2.default.getIncident);

router.patch('/api/v1/incidents/:id/location', _token2.default.verifyToken, _validate2.default.validateIncidentId, _validate2.default.validatePatchLocation, _incident2.default.updateLocation);

router.patch('/api/v1/incidents/:id/comment', _token2.default.verifyToken, _validate2.default.validateIncidentId, _validate2.default.validatePatchComment, _incident2.default.updateComment);

router.patch('/api/v1/incidents/:id', _token2.default.verifyToken, _validate2.default.validateIncidentId, _validate2.default.validatePatchEdit, _incident2.default.updateAll);

router.delete('/api/v1/incidents/:id', _token2.default.verifyToken, _validate2.default.validateIncidentId, _incident2.default.deleteIncident);

exports.default = router;