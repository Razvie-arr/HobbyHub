import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { Stack } from '@chakra-ui/react';
import { useSearchParams } from 'react-router-dom';

import { DataList } from '../../../shared/design-system';
import { ContentContainer, QueryResult } from '../../../shared/layout';
import { getEventFragmentData } from '../../../shared/types';
import { useAuth } from '../../auth';
import { SEARCH_EVENTS } from '../queries';

export const SearchEventsPage = () => {
  const { user } = useAuth();

  const [params] = useSearchParams();
  const searchValue = params.get('searchValue') as string;

  const [noMoreResults, setNoMoreResults] = useState(false);

  useEffect(() => {
    setNoMoreResults(false);
  }, [searchValue]);

  const searchResult = useQuery(SEARCH_EVENTS, {
    variables: {
      text: searchValue,
      limit: 8,
      offset: 0,
    },
  });

  return (
    <ContentContainer>
      <QueryResult
        queryResult={searchResult}
        render={(data) => {
          const events = data.searchEvents.map(getEventFragmentData);
          return (
            <Stack spacing="8" mt="8">
              <DataList
                user={user}
                type="event"
                dataArray={events}
                title="Search results"
                noMoreResults={noMoreResults}
                handleShowMore={async () => {
                  const result = await searchResult.fetchMore({
                    variables: {
                      offset: events.length,
                    },
                  });
                  if ((result.data.searchEvents.length ?? 0) === 0) {
                    setNoMoreResults(true);
                  }
                }}
              />
            </Stack>
          );
        }}
      />
    </ContentContainer>
  );
};
