import { useCallback, useState } from 'react';
import queryString from 'query-string';
import { ZodSchema } from 'zod';

// @ts-expect-error
const setQuery = (data: T) => {
  const url = new URL(window.location.href);
  url.search = queryString.stringify(data, { arrayFormat: 'index' });
  window.history.replaceState(window.history.state, '', url);
};

export const useUrlState = <T>(schema: ZodSchema<T>): [T | undefined, (nextState: T) => void] => {
  const [initialState] = useState(() => {
    const result = schema.safeParse(
      queryString.parse(window.location.search, { arrayFormat: 'index', parseNumbers: true }),
    );
    return result.success ? result.data : undefined;
  });

  const handleSetState = useCallback((nextState: T) => {
    setQuery(nextState);
  }, []);

  return [initialState, handleSetState];
};

