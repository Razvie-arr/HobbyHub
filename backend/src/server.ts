import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { StandaloneServerContextFunctionArgument } from '@apollo/server/standalone';
import cors from 'cors';
import express from 'express';
import graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.js';
import http from 'http';

import { rootResolver } from './graphql/rootResolver';
import { rootTypeDefs } from './graphql/rootTypeDefs';
import { getConnection } from './libs/dbConnection';
import { getGoogleMapsClient } from './libs/googleMaps';
import { CustomContext } from './types/types';
import { PORT } from './config';
import { getSQLDataSource } from './datasource';

const init = async () => {
  const app = express();

  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    typeDefs: [rootTypeDefs],
    resolvers: rootResolver,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

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

  app.use(
    '/', //path to graphql server
    cors<cors.CorsRequest>(), // accepts all origins ('*'), not support cookies
    express.json(), // req.body parser
    graphqlUploadExpress(), // graphql upload middleware
    expressMiddleware(server, {
      context: customContext,
    }), // expressMiddleware by apollo adding the GraphQL server
  );

  httpServer.listen({ port: PORT }, () => {
    // eslint-disable-next-line no-console
    console.log(`Server listening on port: ${PORT}`);
  });
};

void init();

