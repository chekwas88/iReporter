import { Pool } from 'pg';
import dotenv from 'dotenv';
import createToken from '../middleware/token';
import bcrypt from '../middleware/verifyPassword';
import queryUtils from '../queryutils';


dotenv.config();

const pool = new Pool({
  // connectionString: process.env.DB_URL,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: 5432,
});


export default {
  /**
 * @function registerUser -registers a user
 * @param {object} req - request object
 * @param {object} res - a response object
 * @returns {object} json data
 */

  registerUser: (req, res) => {
    const {
      firstname, lastname, email, othername, password, phoneNumber, username,
    } = req.body;

    const encrypt = bcrypt.hidePassword(password);

    pool.query(queryUtils.createUserQuery,
      [firstname, lastname, email, othername, encrypt, phoneNumber, username],
      (err, response) => {
        if (err) {
          console.log(err);
          return res.status(500).send({
            message: 'An error occured, registration failed',
          });
        }

        // check if email is i database
        if (response.rows[0].email > 1) {
          return res.status(403).send({
            message: 'This email has been registered before',
          });
        }

        const token = createToken.generateToken({ id: response.rows[0].id });

        return res.status(201).json({
          status: res.statusCode,
          id: response.rows[0].id,
          message: 'registered sucessfully',
          token,
          user: {
            password: response.rows[0].password,
            firstname: response.rows[0].firstname,
            lastname: response.rows[0].lastname,
            othername: response.rows[0].othername,
            phoneNumber: response.rows[0].phoneNumber,
            username: response.rows[0].username,
          },
        });
      });
  },


  /**
  * @function login - log's in a registered user
  * @param {object} req - request object
  * @param {object} res - a response object
  * @returns {object} json data
  */
  login: (req, res) => {
    const { email, password } = req.body;
    pool.query(queryUtils.loginQuery, [email], (err, response) => {
      if (err) {
        console.log(err);
        return res.status(404).send({
          message: 'unable to login',
        });
      }

      const user = response.rows[0];
      if (!user) {
        return res.status(404).send({
          message: 'User not found',
        });
      }

      const encryptedPassword = response.rows[0].password;
      const decodedPassword = bcrypt.checkPassword(password, encryptedPassword);
      if (!decodedPassword) {
        return res.status(401).json({
          message: 'Email or password is incorrect',
        });
      }

      console.log(response.rows[0]);
      const { id, username, isadmin } = response.rows[0];
      const payload = {
        id,
        username,
        isadmin,
      };

      const token = createToken.generateToken(payload);

      return res.status(200).json({
        status: res.statusCode,
        id: response.rows[0].id,
        message: 'login was successful',
        token,
        user: {
          firstname: response.rows[0].firstname,
          lastname: response.rows[0].lastname,
          othername: response.rows[0].othername,
          phoneNumber: response.rows[0].phoneNumber,
          username: response.rows[0].username,
        },
      });
    });
  },
};
