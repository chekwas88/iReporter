'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _users = require('../controllers/users');

var _users2 = _interopRequireDefault(_users);

var _validate = require('../middleware/validate');

var _validate2 = _interopRequireDefault(_validate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.post('/users/register', _validate2.default.validateUser, _users2.default.registerUser);
router.post('/auth/users/login', _validate2.default.validateUserLogin, _users2.default.login);

exports.default = router;