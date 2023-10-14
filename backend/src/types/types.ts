import { Connection } from 'mariadb';

export interface CustomContext {
  dbConnection: Connection;
  auth: string | string[];
}
