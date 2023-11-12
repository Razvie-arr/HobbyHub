import 'cross-fetch/polyfill';

import { ReactNode, useCallback, useMemo } from 'react';
import { ApolloClient, ApolloLink, ApolloProvider, from, InMemoryCache } from '@apollo/client';
import { GraphQLErrors, NetworkError } from '@apollo/client/errors';
import { onError } from '@apollo/client/link/error';
import { offsetLimitPagination } from '@apollo/client/utilities';
import { createUploadLink } from 'apollo-upload-client';
import { useNavigate } from 'react-router-dom';

import { config } from 'src/config';
import { useAuth } from 'src/modules/auth';
import { route } from 'src/route';

interface Props {
  children: ReactNode;
}

export function EnhancedApolloProvider({ children }: Props) {
  const navigate = useNavigate();
  const { token, signOut } = useAuth();

  const handleSignOut = useCallback(() => {
    signOut();
    navigate(route.home());
    window.location.reload();
  }, [signOut, navigate]);

  const authLink = new ApolloLink((operation, forward) => {
    operation.setContext({
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
      },
    });

    return forward(operation);
  });

  const logoutLink = onError(({ graphQLErrors, networkError }) => {
    if (hasUnauthenticatedErrorCode(graphQLErrors) || hasNetworkStatusCode(networkError, 401)) {
      handleSignOut();
    }
  });

  const cache = useMemo(
    () =>
      new InMemoryCache({
        typePolicies: {
          Query: {
            fields: {
              events: offsetLimitPagination(),
              filterEvents: {
                ...offsetLimitPagination(),
                keyArgs: ['filterLocation', 'start_datetime', 'end_datetime', 'sort', 'eventTypeIds'],
              },
              searchEvents: {
                ...offsetLimitPagination(),
                keyArgs: ['text'],
              },
            },
          },
        },
      }),
    [],
  );

  const client = new ApolloClient({
    link: from([logoutLink, authLink, uploadLink]),
    cache,
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-and-network',
      },
      query: {
        notifyOnNetworkStatusChange: true,
        fetchPolicy: 'cache-first',
      },
    },
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

const UNAUTHENTICATED_CODE = 'UNAUTHENTICATED';

const hasUnauthenticatedErrorCode = (errors: GraphQLErrors | undefined) =>
  errors && errors.some((error) => error.extensions.code === UNAUTHENTICATED_CODE);

const hasNetworkStatusCode = (error: NetworkError | undefined, code: number) =>
  error && 'statusCode' in error && error.statusCode === code;

const uploadLink = createUploadLink({
  uri: config.GRAPHQL_API,
  headers: {
    'Apollo-Require-Preflight': 'ok', // This is for CSRF
  },
});

