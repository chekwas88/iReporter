'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _queryutils = require('../queryutils');

var _queryutils2 = _interopRequireDefault(_queryutils);

var _dbConnection = require('../db/db-connection');

var _dbConnection2 = _interopRequireDefault(_dbConnection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pool = (0, _dbConnection2.default)();

_dotenv2.default.config();
exports.default = {

  /**
   * @function getUserIncidents - returns all user specific created incidents
   * @param {object} req - request object
   * @param {object} res - response object
   * @returns {object} json data
  */
  getUserIncidents: function getUserIncidents(req, res) {
    var id = req.user.id;

    pool.query(_queryutils2.default.getUserSpecificIncidentsQuery, [id], function (err, response) {
      if (err) {
        console.log(err);
        return res.status(404).json({
          status: 500,
          message: 'Internal server error'
        });
      }
      return res.status(200).json({
        status: res.statusCode,
        message: 'All incidents returned successfully',
        data: response.rows
      });
    });
  },

  /**
  *  @function createIncident - creates an incident
  * @param {object} req - request object
  * @param {object} res - response object
  * @returns {object} json data
  */

  createIncident: function createIncident(req, res) {
    var _req$body = req.body,
        location = _req$body.location,
        title = _req$body.title,
        comment = _req$body.comment;
    var id = req.user.id;

    pool.query(_queryutils2.default.createIncidentQuery, [id, location, title, comment], function (err, response) {
      if (err) {
        console.log(err);
        return res.status(500).json({
          status: res.statusCode,
          message: 'Internal server error'
        });
      }
      return res.status(201).json({
        status: res.statusCode,
        data: [{
          message: 'Record created successfully',
          record: response.rows[0]
        }]
      });
    });
  },

  /**
   * @function getIncident - returns an incident
  * @param {object} req - request object
  * @param {object} res - response object
  * @returns {object} json data
  */

  getIncident: function getIncident(req, res) {
    var incidentId = parseInt(req.params.id, 10);
    var id = req.user.id;

    pool.query(_queryutils2.default.getUserSpecificIncidentQuery, [incidentId, id], function (err, response) {
      if (err) {
        console.log(err);
        return res.status(500).json({
          status: res.statusCode,
          message: 'Internal server error'
        });
      }
      if (id !== response.rows[0].createdby) {
        return res.status(401).json({
          status: res.statusCode,
          message: 'You are not authorized to view this report'
        });
      }

      return res.status(200).json({
        status: res.statusCode,
        data: [{
          message: 'record retrieved successfully',
          record: response.rows[0]
        }]
      });
    });
  },

  /**
   * @function updateLocation - updates an incident's  location
  * @param {object} req - request object
  * @param {object} res - response object
  * @returns {object} json data
  */

  updateLocation: function updateLocation(req, res) {
    var location = req.body.location;

    var incidentId = parseInt(req.params.id, 10);
    var id = req.user.id;

    pool.query(_queryutils2.default.getOneIncidentQuery, [incidentId], function (err, response) {
      if (err) {
        console.log(err);
        return res.status(500).json({
          status: res.statusCode,
          message: 'Internal server error'
        });
      }
      var createdby = response.rows[0].createdby;

      if (response.rows[0].status === 'draft') {
        return pool.query(_queryutils2.default.updateLocationQuery, [location, incidentId, id], function (error, result) {
          if (error) {
            console.log(error);
            return res.status(500).json({
              status: res.statusCode,
              message: 'Internal server error'
            });
          }
          if (id !== createdby) {
            return res.status(401).json({
              status: res.statusCode,
              message: 'You are not authorized to make any change'
            });
          }
          return res.status(200).json({
            status: res.statusCode,
            message: 'Location has been updated successfully',
            data: [result.rows[0]]
          });
        });
      }
      return res.status(403).json({
        status: res.statusCode,
        message: 'You can\'t update this report, Decision has been made'
      });
    });
  },

  /**
   * @function updateComment - updates an incident's comment
  * @param {object} req - request object
  * @param {object} res - response object
  * @returns {object} json data
  */

  updateComment: function updateComment(req, res) {
    var comment = req.body.comment;

    var incidentId = parseInt(req.params.id, 10);
    var id = req.user.id;

    pool.query(_queryutils2.default.getOneIncidentQuery, [incidentId], function (err, response) {
      if (err) {
        console.log(err);
        return res.status(500).json({
          status: res.statusCode,
          message: 'Internal server error'
        });
      }
      var createdby = response.rows[0].createdby;

      if (response.rows[0].status === 'draft') {
        return pool.query(_queryutils2.default.updateCommentQuery, [comment, incidentId, id], function (error, result) {
          if (error) {
            console.log(error);
            return res.status(500).json({
              status: res.statusCode,
              message: 'Internal server error'
            });
          }
          if (id !== createdby) {
            return res.status(403).json({
              status: res.statusCode,
              message: 'You are not authorized to make any change'
            });
          }
          return res.status(200).json({
            status: res.statusCode,
            message: 'Comment has been updated successfully',
            data: [result.rows[0]]
          });
        });
      }
      return res.status(403).json({
        status: res.statusCode,
        message: 'You can\'t update this report, Decision has been made'
      });
    });
  },

  /**
   * @function deleteIncident - deletes an incident
  * @param {object} req - request object
  * @param {object} res - response object
  * @returns {object} json data
  */

  deleteIncident: function deleteIncident(req, res) {
    var incidentId = parseInt(req.params.id, 10);
    var id = req.user.id;

    pool.query(_queryutils2.default.getOneIncidentQuery, [incidentId], function (err, response) {
      if (err) {
        console.log(err);
        return res.status(500).json({
          status: res.statusCode,
          message: 'Internal server error'
        });
      }
      var createdby = response.rows[0].createdby;

      if (response.rows[0].status === 'draft') {
        return pool.query(_queryutils2.default.deleteQuery, [incidentId, id], function (error, result) {
          if (error) {
            console.log(error);
            return res.status(500).json({
              status: res.statusCode,
              message: 'Internal server error'
            });
          }
          if (id !== createdby) {
            return res.status(403).json({
              status: res.statusCode,
              message: 'You are not authorized to make any change'
            });
          }
          return res.status(200).json({
            status: res.statusCode,
            message: 'Report has been deleted successfully',
            deleted: result.rows[0]
          });
        });
      }
      return res.status(403).json({
        status: res.statusCode,
        message: 'You are not authorized to delete'
      });
    });
  },

  /**
   * @function updateAll - update an incident
  * @param {object} req - request object
  * @param {object} res - response object
  * @returns {object} json data
  */

  updateAll: function updateAll(req, res) {
    var _req$body2 = req.body,
        comment = _req$body2.comment,
        location = _req$body2.location,
        title = _req$body2.title;

    var incidentId = parseInt(req.params.id, 10);
    var id = req.user.id;

    pool.query(_queryutils2.default.getOneIncidentQuery, [incidentId], function (err, response) {
      if (err) {
        console.log(err);
        return res.status(500).json({
          status: res.statusCode,
          message: 'Internal server error'
        });
      }
      var createdby = response.rows[0].createdby;

      if (response.rows[0].status === 'draft') {
        return pool.query(_queryutils2.default.updateAllQuery, [comment, location, title, incidentId, id], function (error, result) {
          if (error) {
            console.log(error);
            return res.status(500).json({
              status: res.statusCode,
              message: 'Internal server error'
            });
          }
          if (id !== createdby) {
            return res.status(403).json({
              status: res.statusCode,
              message: 'You are not authorized to make any change'
            });
          }
          return res.status(200).json({
            status: res.statusCode,
            message: 'Record has been updated successfully',
            data: [result.rows[0]]
          });
        });
      }
      return res.status(403).json({
        status: res.statusCode,
        message: 'You can\'t update this report, Decision has been made'
      });
    });
  }
};