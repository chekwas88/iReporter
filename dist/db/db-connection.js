'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _pg = require('pg');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Db = function () {
  function Db() {
    _classCallCheck(this, Db);
  }

  _createClass(Db, null, [{
    key: 'dbConnect',
    value: function dbConnect() {
      var pool = void 0;
      if (process.env.NODE_ENV === 'development') {
        pool = new _pg.Pool({
          connectionString: process.env.DEVDB
        });
        // check for test env
      } else if (process.env.NODE_ENV === 'test') {
        pool = new _pg.Pool({
          connectionString: process.env.TESTDB
        });
      } else {
        pool = new _pg.Pool({
          connectionString: process.env.PRODUCTIONDB
        });
      }
      return pool;
    }
  }]);

  return Db;
}();

exports.default = Db.dbConnect;