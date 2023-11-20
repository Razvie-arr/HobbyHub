import { OperationVariables, QueryResult } from '@apollo/client';

interface CreateShowMoreHandlerParams<Q, V extends OperationVariables> {
  queryName: Exclude<keyof Q, '__typename'>;
  queryResult: QueryResult<Q, V>;
  offset: number;
  onNoMoreResults: () => void;
}

export const createShowMoreHandler =
  <Q, V extends OperationVariables>({
    queryName,
    queryResult,
    offset,
    onNoMoreResults,
  }: CreateShowMoreHandlerParams<Q, V>) =>
  async () => {
    const result = await queryResult.fetchMore({
      variables: {
        offset,
      },
    });
    const data = result.data[queryName];
    if (data && Array.isArray(data) && data.length === 0) {
      onNoMoreResults();
    }
  };

