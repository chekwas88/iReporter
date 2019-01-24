'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _dbConnection = require('../db/db-connection');

var _dbConnection2 = _interopRequireDefault(_dbConnection);

var _queryutils = require('../queryutils');

var _queryutils2 = _interopRequireDefault(_queryutils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pool = (0, _dbConnection2.default)();
_dotenv2.default.config();

exports.default = {
  /**
    * @function getIncidents - returns all created incidents
    * @param {object} req - request object
    * @param {object} res - response object
    * @returns {object} json data
   */

  getIncidents: function getIncidents(req, res) {
    var isadmin = req.user.isadmin;

    pool.query(_queryutils2.default.getIncidentsQuery, function (err, response) {
      if (err) {
        console.log(err);
        return res.status(500).json({
          status: res.statusCode,
          message: 'Internal server error'
        });
      }
      if (isadmin) {
        return res.status(200).json({
          status: res.statusCode,
          message: 'All incidents returned successfully',
          data: response.rows
        });
      }
      return res.status(401).json({
        status: res.statusCode,
        message: 'Acess denied, Not Authorized'
      });
    });
  },

  updateStatus: function updateStatus(req, res) {
    var isadmin = req.user.isadmin;
    var status = req.body.status;

    var incidentId = parseInt(req.params.id, 10);
    if (isadmin === false || isadmin === undefined) {
      return res.status(403).json({
        status: res.statusCode,
        message: 'You are not Authorized to make this change'
      });
    }

    return pool.query(_queryutils2.default.updateStatusQuery, [status, incidentId], function (err, response) {
      if (err) {
        console.log(err);
        return res.status(500).json({
          status: res.statusCode,
          message: 'Internal server error'
        });
      }
      return res.status(200).json({
        status: res.statusCode,
        message: 'Status changed successfully',
        data: [response.rows[0]]
      });
    });
  }
};