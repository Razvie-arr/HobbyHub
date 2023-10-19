import { ReactNode } from 'react';
import { useQuery } from '@apollo/client';
import { Center, Heading, Stack } from '@chakra-ui/react';

import { Box, Button, Flex } from 'src/shared/design-system';

import { gql } from '../../../gql';
import { QueryResult } from '../../../shared/layout';
import { EventCard } from '../components';
import { WithEvents } from '../types';

interface EventsSectionProps extends Partial<WithEvents> {
  title: ReactNode;
}

const EVENTS = gql(`
  query GetEvents($offset: Int, $limit: Int) {
    getEvents(offset: $offset, limit: $limit) {
      id
      name
      start_datetime
      end_datetime
      event_types {
        id
        name
      }
      author {
        id
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
      capacity
      allow_waitlist
      participants {
        id
        name
      }
    }
  }
`);

export const EventsSection = ({ title }: EventsSectionProps) => {
  const queryResult = useQuery(EVENTS, { variables: { offset: 0, limit: 4 } });
  return (
    <Box>
      <Stack spacing="8">
        <Heading as="h1">{title}</Heading>
        <QueryResult
          queryResult={queryResult}
          render={(data) => {
            const events = data.getEvents?.filter((value): value is NonNullable<typeof value> => Boolean(value));
            return events && events.length > 0 ? (
              <>
                <Center>
                  <Flex flexWrap="wrap" columnGap="4">
                    {events.map((value) => (
                      <EventCard key={value.id} event={value} />
                    ))}
                  </Flex>
                </Center>
                <Flex justify="center">
                  <Button
                    size="lg"
                    colorScheme="purple"
                    onClick={() => {
                      void queryResult.fetchMore({ variables: { offset: events.length } });
                    }}
                  >
                    Show more
                  </Button>
                </Flex>
              </>
            ) : null;
          }}
        />
      </Stack>
    </Box>
  );
};

