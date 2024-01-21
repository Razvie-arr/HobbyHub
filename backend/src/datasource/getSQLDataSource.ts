import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } from '../config';

import { SQLDataSource } from './SQLDataSource';

let sqlDataSource: SQLDataSource | null = null;

export const getSQLDataSource = (): SQLDataSource => {
  try {
    if (!sqlDataSource) {
      sqlDataSource = new SQLDataSource({
        knexConfig: {
          client: 'mysql',
          // @ts-expect-error
          connection: {
            host: DB_HOST,
            port: DB_PORT,
            user: DB_USER,
            password: DB_PASSWORD,
            database: DB_NAME,
            // @ts-expect-error
            typeCast: (field, next) => {
              if (field.type === 'DATETIME') {
                const [datePart, hourPart] = field.string().slice(0, 23).split(' ');
                return `${datePart}T${hourPart}Z`;
              }
              return next();
            },
          },
          pool: { min: 0, max: 7 },
        },
      });
    }
    return sqlDataSource;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log('err', err);
    throw err;
  }
};

