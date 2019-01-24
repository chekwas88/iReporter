'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();
var secret = process.env.SECRET_KEY;

exports.default = {
  /**
   * @description Verify token from the req provided by the user
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {object}
   */
  verifyToken: function verifyToken(req, res, next) {
    // check if the header is present
    if (!req.headers.authorization) {
      return res.status(401).json({
        status: res.statusCode,
        message: 'no authorization provided'
      });
    }
    // get token from the header
    var token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(403).json({
        status: res.statusCode,
        message: 'Please provide a valid token'
      });
    }
    _jsonwebtoken2.default.verify(token, secret, function (err, decoded) {
      if (err) {
        return res.status(401).json({
          message: 'Error, token not verified'
        });
      }
      req.user = decoded;
      return req.user;
    });
    return next();
  },

  generateToken: function generateToken(payload) {
    var token = _jsonwebtoken2.default.sign(payload, secret, { expiresIn: '1 day' });
    return token;
  }
};