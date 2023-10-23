import { useQuery } from '@apollo/client';
import { Alert, AlertIcon, AlertTitle, Card, Container, Heading, Stack } from '@chakra-ui/react';

import { Box } from 'src/shared/design-system';

import { useGeolocation } from '../../../shared/hooks/useGeolocation';
import { QueryResult } from '../../../shared/layout';
import { useAuth } from '../../auth';
import { EventsMapButton, EventsSection } from '../components';
import {
  GET_EVENTS,
  GET_INTERESTING_NEARBY_EVENTS,
  GET_NEWLY_CREATED_NEARBY_EVENTS,
  GET_TODAYS_NEARBY_EVENTS,
} from '../queries';
import { EventProps } from '../types';

interface LocationAwareEventsProps {
  geolocation: GeolocationPosition;
  userId: number;
}

const NoEvents = () => (
  <Card>
    <Alert status="info" borderRadius="4">
      <AlertIcon />
      <Box>
        <AlertTitle>No events found</AlertTitle>
      </Box>
    </Alert>
  </Card>
);

const LocationAwareEvents = ({ geolocation, userId }: LocationAwareEventsProps) => {
  const {
    coords: { latitude, longitude },
  } = geolocation;
  const todaysNearbyEventsQueryResult = useQuery(GET_TODAYS_NEARBY_EVENTS, {
    variables: { offset: 0, limit: 4, longitude, latitude },
  });
  const interestingNearbyEventsQueryResult = useQuery(GET_INTERESTING_NEARBY_EVENTS, {
    variables: { offset: 0, limit: 4, longitude, latitude, userId },
  });
  const newlyCreatedNearbyEventsQueryResult = useQuery(GET_NEWLY_CREATED_NEARBY_EVENTS, {
    variables: { offset: 0, limit: 4, longitude, latitude },
  });

  const allEvents: Array<EventProps> = Object.values(
    [
      ...(todaysNearbyEventsQueryResult.data?.getTodaysNearbyEvents ?? []),
      ...(interestingNearbyEventsQueryResult.data?.interestingNearbyEvents ?? []),
      ...(newlyCreatedNearbyEventsQueryResult.data?.getNewlyCreatedNearbyEvents ?? []),
    ].reduce((acc, obj) => ({ ...acc, [obj.id]: obj }), {}),
  );

  return (
    <>
      <EventsMapButton events={allEvents} position="fixed" bottom="8" right="8" />
      <Container maxWidth="8xl" mx="auto">
        <Stack spacing="8">
          <Box>
            <Stack spacing="8">
              <Heading as="h1">Today around you</Heading>
              <QueryResult
                queryResult={todaysNearbyEventsQueryResult}
                render={(data, otherResults) => {
                  const events = data.getTodaysNearbyEvents;
                  return events && events.length > 0 ? (
                    <EventsSection
                      events={events}
                      handleShowMore={() => {
                        void otherResults.fetchMore({ variables: { offset: events.length } });
                      }}
                    />
                  ) : (
                    <NoEvents />
                  );
                }}
              />
            </Stack>
          </Box>
          <Box>
            <Stack spacing="8">
              <Heading as="h1">Nearby events you might be interested in</Heading>
              <QueryResult
                queryResult={interestingNearbyEventsQueryResult}
                render={(data, otherResults) => {
                  const events = data.interestingNearbyEvents?.filter((value): value is NonNullable<typeof value> =>
                    Boolean(value),
                  );
                  return events && events.length > 0 ? (
                    <EventsSection
                      events={events}
                      handleShowMore={() => {
                        void otherResults.fetchMore({ variables: { offset: events.length } });
                      }}
                    />
                  ) : (
                    <NoEvents />
                  );
                }}
              />
            </Stack>
          </Box>
          <Box>
            <Stack spacing="8">
              <Heading as="h1">Newly added around you</Heading>
              <QueryResult
                queryResult={newlyCreatedNearbyEventsQueryResult}
                render={(data, otherResults) => {
                  const events = data.getNewlyCreatedNearbyEvents?.filter((value): value is NonNullable<typeof value> =>
                    Boolean(value),
                  );
                  return events && events.length > 0 ? (
                    <EventsSection
                      events={events}
                      handleShowMore={() => {
                        void otherResults.fetchMore({ variables: { offset: events.length } });
                      }}
                    />
                  ) : (
                    <NoEvents />
                  );
                }}
              />
            </Stack>
          </Box>
        </Stack>
      </Container>
    </>
  );
};

const LocationUnawareEvents = () => {
  const getEventsQueryResult = useQuery(GET_EVENTS, {
    variables: { offset: 0, limit: 4 },
  });

  return (
    <>
      <Box maxWidth={{ xl: '1470px' }} mx="auto">
        <Stack spacing="8">
          <Box>
            <Stack spacing="8">
              <Heading as="h1">Events</Heading>
              <QueryResult
                queryResult={getEventsQueryResult}
                render={(data, otherResults) => {
                  const events = data.getEvents?.filter((value): value is NonNullable<typeof value> => Boolean(value));
                  return events && events.length > 0 ? (
                    <EventsSection
                      events={events}
                      handleShowMore={() => {
                        void otherResults.fetchMore({ variables: { offset: events.length } });
                      }}
                    />
                  ) : (
                    <NoEvents />
                  );
                }}
              />
            </Stack>
          </Box>
        </Stack>
      </Box>
    </>
  );
};

export const Events = () => {
  const geolocation = useGeolocation();
  const { user } = useAuth();
  return geolocation && user ? (
    <LocationAwareEvents geolocation={geolocation} userId={user.id} />
  ) : (
    <LocationUnawareEvents />
  );
};

