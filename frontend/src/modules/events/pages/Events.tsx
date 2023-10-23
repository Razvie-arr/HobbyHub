import { useQuery } from '@apollo/client';
import { Alert, AlertIcon, AlertTitle, Card, Container, Heading, Stack } from '@chakra-ui/react';

import { Box } from 'src/shared/design-system';

import { useGeolocation } from '../../../shared/hooks/useGeolocation';
import { QueryResult } from '../../../shared/layout';
import { useAuth } from '../../auth';
import { EventsMapButton, EventsSection } from '../components';
import { EVENTS, INTERESTING_NEARBY_EVENTS, NEWLY_CREATED_NEARBY_EVENTS, TODAYS_NEARBY_EVENTS } from '../queries';
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

  const todaysNearbyEventsQueryResult = useQuery(TODAYS_NEARBY_EVENTS, {
    variables: { offset: 0, limit: 4, longitude, latitude },
  });
  const interestingNearbyEventsQueryResult = useQuery(INTERESTING_NEARBY_EVENTS, {
    variables: { offset: 0, limit: 4, longitude, latitude, userId },
  });
  const newlyCreatedNearbyEventsQueryResult = useQuery(NEWLY_CREATED_NEARBY_EVENTS, {
    variables: { offset: 0, limit: 4, longitude, latitude },
  });

  const allEvents: Array<EventProps> = Object.values(
    [
      ...(todaysNearbyEventsQueryResult.data?.todaysNearbyEvents ?? []),
      ...(interestingNearbyEventsQueryResult.data?.interestingNearbyEvents ?? []),
      ...(newlyCreatedNearbyEventsQueryResult.data?.newlyCreatedNearbyEvents ?? []),
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
                  const events = data.todaysNearbyEvents;
                  return events && events.length > 0 ? (
                    <EventsSection
                      events={events}
                      handleShowMore={() => {
                        void otherResults.fetchMore({ variables: { offset: events.length + 1 } });
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
                        void otherResults.fetchMore({ variables: { offset: events.length + 1 } });
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
                  const events = data.newlyCreatedNearbyEvents?.filter((value): value is NonNullable<typeof value> =>
                    Boolean(value),
                  );
                  return events && events.length > 0 ? (
                    <EventsSection
                      events={events}
                      handleShowMore={() => {
                        void otherResults.fetchMore({ variables: { offset: events.length + 1 } });
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
  const getEventsQueryResult = useQuery(EVENTS, {
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
                  const events = data.events?.filter((value): value is NonNullable<typeof value> => Boolean(value));
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
  const { geolocation, isLoading } = useGeolocation();
  const { user } = useAuth();
  if (isLoading) {
    return null;
  }
  return geolocation && user ? (
    <LocationAwareEvents geolocation={geolocation} userId={user.id} />
  ) : (
    <LocationUnawareEvents />
  );
};

