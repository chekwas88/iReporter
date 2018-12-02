const express = require('express');
const Joi = require('joi');
const User = require('../model/user');

const router = express.Router();


// user api

router.post('/api/v1/users', (req, res, next) => {
  const id = User.users.length;

  const schema = {
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    othername: Joi.string(),
    title: Joi.string(),
    email: Joi.string().required(),
    username: Joi.string().required(),
    phoneNumber: Joi.string().required(),
    registered: Joi.string(),
  };
  // validate entry
  const user = {
    id,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    othername: req.body.othername,
    phoneNumber: req.body.phonenumber,
    registered: req.body.date,
    username: req.body.username,
    email: req.body.email,
  };
  const schemaReturn = Joi.validate(req.body, schema);
  if (schemaReturn.error) {
    next();
    return;
  }
  User.users.push(user);
  res.json({
    status: res.statusCode,
    users: [
      {
        id,
        message: 'user has been registered successfully',
      },
    ],
  });
});

module.exports = router;
