/* eslint-disable operator-linebreak */
const dotenv = require('dotenv');
const { Pool } = require('pg');

dotenv.config();

const pool = new Pool({
  // connectionString: process.env.DB_URL,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: 5432,
});
const createUsersTable = () => {
  const queryText =
    `CREATE TABLE IF NOT EXISTS
      users(
        id SERIAL PRIMARY KEY NOT NULL,
        firstname VARCHAR(128) NOT NULL,
        lastname VARCHAR(128) NOT NULL,
        othername VARCHAR(128),
        username VARCHAR(128) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR NOT NULL,
        phoneNumber VARCHAR NOT NULL,
        isAdmin BOOLEAN DEFAULT false,
        registered TIMESTAMP
      )`;

  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};


const createIncidentsTable = () => {
  const queryText =
    `
  DROP TYPE IF EXISTS record_type;
  CREATE TYPE record_type AS ENUM ('red-flag', 'intervention');
  DROP TYPE IF EXISTS record_status;
  CREATE TYPE record_status AS ENUM (
    'draft', 'under-investigation', 'resolved', 'rejected');
  CREATE TABLE IF NOT EXISTS incidents(
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    type record_type,
    location VARCHAR(100) NOT NULL,
    images text[],
    videos text[],
    comment TEXT NOT NULL,
    status record_status DEFAULT 'draft',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`;

  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

const dropUsersTable = () => {
  const queryText = 'DROP TABLE IF EXISTS users';
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

const dropIncidentsTable = () => {
  const queryText = 'DROP TABLE IF EXISTS incidents';
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});


module.exports = {
  createUsersTable,
  dropUsersTable,
  createIncidentsTable,
  dropIncidentsTable,
};
require('make-runnable');
