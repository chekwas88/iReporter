'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var validateSchema = function validateSchema(request, bodySchema, response, nextAction) {
  var schemaReturn = _joi2.default.validate(request.body, bodySchema);
  if (schemaReturn.error) {
    return response.status(400).send({
      status: 400,
      message: schemaReturn.error.details[0].message
    });
  }
  return nextAction();
};

exports.default = {
  /**
   * @function  validatePost - check for input validation before creating an incident
   * @param {object} req - request object
   * @param {object} res - response object
   * @returns {object} json data
   *
   * */
  validatePost: function validatePost(req, res, next) {
    var schema = {
      type: _joi2.default.string(),
      title: _joi2.default.string(),
      comment: _joi2.default.string().required(),
      location: _joi2.default.string().required()
    };
    validateSchema(req, schema, res, next);
  },

  /**
  * @function  validatePatchComment - validate comment before patching
  * @param {object} req - request object
  * @param {object} res - response object
  * @returns {object} json data
  *
  * */
  validatePatchComment: function validatePatchComment(req, res, next) {
    var schema = {
      comment: _joi2.default.string().required()
    };
    validateSchema(req, schema, res, next);
  },

  /**
  * @function  validatePatchLocation - validate location before patching
  * @param {object} req - request object
  * @param {object} res - response object
  * @returns {object} json data
  *
  * */
  validatePatchLocation: function validatePatchLocation(req, res, next) {
    var schema = {
      location: _joi2.default.string().required()
    };
    validateSchema(req, schema, res, next);
  },

  /**
  * @function  validatePatchEdit - validate incident's inputs before patching
  * @param {object} req - request object
  * @param {object} res - response object
  * @returns {object} json data
  *
  * */
  validatePatchEdit: function validatePatchEdit(req, res, next) {
    var schema = {
      type: _joi2.default.string(),
      title: _joi2.default.string(),
      comment: _joi2.default.string().required(),
      location: _joi2.default.string().required()
    };
    validateSchema(req, schema, res, next);
  },

  /**
   * @function   validateUser - check for input validation before registering a user
   * @param {object} req - request object
   * @param {object} res - response object
   * @returns {object} json data
   *
   * */
  validateUser: function validateUser(req, res, next) {
    var schema = {
      firstname: _joi2.default.string().required(),
      lastname: _joi2.default.string().required(),
      othername: _joi2.default.string(),
      email: _joi2.default.string().required(),
      username: _joi2.default.string().required(),
      password: _joi2.default.string().min(6).required(),
      phoneNumber: _joi2.default.string().required(),
      registered: _joi2.default.string()
    };
    validateSchema(req, schema, res, next);
  },
  /**
  * @function   validateUserLogin - check for input validation before user login
  * @param {object} req - request object
  * @param {object} res - response object
  * @returns {object} json data
  *
  * */

  validateUserLogin: function validateUserLogin(req, res, next) {
    var schema = {
      email: _joi2.default.string().required(),
      password: _joi2.default.string().min(6).required()
    };

    validateSchema(req, schema, res, next);
  },

  /**
  * @function   validateIncidentId - checks for id validation
  * @param {object} req - request object
  * @param {object} res - response object
  * @returns {object} json data
  *
  * */
  validateIncidentId: function validateIncidentId(req, res, next) {
    if (Number.isNaN(Number(req.params.id))) {
      return res.status(404).send({
        status: res.statusCode,
        message: 'invalid incident id'
      });
    }
    return next();
  }

};