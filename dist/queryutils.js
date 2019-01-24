'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  createUserQuery: 'INSERT INTO \n    users(firstname, lastname, email, othername, password, phoneNumber, username) \n    VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',

  loginQuery: 'SELECT * FROM users WHERE email=$1',

  getIncidentsQuery: 'SELECT * FROM incidents',
  getUserSpecificIncidentsQuery: 'SELECT * FROM incidents WHERE createdBy=$1',
  createIncidentQuery: 'INSERT INTO incidents(createdBy, location, comment, title) \n  VALUES ($1, $2, $3, $4) RETURNING *',

  getOneIncidentQuery: 'SELECT * FROM incidents WHERE incident_Id=$1',

  getUserSpecificIncidentQuery: 'SELECT * FROM incidents WHERE incident_Id=$1 AND createdBy=$2',
  updateLocationQuery: 'UPDATE incidents SET location=$1 WHERE incident_Id=$2 AND createdBy=$3 RETURNING location, incident_Id',
  updateCommentQuery: 'UPDATE incidents SET comment=$1 WHERE incident_Id=$2 AND createdBy=$3 RETURNING comment, incident_Id',
  updateStatusQuery: 'UPDATE incidents SET status=$1 WHERE incident_Id=$2 RETURNING status, incident_Id',
  updateAllQuery: 'UPDATE incidents SET comment=$1, location=$2, title=$3 WHERE incident_Id=$4 AND createdBy=$5 RETURNING *',
  deleteQuery: 'DELETE from incidents WHERE incident_Id=$1 AND createdBy=$2 RETURNING incident_Id'

};