import { OperationVariables, QueryResult as ApolloQueryResult } from '@apollo/client';
import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Card, Flex, Spinner } from '@chakra-ui/react';

interface QueryResultProps<T, V extends OperationVariables> {
  queryResult: ApolloQueryResult<T, V>;
  render: (data: T) => React.ReactNode;
}

export const QueryResult = <T, V extends OperationVariables>({ queryResult, render }: QueryResultProps<T, V>) => {
  if (queryResult.error) {
    return (
      <Card>
        <Alert status="error" borderRadius="4">
          <AlertIcon />
          <Box>
            <AlertTitle>{queryResult.error.name}</AlertTitle>
            <AlertDescription>{queryResult.error.message}</AlertDescription>
          </Box>
        </Alert>
      </Card>
    );
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

