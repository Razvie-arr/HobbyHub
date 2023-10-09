import { Connection } from 'mariadb';

export type CustomContext = {
  dbConnection: Connection;
  auth: string | string[];
};
