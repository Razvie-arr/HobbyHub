import { OperationVariables, QueryResult as ApolloQueryResult } from '@apollo/client';
import { Flex, Spinner } from '@chakra-ui/react';

interface QueryResultProps<T, V extends OperationVariables> {
  queryResult: ApolloQueryResult<T, V>;
  render: (data: T) => React.ReactNode;
}

export const QueryResult = <T, V extends OperationVariables>({ queryResult, render }: QueryResultProps<T, V>) => {
  if (queryResult.error) {
    return <p>ERROR: {queryResult.error.message}</p>;
  }
  if (queryResult.loading) {
    return (
      <Flex justify="center" alignItems="center">
        <Spinner size="xl" />
      </Flex>
    );
  }
  if (queryResult.data) {
    return render(queryResult.data);
  }
  return <p>Nothing to show...</p>;
};

