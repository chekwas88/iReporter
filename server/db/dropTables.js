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
  dropIncidentsTable: () => {
    const queryText = 'DROP TABLE IF EXISTS incidents CASCADE';
    pool.query(queryText)
      .then((res) => {
        console.log(res);
        pool.end();
      })
      .catch((err) => {
        console.log(err);
      });
  },
  dropUsersTable: () => {
    const queryText = 'DROP TABLE IF EXISTS users CASCADE';
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
