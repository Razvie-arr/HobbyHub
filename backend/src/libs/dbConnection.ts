import mariadb, { type Connection } from 'mariadb';

import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } from '../config';

let conn: Connection | null = null;

export const getConnection = async (): Promise<Connection> => {
  try {
    if (!conn) {
      conn = await mariadb.createConnection({
        host: DB_HOST,
        port: DB_PORT,
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_NAME,
      });
    }
    return conn;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log('err', err);
    throw err;
  }
};
