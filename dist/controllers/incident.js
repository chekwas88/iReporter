'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _incident = require('../model/incident');

var _incident2 = _interopRequireDefault(_incident);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  /**
   * @function getIncidents - returns all created incidents
   * @function getIncident - returns an incident
   * @function createIncident - creates an incident
   * @function updateLocation - updates an incident's  location
   * @function updateComment - updates an incident's comment
   * @function deleteIncident - deletes an incident
   * @function updateAll - update an incident
   * @param {object} req - request object
   * @param {object} res - response object
   * @returns {object} json data
   */

  getIncidents: function getIncidents(req, res) {
    if (!_incident2.default.incidents) {
      return res.status(404).json({
        status: 404,
        message: 'An error occured, no incident was found'
      });
    }
    var status = res.statusCode;
    _incident2.default.status = status;
    return res.send(_incident2.default);
  },

  createIncident: function createIncident(req, res) {
    var id = _incident2.default.incidents.length;
    var status = 'draft';
    var redFlag = {
      id: id,
      status: status,
      createdBy: req.body.createdBy,
      createdOn: req.body.createdOn,
      type: req.body.type,
      title: req.body.title,
      comment: req.body.comment,
      location: req.body.location
    };

    _incident2.default.incidents.push(redFlag);
    return res.json({
      status: res.statusCode,
      incidents: [{
        id: id,
        message: 'red-flag incident was created successfully'
      }]
    });
  },

  getIncident: function getIncident(req, res) {
    var incident = _incident2.default.incidents.find(function (i) {
      return i.id === parseInt(req.params.id, 10);
    });
    if (!incident) {
      return res.status(404).json({
        status: res.statusCode,
        message: 'An error occured, could not return incident'
      });
    }
    return res.json({
      status: res.statusCode,
      incidents: [incident]
    });
  },

  updateLocation: function updateLocation(req, res) {
    var incident = _incident2.default.incidents.find(function (i) {
      return i.id === parseInt(req.params.id, 10);
    });
    if (!incident) {
      return res.status(404).json({
        status: res.statusCode,
        message: 'Location failed to update'
      });
    }
    incident.location = req.body.location;
    return res.json({
      status: res.statusCode,
      incidents: [{
        id: incident.id,
        message: 'location has been successfully updated'
      }]
    });
  },

  updateComment: function updateComment(req, res) {
    var incident = _incident2.default.incidents.find(function (i) {
      return i.id === parseInt(req.params.id, 10);
    });
    if (!incident) {
      return res.status(404).json({
        status: res.statusCode,
        message: 'Comment failed to update'
      });
    }
    incident.comment = req.body.comment;
    return res.json({
      status: res.statusCode,
      incidents: [{
        id: incident.id,
        message: 'comment has been successfully updated'
      }]
    });
  },

  deleteIncident: function deleteIncident(req, res) {
    var incident = _incident2.default.incidents.find(function (i) {
      return i.id === parseInt(req.params.id, 10);
    });
    if (!incident) {
      return res.status(404).json({
        status: res.statusCode,
        message: 'incident failed to delete'
      });
    }
    var incidentIndex = _incident2.default.incidents.indexOf(incident);
    _incident2.default.incidents.splice(incidentIndex, 1);

    return res.json({
      status: res.statusCode,
      incidents: [{
        id: incident.id,
        message: 'record deleted successfully'
      }]
    });
  },

  updateAll: function updateAll(req, res) {
    var incident = _incident2.default.incidents.find(function (i) {
      return i.id === parseInt(req.params.id, 10);
    });
    if (!incident) {
      return res.status(404).json({
        status: res.statusCode,
        message: 'An error ocurred, incident failed to update'
      });
    }
    incident.location = req.body.location;
    incident.comment = req.body.comment;
    incident.title = req.body.title;
    incident.type = req.body.type;
    return res.json({
      status: res.statusCode,
      incidents: [{
        id: incident.id,
        message: 'redcord has been successfully updated'
      }]
    });
  }
};