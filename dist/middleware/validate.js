'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  /**
   * @param {object} req - request object
   * @param {object} res - response object
   * @returns {object} json data
   *
   * */

  // validate data for posting incident

  validatePost: function validatePost(req, res, next) {
    var schema = {
      createdBy: _joi2.default.number().required(),
      type: _joi2.default.string(),
      createdOn: _joi2.default.string().required(),
      title: _joi2.default.string(),
      comment: _joi2.default.string().required(),
      location: _joi2.default.string().required()
    };

    var schemaReturn = _joi2.default.validate(req.body, schema);
    if (schemaReturn.error) {
      console.log(schemaReturn.error);
      return res.status(400).send({
        status: 400,
        message: schemaReturn.error.details[0].message
      });
    }
    return next();
  },

  // validate data for patching comment

  validatePatchComment: function validatePatchComment(req, res, next) {
    var schema = {
      comment: _joi2.default.string().required()
    };
    var schemaReturn = _joi2.default.validate(req.body, schema);
    if (schemaReturn.error) {
      return res.status(400).send({
        message: schemaReturn.error.details[0].message
      });
    }
    return next();
  },
  // validate data for patching comment

  validatePatchLocation: function validatePatchLocation(req, res, next) {
    var schema = {
      location: _joi2.default.string().required()
    };
    var schemaReturn = _joi2.default.validate(req.body, schema);
    if (schemaReturn.error) {
      return res.status(400).send({
        message: schemaReturn.error.details[0].message
      });
    }
    return next();
  },

  // validate data for updating  incident
  validatePatchEdit: function validatePatchEdit(req, res, next) {
    var schema = {
      type: _joi2.default.string(),
      title: _joi2.default.string(),
      comment: _joi2.default.string().required(),
      location: _joi2.default.string().required()
    };

    var schemaReturn = _joi2.default.validate(req.body, schema);
    if (schemaReturn.error) {
      return res.status(400).send({
        message: schemaReturn.error.details[0].message
      });
    }
    return next();
  },

  validateUser: function validateUser(req, res, next) {
    var schema = {
      firstname: _joi2.default.string().required(),
      lastname: _joi2.default.string().required(),
      othername: _joi2.default.string(),
      email: _joi2.default.string().required(),
      username: _joi2.default.string().required(),
      phoneNumber: _joi2.default.string().required(),
      registered: _joi2.default.string()
    };

    var schemaReturn = _joi2.default.validate(req.body, schema);
    if (schemaReturn.error) {
      return res.status(400).send({
        status: 400,
        message: schemaReturn.error.details[0].message
      });
    }
    return next();
  }

};