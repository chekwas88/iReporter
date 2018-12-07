import User from '../model/user';

export default {
  /**
  * @function registerUser -registers a user
  * @param {object} req - request object
  * @param {object} res - a response object
  * @returns {object} json data
  */

  registerUser: (req, res) => {
    const id = User.users.length;
    const admin = false;

    const user = {
      id,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      othername: req.body.othername,
      phoneNumber: req.body.phonenumber,
      registered: req.body.date,
      username: req.body.username,
      email: req.body.email,
      admin,
    };

    User.users.push(user);
    return res.json({
      status: res.statusCode,
      users: [
        {
          id,
          message: 'user has been registered successfully',
        },
      ],
    });
  },


  /**
  * @function getUser - gets a registered user
  * @param {object} req - request object
  * @param {object} res - a response object
  * @returns {object} json data
  */
  getUser: (req, res) => {
    const user = User.users.find(u => u.id === parseInt(req.params.id, 10));
    if (!user) {
      return res.status(404).json({
        status: res.statusCode,
        message: 'An error occured, user not found',
      });
    }
    return res.json({
      status: res.statusCode,
      users: [
        user,
      ],
    });
  },
};
