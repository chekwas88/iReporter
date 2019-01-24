/* eslint-disable operator-linebreak */
import dotenv from 'dotenv';
// import { Pool } from 'pg';
import con from './db-connection';
import dropQueries from './drop-table-queries';

dotenv.config();
const pool = con();
export default {
  dropTables: () => {
    pool.query(dropQueries)
      .then((res) => {
        console.log(res);
        pool.end();
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
