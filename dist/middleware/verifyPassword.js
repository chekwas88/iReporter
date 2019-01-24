'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  /**
   *
   * @function hashPassword
   * @param {string} password
   * @returns {object} hashed
   */
  hidePassword: function hidePassword(password) {
    return _bcrypt2.default.hashSync(password, _bcrypt2.default.genSaltSync(6));
  },

  /**
   * @function checkPassword
   * @param {string} password
   * @param {string} hiddenPassword
   * @returns {object} hashed
   */
  checkPassword: function checkPassword(password, hiddenPassword) {
    return _bcrypt2.default.compareSync(password, hiddenPassword);
  }
};