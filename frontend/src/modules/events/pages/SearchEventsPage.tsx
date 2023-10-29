import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { Button, Center, Stack } from '@chakra-ui/react';
import { ReadonlyArray } from 'effect';
import { useSearchParams } from 'react-router-dom';

import { ContentContainer, QueryResult } from '../../../shared/layout';
import { EventsMapButton, EventsSection } from '../components';
import { getEventFragmentData } from '../fragments';
import { SEARCH_EVENTS } from '../queries';

export const SearchEventsPage = () => {
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
            <>
              <EventsMapButton events={events} position="fixed" bottom="8" right="8" />
              <Stack spacing="8" mt="8">
                <EventsSection events={events} title="Search results" />
              </Stack>
              {ReadonlyArray.isNonEmptyArray(events) ? (
                <Center mb="16">
                  <Button
                    colorScheme="purple"
                    isDisabled={noMoreResults}
                    onClick={async () => {
                      const result = await searchResult.fetchMore({
                        variables: {
                          offset: events.length,
                        },
                      });
                      if ((result.data.searchEvents.length ?? 0) === 0) {
                        setNoMoreResults(true);
                      }
                    }}
                  >
                    {noMoreResults ? 'No more results: Try different search values' : 'Show more'}
                  </Button>
                </Center>
              ) : null}
            </>
          );
        }}
      />
    </ContentContainer>
  );
};

