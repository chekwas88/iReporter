'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _createTableQueries = require('./create-table-queries');

var _createTableQueries2 = _interopRequireDefault(_createTableQueries);

var _dbConnection = require('./db-connection');

var _dbConnection2 = _interopRequireDefault(_dbConnection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();
var pool = (0, _dbConnection2.default)();

exports.default = {
  createTables: function createTables() {
    pool.query(_createTableQueries2.default).then(function (res) {
      console.log(res);
      pool.end();
    }).catch(function (err) {
      console.log(err);
      pool.end();
    });
  }
};