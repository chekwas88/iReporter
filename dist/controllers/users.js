'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _dbConnection = require('../db/db-connection');

var _dbConnection2 = _interopRequireDefault(_dbConnection);

var _token = require('../middleware/token');

var _token2 = _interopRequireDefault(_token);

var _verifyPassword = require('../middleware/verifyPassword');

var _verifyPassword2 = _interopRequireDefault(_verifyPassword);

var _queryutils = require('../queryutils');

var _queryutils2 = _interopRequireDefault(_queryutils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pool = (0, _dbConnection2.default)();
_dotenv2.default.config();

exports.default = {
  /**
  * @function registerUser -registers a user
  * @param {object} req - request object
  * @param {object} res - a response object
  * @returns {object} json data
  */

  registerUser: function registerUser(req, res) {
    var _req$body = req.body,
        firstname = _req$body.firstname,
        lastname = _req$body.lastname,
        email = _req$body.email,
        othername = _req$body.othername,
        password = _req$body.password,
        phoneNumber = _req$body.phoneNumber,
        username = _req$body.username;

    var encrypt = _verifyPassword2.default.hidePassword(password);
    pool.query(_queryutils2.default.createUserQuery, [firstname, lastname, email, othername, encrypt, phoneNumber, username], function (err, response) {
      if (err) {
        console.log(err);
        return res.status(500).send({
          message: 'An error occured, registration failed'
        });
      }
      var token = _token2.default.generateToken({ id: response.rows[0].id });
      return res.status(201).json({
        status: res.statusCode,
        data: [{
          id: response.rows[0].id,
          message: 'user has been registered successfully',
          token: token,
          user: {
            firstname: response.rows[0].firstname,
            lastname: response.rows[0].lastname,
            othername: response.rows[0].othername,
            phoneNumber: response.rows[0].phoneNumber,
            username: response.rows[0].username
          }
        }]
      });
    });
  },

  /**
  * @function login - log's in a registered user
  * @param {object} req - request object
  * @param {object} res - a response object
  * @returns {object} json data
  */
  login: function login(req, res) {
    var _req$body2 = req.body,
        email = _req$body2.email,
        password = _req$body2.password;

    pool.query(_queryutils2.default.loginQuery, [email], function (err, response) {
      if (err) {
        console.log(err);
        return res.status(500).send({
          message: 'server error, unable to login'
        });
      }
      var user = response.rows[0];
      if (!user) {
        return res.status(401).send({
          status: res.statusCode,
          message: 'Email or password is incorrect'
        });
      }
      var encryptedPassword = response.rows[0].password;
      var decodedPassword = _verifyPassword2.default.checkPassword(password, encryptedPassword);
      if (!decodedPassword) {
        return res.status(401).json({
          status: res.statusCode,
          message: 'Email or password is incorrect'
        });
      }
      var _response$rows$ = response.rows[0],
          id = _response$rows$.id,
          username = _response$rows$.username,
          isadmin = _response$rows$.isadmin;

      var payload = {
        id: id,
        username: username,
        isadmin: isadmin
      };
      var token = _token2.default.generateToken(payload);

      return res.status(201).json({
        status: res.statusCode,
        data: [{
          id: response.rows[0].id,
          message: 'login was successful',
          token: token,
          user: {
            firstname: response.rows[0].firstname,
            lastname: response.rows[0].lastname,
            othername: response.rows[0].othername,
            phoneNumber: response.rows[0].phoneNumber,
            username: response.rows[0].username
          }
        }]
      });
    });
  }
};