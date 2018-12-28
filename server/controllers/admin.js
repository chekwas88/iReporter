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
    * @function getIncidents - returns all created incidents
    * @param {object} req - request object
    * @param {object} res - response object
    * @returns {object} json data
   */

  getIncidents: (req, res) => {
    const { isadmin } = req.user;
    pool.query(queryUtils.getIncidentsQuery, (err, response) => {
      if (err) {
        console.log(err);
        return res.status(404).json({
          status: 404,
          message: 'An error occured, no incident was found',
        });
      }
      if (isadmin) {
        return res.status(200).json({
          status: res.statusCode,
          message: 'All incidents returned successfully',
          data: response.rows,
        });
      }
      return res.status(404).json({
        status: res.statusCode,
        message: 'Acess denied, Not Authorized',
      });
    });
  },

  updateStatus: (req, res) => {
    const { isadmin } = req.user;
    console.log(isadmin);
    const { status } = req.body;
    const incidentId = parseInt(req.params.id, 10);
    if (isadmin === false || isadmin === undefined) {
      return res.status(403).json({
        status: res.statusCode,
        message: 'You are not Authorized to make this change',
      });
    }

    return pool.query(queryUtils.updateToInvQuery, [status, incidentId], (err, response) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          status: res.statusCode,
          message: 'Internal server error',
        });
      }
      return res.status(200).json({
        status: res.statusCode,
        message: 'Status changed successfully',
        data: [response.rows[0]],
      });
    });
  },
};
