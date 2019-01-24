import dotenv from 'dotenv';
import con from '../db/db-connection';
import queryUtils from '../queryutils';

const pool = con();
dotenv.config();

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
        return res.status(500).json({
          status: res.statusCode,
          message: 'Internal server error',
        });
      }
      if (isadmin) {
        return res.status(200).json({
          status: res.statusCode,
          message: 'All incidents returned successfully',
          data: response.rows,
        });
      }
      return res.status(401).json({
        status: res.statusCode,
        message: 'Acess denied, Not Authorized',
      });
    });
  },

  updateStatus: (req, res) => {
    const { isadmin } = req.user;
    const { status } = req.body;
    const incidentId = parseInt(req.params.id, 10);
    if (isadmin === false || isadmin === undefined) {
      return res.status(403).json({
        status: res.statusCode,
        message: 'You are not Authorized to make this change',
      });
    }

    return pool.query(queryUtils.updateStatusQuery, [status, incidentId], (err, response) => {
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
