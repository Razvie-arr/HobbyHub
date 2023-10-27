import { ApolloServer } from '@apollo/server';
import { StandaloneServerContextFunctionArgument, startStandaloneServer } from '@apollo/server/standalone';

import { rootResolver } from './graphql/rootResolver';
import { rootTypeDefs } from './graphql/rootTypeDefs';
import { getConnection } from './libs/dbConnection';
import { getGoogleMapsClient } from './libs/googleMaps';
import { CustomContext } from './types/types';
import { PORT } from './config';
import { getSQLDataSource } from './datasource';

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
        sql: getSQLDataSource(),
      },
      googleMapsClient: getGoogleMapsClient(),
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

