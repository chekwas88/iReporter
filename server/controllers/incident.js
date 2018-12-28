import { Pool } from 'pg';
import dotenv from 'dotenv';
import queryUtils from '../queryutils';

dotenv.config();

const pool = new Pool({
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: 5432,
});

export default {


  /**
   * @function getUserIncidents - returns all user specific created incidents
   * @param {object} req - request object
   * @param {object} res - response object
   * @returns {object} json data
  */

  getUserIncidents: (req, res) => {
    const { id } = req.user;
    pool.query(queryUtils.getUserSpecificIncidentsQuery, [id], (err, response) => {
      if (err) {
        console.log(err);
        return res.status(404).json({
          status: 404,
          message: 'An error occured, no incident was found',
        });
      }
      return res.status(200).json({
        status: res.statusCode,
        message: 'All incidents returned successfully',
        data: response.rows,
      });
    });
  },


  /**
  *  @function createIncident - creates an incident
  * @param {object} req - request object
  * @param {object} res - response object
  * @returns {object} json data
 */

  createIncident: (req, res) => {
    const { location, title, comment } = req.body;
    console.log(req);
    const { id } = req.user;

    pool.query(queryUtils.createIncidentQuery,
      [id, location, title, comment],
      (err, response) => {
        if (err) {
          console.log(err);
          return res.status(400).json({
            status: res.statusCode,
            message: 'An Error occured, record cannot be created',
          });
        }
        return res.status(200).json({
          id: response.rows[0].id,
          message: 'Record created successfully',
          record: response.rows[0],
        });
      });
  },

  /**
   * @function getIncident - returns an incident
  * @param {object} req - request object
  * @param {object} res - response object
  * @returns {object} json data
 */

  getIncident: (req, res) => {
    const incidentId = parseInt(req.params.id, 10);
    const { id } = req.user;
    pool.query(
      queryUtils.getUserSpecificIncidentQuery,
      [incidentId, id],
      (err, response) => {
        if (err) {
          console.log(err);
          return res.status(404).json({
            status: res.statusCode,
            message: 'An error occured could not return incident',
          });
        }
        if (id !== response.rows[0].createdby) {
          return res.status(401).json({
            status: res.statusCode,
            message: 'You are not authorized to view this report',
          });
        }

        return res.status(200).json({
          status: res.statusCode,
          message: 'incident retrieved successfully',
          incident: response.rows[0],
        });
      },
    );
  },

  /**
   * @function updateLocation - updates an incident's  location
  * @param {object} req - request object
  * @param {object} res - response object
  * @returns {object} json data
 */

  updateLocation: (req, res) => {
    const { location } = req.body;
    const incidentId = parseInt(req.params.id, 10);
    const { id } = req.user;
    pool.query(
      queryUtils.getOneIncidentQuery,
      [incidentId],
      (err, response) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            status: res.statusCode,
            message: 'Internal server error',
          });
        }
        const { createdby } = response.rows[0];
        if (response.rows[0].status === 'draft') {
          return pool.query(
            queryUtils.updateLocationQuery,
            [location, incidentId, id],
            (error, result) => {
              if (error) {
                console.log(error);
                return res.status(500).json({
                  status: res.statusCode,
                  message: 'Internal server error',
                });
              }
              if (id !== createdby) {
                return res.status(403).json({
                  status: res.statusCode,
                  message: 'You are not authorized to make any change',
                });
              }
              console.log(result.rows[0]);

              return res.status(200).json({
                status: res.statusCode,
                message: 'Location has been updated successfully',
              });
            },
          );
        }
        return res.status(403).json({
          status: res.statusCode,
          message: 'You can\'t update this report, Decision has been made',
        });
      },
    );
  },

  /**
   * @function updateComment - updates an incident's comment
  * @param {object} req - request object
  * @param {object} res - response object
  * @returns {object} json data
 */

  updateComment: (req, res) => {
    const { comment } = req.body;
    const incidentId = parseInt(req.params.id, 10);
    const { id } = req.user;
    pool.query(
      queryUtils.getOneIncidentQuery,
      [incidentId],
      (err, response) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            status: res.statusCode,
            message: 'Internal server error',
          });
        }
        const { createdby } = response.rows[0];
        if (response.rows[0].status === 'draft') {
          return pool.query(
            queryUtils.updateCommentQuery,
            [comment, incidentId, id],
            (error, result) => {
              if (error) {
                console.log(error);
                return res.status(500).json({
                  status: res.statusCode,
                  message: 'Internal server error',
                });
              }
              if (id !== createdby) {
                return res.status(403).json({
                  status: res.statusCode,
                  message: 'You are not authorized to make any change',
                });
              }
              return res.status(200).json({
                status: res.statusCode,
                message: 'Comment has been updated successfully',
                data: [result.rows[0]],
              });
            },
          );
        }
        return res.status(403).json({
          status: res.statusCode,
          message: 'You can\'t update this report, Decision has been made',
        });
      },
    );
  },


  /**
   * @function deleteIncident - deletes an incident
  * @param {object} req - request object
  * @param {object} res - response object
  * @returns {object} json data
 */

  deleteIncident: (req, res) => {
    const incidentId = parseInt(req.params.id, 10);
    const { id } = req.user;
    pool.query(
      queryUtils.getOneIncidentQuery,
      [incidentId],
      (err, response) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            status: res.statusCode,
            message: 'Internal server error',
          });
        }
        const { createdby } = response.rows[0];
        if (response.rows[0].status === 'draft') {
          return pool.query(
            queryUtils.deleteQuery,
            [incidentId, id],
            (error, result) => {
              if (error) {
                console.log(error);
                return res.status(500).json({
                  status: res.statusCode,
                  message: 'Internal server error',
                });
              }
              if (id !== createdby) {
                return res.status(403).json({
                  status: res.statusCode,
                  message: 'You are not authorized to make any change',
                });
              }
              console.log(result.rows[0]);

              return res.status(200).json({
                status: res.statusCode,
                message: 'Report has been deleted successfully',
              });
            },
          );
        }
        return res.status(403).json({
          status: res.statusCode,
          message: 'You are not authorized to delete',
        });
      },
    );
  },

  /**
   * @function updateAll - update an incident
  * @param {object} req - request object
  * @param {object} res - response object
  * @returns {object} json data
 */

  updateAll: (req, res) => {
    const { comment, location, title } = req.body;
    const incidentId = parseInt(req.params.id, 10);
    const { id } = req.user;
    pool.query(
      queryUtils.getOneIncidentQuery,
      [incidentId],
      (err, response) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            status: res.statusCode,
            message: 'Internal server error',
          });
        }
        const { createdby } = response.rows[0];
        if (response.rows[0].status === 'draft') {
          return pool.query(
            queryUtils.updateAllQuery,
            [comment, location, title, incidentId, id],
            (error, result) => {
              if (error) {
                console.log(error);
                return res.status(500).json({
                  status: res.statusCode,
                  message: 'Internal server error',
                });
              }
              if (id !== createdby) {
                return res.status(403).json({
                  status: res.statusCode,
                  message: 'You are not authorized to make any change',
                });
              }
              return res.status(200).json({
                status: res.statusCode,
                message: 'Report has been updated successfully',
                data: [result.rows[0]],
              });
            },
          );
        }
        return res.status(403).json({
          status: res.statusCode,
          message: 'You can\'t update this report, Decision has been made',
        });
      },
    );
  },
};
