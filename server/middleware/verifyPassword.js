import bcrypt from 'bcrypt';

export default {
  /**
   *
   * @function hashPassword
   * @param {string} password
   * @returns {object} hashed
   */
  hidePassword: password => bcrypt.hashSync(password, bcrypt.genSaltSync(6)),

  /**
   * @function checkPassword
   * @param {string} password
   * @param {string} hiddenPassword
   * @returns {object} hashed
   */
  checkPassword: (password, hiddenPassword) => bcrypt.compareSync(password, hiddenPassword),
};
