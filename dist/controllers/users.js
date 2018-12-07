'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _user = require('../model/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  /**
  * @function registerUser -registers a user
  * @function getUser - gets a registered user
  * @param {object} req - request object
  * @param {object} res - a response object
  * @returns {object} json data
  */

  // register user
  registerUser: function registerUser(req, res) {
    var id = _user2.default.users.length;
    var admin = false;

    var user = {
      id: id,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      othername: req.body.othername,
      phoneNumber: req.body.phonenumber,
      registered: req.body.date,
      username: req.body.username,
      email: req.body.email,
      admin: admin
    };

    _user2.default.users.push(user);
    return res.json({
      status: res.statusCode,
      users: [{
        id: id,
        message: 'user has been registered successfully'
      }]
    });
  },

  // get registered user
  getUser: function getUser(req, res) {
    var user = _user2.default.users.find(function (u) {
      return u.id === parseInt(req.params.id, 10);
    });
    if (!user) {
      return res.status(404).json({
        status: res.statusCode,
        message: 'An error occured, user not found'
      });
    }
    return res.json({
      status: res.statusCode,
      users: [user]
    });
  }
};