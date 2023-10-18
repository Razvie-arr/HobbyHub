import { useQuery } from '@apollo/client';
import { Stack } from '@chakra-ui/react';

import { gql } from 'src/gql';
import { Box } from 'src/shared/design-system';

import { EventsMapButton, EventsSection } from '../components';

const EVENTS = gql(`
  query GetEvents {
    getEvents {
      id
      name
      start_datetime
      end_datetime
      event_types {
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

  if (!(queryState.data?.getEvents && queryState.data.getEvents)) {
    return null;
  }

  const events = queryState.data.getEvents.filter((value): value is NonNullable<typeof value> => Boolean(value));

  return (
    <>
      <EventsMapButton events={events} position="fixed" bottom="8" right="8" />
      <Box w={{ xl: '1470px', lg: '1024px', md: '768px' }} mx="auto">
        <Stack spacing="8">
          <EventsSection title="Today around you" events={events} />
          <EventsSection title="You might be interested" events={events} />
          <EventsSection title="Newly added around you" events={events} />
        </Stack>
      </Box>
    </>
  );
};

