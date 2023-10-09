import 'cross-fetch/polyfill';

import { ReactNode, useCallback } from 'react';
import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  createHttpLink,
  from,
  InMemoryCache,
} from '@apollo/client';
import { GraphQLErrors, NetworkError } from '@apollo/client/errors';
import { onError } from '@apollo/client/link/error';
import { useNavigate } from 'react-router-dom';

import { config } from 'src/config';
import { useAuth } from 'src/modules/auth';
import { route } from 'src/route';

type Props = {
  children: ReactNode;
};

export function EnhancedApolloProvider({ children }: Props) {
  const navigate = useNavigate();
  const { token, signOut } = useAuth();

  const handleSignOut = useCallback(() => {
    signOut();
    navigate(route.signIn());
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
    if (
      hasUnauthenticatedErrorCode(graphQLErrors) ||
      hasNetworkStatusCode(networkError, 401)
    ) {
      handleSignOut();
    }
  });

  const client = new ApolloClient({
    link: from([logoutLink, authLink, httpLink]),
    cache: new InMemoryCache(),
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

const hasUnauthenticatedErrorCode = (errors: GraphQLErrors | undefined) => {
  return (
    errors &&
    errors.some((error) => error.extensions.code === UNAUTHENTICATED_CODE)
  );
};

const hasNetworkStatusCode = (
  error: NetworkError | undefined,
  code: number,
) => {
  return error && 'statusCode' in error && error.statusCode === code;
};

const httpLink = createHttpLink({
  uri: config.GRAPHQL_API,
});
