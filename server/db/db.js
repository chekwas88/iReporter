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
        firstname VARCHAR(40) NOT NULL,
        lastname VARCHAR(40) NOT NULL,
        othername VARCHAR(40),
        username VARCHAR(40) NOT NULL,
        email VARCHAR(128) NOT NULL UNIQUE,
        password VARCHAR(100) NOT NULL,
        phoneNumber VARCHAR(100) NOT NULL,
        isAdmin BOOLEAN DEFAULT false,
        registered TIMESTAMP WITH TIME ZONE DEFAULT now()
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
  CREATE TABLE IF NOT EXISTS incidents(
    incident_id SERIAL PRIMARY KEY,
    createdBy INT REFERENCES users(id) ON DELETE CASCADE,
    location VARCHAR(100) NOT NULL,
    title TEXT NOT NULL,
    images text[],
    videos text[],
    comment TEXT NOT NULL,
    status VARCHAR(100) NOT NULL DEFAULT 'draft',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
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
