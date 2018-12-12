import Joi from 'joi';

export default {
  /**
   * @function  validatePost - check for input validation before creating an incident
   * @param {object} req - request object
   * @param {object} res - response object
   * @returns {object} json data
   *
   * */


  validatePost: (req, res, next) => {
    const schema = {
      createdBy: Joi.number().required(),
      type: Joi.string(),
      createdOn: Joi.string().required(),
      title: Joi.string(),
      comment: Joi.string().required(),
      location: Joi.string().required(),
    };

    const schemaReturn = Joi.validate(req.body, schema);
    if (schemaReturn.error) {
      return res.status(400).send({
        status: 400,
        message: schemaReturn.error.details[0].message,
      });
    }
    return next();
  },


  /**
  * @function  validatePatchComment - validate comment before patching
  * @param {object} req - request object
  * @param {object} res - response object
  * @returns {object} json data
  *
  * */
  validatePatchComment: (req, res, next) => {
    const schema = {
      comment: Joi.string().required(),
    };
    const schemaReturn = Joi.validate(req.body, schema);
    if (schemaReturn.error) {
      return res.status(400).send({
        message: schemaReturn.error.details[0].message,
      });
    }
    return next();
  },


  /**
 * @function  validatePatchLocation - validate location before patching
 * @param {object} req - request object
 * @param {object} res - response object
 * @returns {object} json data
 *
 * */

  validatePatchLocation: (req, res, next) => {
    const schema = {
      location: Joi.string().required(),
    };
    const schemaReturn = Joi.validate(req.body, schema);
    if (schemaReturn.error) {
      return res.status(400).send({
        message: schemaReturn.error.details[0].message,
      });
    }
    return next();
  },


  /**
 * @function  validatePatchEdit - validate incident's inputs before patching
 * @param {object} req - request object
 * @param {object} res - response object
 * @returns {object} json data
 *
 * */
  validatePatchEdit: (req, res, next) => {
    const schema = {
      type: Joi.string(),
      title: Joi.string(),
      comment: Joi.string().required(),
      location: Joi.string().required(),
    };

    const schemaReturn = Joi.validate(req.body, schema);
    if (schemaReturn.error) {
      return res.status(400).send({
        message: schemaReturn.error.details[0].message,
      });
    }
    return next();
  },

  /**
   * @function   validateUser - check for input validation before registering a user
   * @param {object} req - request object
   * @param {object} res - response object
   * @returns {object} json data
   *
   * */

  validateUser: (req, res, next) => {
    const schema = {
      firstname: Joi.string().required(),
      lastname: Joi.string().required(),
      othername: Joi.string(),
      email: Joi.string().required(),
      username: Joi.string().required(),
      password: Joi.string().min(6).required(),
      phoneNumber: Joi.string().required(),
      registered: Joi.string(),
    };

    const schemaReturn = Joi.validate(req.body, schema);
    if (schemaReturn.error) {
      return res.status(400).send({
        status: 400,
        message: schemaReturn.error.details[0].message,
      });
    }
    return next();
  },

};
