import { ReactNode } from 'react';
import { OperationVariables, QueryResult as ApolloQueryResult } from '@apollo/client';
import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Card, Flex, Spinner } from '@chakra-ui/react';

import { NoData } from '../design-system';

interface QueryResultProps<Q, V extends OperationVariables> {
  queryResult: ApolloQueryResult<Q, V>;
  queryName: Exclude<keyof Q, '__typename'>;
  render: (
    data: NonNullable<Q[Exclude<keyof Q, '__typename'>]>,
    otherResults: Omit<ApolloQueryResult<Q, V>, 'data'>,
  ) => React.ReactNode;
  renderOnNoData?: ReactNode;
  noDataDescription?: ReactNode;
  noDataTitle?: ReactNode;
}

export const QueryResult = <Q, V extends OperationVariables>({
  queryResult,
  queryName,
  render,
  renderOnNoData,
  noDataDescription,
  noDataTitle,
}: QueryResultProps<Q, V>) => {
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

  if (queryResult.loading && !queryResult.data) {
    return (
      <Flex justify="center" alignItems="center" width="100%" p="8" flex="1 1 auto">
        <Spinner size="xl" />
      </Flex>
    );
  }

  if (queryResult.data && queryResult.data[queryName]) {
    const { data, ...rest } = queryResult;

    const result = data[queryName];

    if (Array.isArray(result) && result.length === 0) {
      return renderOnNoData ?? <NoData description={noDataDescription} title={noDataTitle}/>;
    }

    return render(result as NonNullable<Q[Exclude<keyof Q, '__typename'>]>, rest);
  }

  return renderOnNoData ?? <NoData description={noDataDescription} title={noDataTitle} />;
};

