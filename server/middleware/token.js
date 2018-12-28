import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const secret = process.env.SECRET_KEY;

export default {
  /**
   * @description Verify token from the req provided by the user
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {object}
   */
  verifyToken: (req, res, next) => {
    // check if the header is present
    if (!req.headers.authorization) {
      return res.status(401).json({
        status: res.statusCode,
        message: 'no authorization provided',
      });
    }
    // get token from the header
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(403).json({
        status: res.statusCode,
        message: 'Please provide a valid token',
      });
    }
    jwt.verify(token, secret, (err, decoded) => {
      console.log(decoded);
      console.log(decoded);
      if (err) {
        return res.status(401).json({
          message: 'Error, token not verified',
        });
      }
      req.user = decoded;
      return req.user;
    });
    return next();
  },

  generateToken: (payload) => {
    const token = jwt.sign(payload, secret, { expiresIn: '1 day' });
    return token;
  },
};
