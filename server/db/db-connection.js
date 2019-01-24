import { Pool } from 'pg';

class Db {
  static dbConnect() {
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
    return pool;
  }
}

export default Db.dbConnect;
