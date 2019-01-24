'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _dbConnection = require('./db-connection');

var _dbConnection2 = _interopRequireDefault(_dbConnection);

var _dropTableQueries = require('./drop-table-queries');

var _dropTableQueries2 = _interopRequireDefault(_dropTableQueries);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { Pool } from 'pg';
_dotenv2.default.config(); /* eslint-disable operator-linebreak */

var pool = (0, _dbConnection2.default)();
exports.default = {
  dropTables: function dropTables() {
    pool.query(_dropTableQueries2.default).then(function (res) {
      console.log(res);
      pool.end();
    }).catch(function (err) {
      console.log(err);
    });
  }
};