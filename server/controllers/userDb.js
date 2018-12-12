import { Pool } from 'pg';
import dotenv from 'dotenv';
import bcrypt from '../middleware/verifyPassword';

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
    const createUserText = `INSERT INTO 
    users(firstname, lastname, email, othername, password, phoneNumber, username) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;

    const {
      firstname, lastname, email, othername, password, phoneNumber, username,
    } = req.body;

    const encrypt = bcrypt.hidePassword(password);

    pool.query(createUserText,
      [firstname, lastname, email, othername, encrypt, phoneNumber, username],
      (err, response) => {
        if (err) {
          console.log(err);
          return res.status(404).send({
            message: 'An error occured, registration failed',
          });
        }

        // check if email is in database
        if (response.rows[0].email > 1) {
          return res.status(403).send({
            message: 'This email has been registered before',
          });
        }
        return res.status(201).json({
          status: res.statusCode,
          id: response.rows[0].id,
          message: 'registered sucessfully',
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
    const loginText = 'SELECT * FROM users WHERE email=$1';
    const { email, password } = req.body;
    pool.query(loginText, [email], (err, response) => {
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
      return res.status(200).json({
        status: res.statusCode,
        id: response.rows[0].id,
        message: 'login was successful',
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
