import { ApolloServer } from '@apollo/server';
import { StandaloneServerContextFunctionArgument, startStandaloneServer } from '@apollo/server/standalone';

import { rootResolver } from './graphql/rootResolver';
import { rootTypeDefs } from './graphql/rootTypeDefs';
import { getConnection } from './libs/dbConnection';
import { CustomContext } from './types/types';
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER, PORT } from './config';
import { SQLDataSource } from './datasource';

const init = async () => {
  const server = new ApolloServer({
    typeDefs: [rootTypeDefs],
    resolvers: rootResolver,
  });

  const customContext = async ({ req }: StandaloneServerContextFunctionArgument): Promise<CustomContext> => {
    const auth = req.headers.Authorization || '';

    return {
      dbConnection: await getConnection(),
      dataSources: {
        sql: new SQLDataSource({
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
        }),
      },
      auth,
    };
  };

  const { url } = await startStandaloneServer(server, {
    listen: {
      port: PORT,
    },
    context: customContext,
  });

  // eslint-disable-next-line no-console
  console.log('Server listening at: ' + url);
};

void init();

