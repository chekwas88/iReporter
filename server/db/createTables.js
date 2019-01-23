/* eslint-disable operator-linebreak */
import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

let pool;
if (process.env.NODE_ENV === 'development') {
  pool = new Pool({
    connectionString: process.env.DEVDB,
  });
  // check for test env
} else if (process.env.NODE_ENV === 'test') {
  pool = new Pool({
    connectionString: process.env.TESTDB,
  });
} else {
  pool = new Pool({
    connectionString: process.env.PRODUCTIONDB,
  });
}

export default {
  createTables: () => {
    const usersText =
      `CREATE TABLE IF NOT EXISTS
      users(
        id SERIAL PRIMARY KEY NOT NULL,
        firstname VARCHAR(40) NOT NULL,
        lastname VARCHAR(40) NOT NULL,
        othername VARCHAR(40),
        username VARCHAR(40) NOT NULL,
        email VARCHAR(128) NOT NULL,
        password VARCHAR(100) NOT NULL,
        phoneNumber VARCHAR(100) NOT NULL,
        isAdmin BOOLEAN DEFAULT true,
        registered TIMESTAMP WITH TIME ZONE DEFAULT now()
      );`;
    const incidentText =
      `CREATE TABLE IF NOT EXISTS 
      incidents(
      incident_id SERIAL PRIMARY KEY,
      createdBy INT REFERENCES users(id) ON DELETE CASCADE,
      location VARCHAR(100) NOT NULL,
      title TEXT NOT NULL,
      images text[],
      videos text[],
      comment TEXT NOT NULL,
      status VARCHAR(100) NOT NULL DEFAULT 'draft',
      created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
    );`;
    const queryTexts = `${usersText}${incidentText}`;
    pool.query(queryTexts)
      .then((res) => {
        console.log(res);
        pool.end();
      })
      .catch((err) => {
        console.log(err);
        pool.end();
      });
  },

  createUsersTable: () => {
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
      })
      .catch((err) => {
        console.log(err);
        pool.end();
      });
  },
};

// pool.on('remove', () => {
//   console.log('client removed');
//   process.exit(0);
// });

// require('make-runnable');
