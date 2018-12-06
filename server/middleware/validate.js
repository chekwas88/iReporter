import Joi from 'joi';

export default {
  /**
   * @param {object} req - request object
   * @param {object} res - response object
   * @returns {object} json data
   *
   * */

  // validate data for posting incident

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
      console.log(schemaReturn.error);
      return res.status(400).send({
        status: 400,
        message: schemaReturn.error.details[0].message,
      });
    }
    return next();
  },

  // validate data for patching comment

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
  // validate data for patching comment

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

  // validate data for updating  incident
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

  validateUser: (req, res, next) => {
    const schema = {
      firstname: Joi.string().required(),
      lastname: Joi.string().required(),
      othername: Joi.string(),
      email: Joi.string().required(),
      username: Joi.string().required(),
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
