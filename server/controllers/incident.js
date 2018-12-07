import Incident from '../model/incident';

export default {
  /**
   * @function getIncidents - returns all created incidents
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


  /**
  *  @function createIncident - creates an incident
  * @param {object} req - request object
  * @param {object} res - response object
  * @returns {object} json data
 */

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

  /**
   * @function getIncident - returns an incident
  * @param {object} req - request object
  * @param {object} res - response object
  * @returns {object} json data
 */

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

  /**
   * @function updateLocation - updates an incident's  location
  * @param {object} req - request object
  * @param {object} res - response object
  * @returns {object} json data
 */

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

  /**
   * @function updateComment - updates an incident's comment
  * @param {object} req - request object
  * @param {object} res - response object
  * @returns {object} json data
 */

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

  /**
   * @function deleteIncident - deletes an incident
  * @param {object} req - request object
  * @param {object} res - response object
  * @returns {object} json data
 */

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

  /**
   * @function updateAll - update an incident
  * @param {object} req - request object
  * @param {object} res - response object
  * @returns {object} json data
 */

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
