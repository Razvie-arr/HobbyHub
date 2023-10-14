import mariadb, { type Connection } from 'mariadb';
import { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } from '../config';

let conn: Connection | null = null;

export const getConnection = async (): Promise<Connection> => {
  console.log({ DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME });
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
    console.log('err', err);
    throw err;
  }
};

