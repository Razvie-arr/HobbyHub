import { useQuery } from '@apollo/client';
import { Stack } from '@chakra-ui/react';

import { MainFilters } from '../../../shared/filters';
import { ContentContainer, QueryResult } from '../../../shared/layout';
import { EventsMapButton, EventsSection } from '../components';
import { toFragmentData } from '../fragments';
import { EVENTS } from '../queries';

export const EventsPage = () => (
  <>
    <MainFilters />
    <ContentContainer>
      <QueryResult
        queryResult={useQuery(EVENTS, {
          variables: { offset: 0, limit: 10 },
        })}
        render={(data) => (
          <>
            <EventsMapButton events={data.events.map(toFragmentData)} position="fixed" bottom="8" right="8" />
            <Stack spacing="8">
              <EventsSection events={data.events.map(toFragmentData)} />
            </Stack>
          </>
        )}
      />
    </ContentContainer>
  </>
);

