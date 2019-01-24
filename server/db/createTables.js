import dotenv from 'dotenv';
import createTable from './create-table-queries';
import con from './db-connection';

dotenv.config();
const pool = con();

export default {
  createTables: () => {
    pool.query(createTable)
      .then((res) => {
        console.log(res);
        pool.end();
      })
      .catch((err) => {
        console.log(err);
        pool.end();
      });
  },
};
