import { ApolloServer } from '@apollo/server';
import { StandaloneServerContextFunctionArgument, startStandaloneServer } from '@apollo/server/standalone';

import { rootResolver } from './graphql/rootResolver';
import schemaDefinition from './graphql/rootTypeDefs';
import { getConnection } from './libs/dbConnection';
import { CustomContext } from './types/types';
import { PORT } from './config';

const init = async () => {
  const server = new ApolloServer({
    typeDefs: [schemaDefinition],
    resolvers: rootResolver,
  });

  const customContext = async ({ req }: StandaloneServerContextFunctionArgument): Promise<CustomContext> => {
    const auth = req.headers.Authorization || '';

    return {
      dbConnection: await getConnection(),
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

