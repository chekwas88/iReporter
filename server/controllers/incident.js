import Incident from '../model/incident';

export default {
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

  getIncidents: (req, res) => {
    if (!Incident.incidents) {
      return res.status(404).json({
        status: 404,
        message: 'An error occured, no incident was found',
      });
    }
    const status = res.statusCode;
    Incident.status = status;
    return res.send(Incident);
  },

  createIncident: (req, res) => {
    const id = Incident.incidents.length;
    const status = 'draft';
    const redFlag = {
      id,
      status,
      createdBy: req.body.createdBy,
      createdOn: req.body.createdOn,
      type: req.body.type,
      title: req.body.title,
      comment: req.body.comment,
      location: req.body.location,
    };

    Incident.incidents.push(redFlag);
    return res.json({
      status: res.statusCode,
      incidents: [
        {
          id,
          message: 'red-flag incident was created successfully',
        },
      ],
    });
  },

  getIncident: (req, res) => {
    const incident = Incident.incidents.find(i => i.id === parseInt(req.params.id, 10));
    if (!incident) {
      return res.status(404).json({
        status: res.statusCode,
        message: 'An error occured, could not return incident',
      });
    }
    return res.json({
      status: res.statusCode,
      incidents: [
        incident,
      ],
    });
  },

  updateLocation: (req, res) => {
    const incident = Incident.incidents.find(i => i.id === parseInt(req.params.id, 10));
    if (!incident) {
      return res.status(404).json({
        status: res.statusCode,
        message: 'Location failed to update',
      });
    }
    incident.location = req.body.location;
    return res.json({
      status: res.statusCode,
      incidents: [
        {
          id: incident.id,
          message: 'location has been successfully updated',
        },
      ],
    });
  },

  updateComment: (req, res) => {
    const incident = Incident.incidents.find(i => i.id === parseInt(req.params.id, 10));
    if (!incident) {
      return res.status(404).json({
        status: res.statusCode,
        message: 'Comment failed to update',
      });
    }
    incident.comment = req.body.comment;
    return res.json({
      status: res.statusCode,
      incidents: [
        {
          id: incident.id,
          message: 'comment has been successfully updated',
        },
      ],
    });
  },

  deleteIncident: (req, res) => {
    const incident = Incident.incidents.find(i => i.id === parseInt(req.params.id, 10));
    if (!incident) {
      return res.status(404).json({
        status: res.statusCode,
        message: 'incident failed to delete',
      });
    }
    const incidentIndex = Incident.incidents.indexOf(incident);
    Incident.incidents.splice(incidentIndex, 1);

    return res.json({
      status: res.statusCode,
      incidents: [
        {
          id: incident.id,
          message: 'record deleted successfully',
        },
      ],
    });
  },

  updateAll: (req, res) => {
    const incident = Incident.incidents.find(i => i.id === parseInt(req.params.id, 10));
    if (!incident) {
      return res.status(404).json({
        status: res.statusCode,
        message: 'An error ocurred, incident failed to update',
      });
    }
    incident.location = req.body.location;
    incident.comment = req.body.comment;
    incident.title = req.body.title;
    incident.type = req.body.type;
    return res.json({
      status: res.statusCode,
      incidents: [
        {
          id: incident.id,
          message: 'redcord has been successfully updated',
        },
      ],
    });
  },
};
