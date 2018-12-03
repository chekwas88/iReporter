const express = require('express');
const Joi = require('joi');
const Incident = require('../model/incident');

const router = express.Router();
router.get('/api/v1/red-flags', (req, res, next) => {
  if (!Incident) {
    next();
  }
  const status = res.statusCode;
  Incident.status = status;
  res.send(Incident);
});

router.post('/api/v1/red-flags', (req, res, next) => {
  const schema = {
    createdBy: Joi.number(),
    type: Joi.string(),
    createdOn: Joi.string().required(),
    title: Joi.string(),
    comment: Joi.string().required(),
    location: Joi.string().required(),
  };

  const schemaReturn = Joi.validate(req.body, schema);
  if (schemaReturn.error) {
    next();
    return;
  }

  const id = Incident.incidents.length;
  const redFlag = {
    id,
    createdBy: req.body.createdBy,
    createdOn: req.body.createdOn,
    type: req.body.type,
    title: req.body.title,
    comment: req.body.comment,
    location: req.body.location,
  };
  Incident.incidents.push(redFlag);
  res.json({
    status: res.statusCode,
    incidents: [
      {
        id,
        message: 'red-flag incident was created successfully',
      },
    ],
  });
});

router.get('/api/v1/red-flags/:id', (req, res, next) => {
  const incident = Incident.incidents.find(i => i.id === parseInt(req.params.id, 10));
  if (!incident) {
    next();
  }
  res.json({
    status: res.statusCode,
    incidents: [
      incident,
    ],
  });
});

router.patch('/api/v1/red-flags/:id/location', (req, res, next) => {
  const incident = Incident.incidents.find(i => i.id === parseInt(req.params.id, 10));
  if (!incident) {
    next();
  }
  incident.location = req.body.location;
  res.json({
    status: res.statusCode,
    incidents: [
      {
        id: incident.id,
        message: 'location has been successfully updated',
      },
    ],
  });
});

router.patch('/api/v1/red-flags/:id/comment', (req, res, next) => {
  const incident = Incident.incidents.find(i => i.id === parseInt(req.params.id, 10));
  if (!incident) {
    next();
  }
  incident.comment = req.body.comment;
  res.json({
    status: res.statusCode,
    incidents: [
      {
        id: incident.id,
        message: 'comment has been successfully updated',
      },
    ],
  });
});

router.delete('/api/v1/red-flags/:id', (req, res, next) => {
  const incident = Incident.incidents.find(i => i.id === parseInt(req.params.id, 10));
  if (!incident) {
    next();
  }
  const incidentIndex = Incident.incidents.indexOf(incident);
  Incident.incidents.splice(incidentIndex, 1);

  res.json({
    status: res.statusCode,
    incidents: [
      {
        id: incident.id,
        message: 'record deleted successfully',
      },
    ],
  });
});

router.patch('/api/v1/red-flags/:id', (req, res, next) => {
  const incident = Incident.incidents.find(i => i.id === parseInt(req.params.id, 10));
  if (!incident) {
    next();
  }
  incident.location = req.body.location;
  incident.comment = req.body.comment;
  incident.title = req.body.title;
  incident.type = req.body.type;

  res.json({
    status: res.statusCode,
    incidents: [
      {
        id: incident.id,
        message: 'redcord has been successfully updated',
      },
    ],
  });
});

module.exports = router;
