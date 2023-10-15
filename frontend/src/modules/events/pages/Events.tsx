import { useQuery } from '@apollo/client';
import { Stack } from '@chakra-ui/react';

import { gql } from 'src/gql';
import { useAuth } from 'src/modules/auth';
import { Box } from 'src/shared/design-system';
import { TopNavigation } from 'src/shared/navigation';

import { EventsMapButton, EventsSection } from '../components';

const EVENTS = gql(`
  query GetEvents {
    events {
      id
      name
      start_datetime
      end_datetime
      eventTypes {
        id
        name
      }
      author {
        name
      }
      location {
        country
        city
        street_name
        street_number
        longitude
        latitude
      }
      summary
      description
      image_filePath
    }
  }
`);

export const Events = () => {
  const queryState = useQuery(EVENTS);

  if (!(queryState.data?.events && queryState.data.events)) {
    return null;
  }

  const events = queryState.data.events.filter((value): value is NonNullable<typeof value> => Boolean(value));

  return (
    <Box>
      <TopNavigation />
      <Box w={{ xl: '1470px', lg: '1024px', md: '768px' }} mx="auto" pt="8" px="8">
        <Stack spacing="8">
          <EventsMapButton />
          <EventsSection title="Today around you" events={events} />
          <EventsSection title="You might be interested" events={events} />
          <EventsSection title="Newly added around you" events={events} />
        </Stack>
      </Box>
    </Box>
  );
};

