import { useQuery } from '@apollo/client';
import { Alert, AlertIcon, AlertTitle, Card, Heading, Stack } from '@chakra-ui/react';
import { Option, pipe, ReadonlyArray } from 'effect';

import { Box } from 'src/shared/design-system';

import { useGeolocation } from '../../../shared/hooks/useGeolocation';
import { QueryResult } from '../../../shared/layout';
import { useAuth } from '../../auth';
import { EventsMapButton, EventsSection } from '../components';
import { EVENTS, LOCATION_AWARE_EVENTS } from '../queries';
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

const HandleEvents = ({ events }: { events: Array<EventProps> | null | undefined }) =>
  pipe(
    events,
    Option.fromNullable,
    Option.map(ReadonlyArray.filterMap(Option.fromNullable)),
    Option.filter(ReadonlyArray.isNonEmptyArray),
    Option.match({
      onNone: () => <NoEvents />,
      onSome: (nonEmptyEvents) => <EventsSection events={nonEmptyEvents} handleShowMore={() => {}} />,
    }),
  );

const LocationAwareEvents = ({ geolocation, userId }: LocationAwareEventsProps) => {
  const {
    coords: { latitude, longitude },
  } = geolocation;

  const result = useQuery(LOCATION_AWARE_EVENTS, {
    variables: { offset: 0, limit: 4, longitude, latitude, userId },
  });

  return (
    <QueryResult
      queryResult={result}
      render={({ todaysNearbyEvents, interestingNearbyEvents, newlyCreatedNearbyEvents }) => {
        const allEvents: Array<EventProps> = ReadonlyArray.dedupeWith(
          [...(todaysNearbyEvents ?? []), ...(interestingNearbyEvents ?? []), ...(newlyCreatedNearbyEvents ?? [])],
          (self, that) => self.id === that.id,
        );
        return (
          <>
            <EventsMapButton events={allEvents} position="fixed" bottom="8" right="8" />
            <Stack spacing="8">
              <Box>
                <Stack spacing="8">
                  <Heading as="h1">Today around you</Heading>
                  <HandleEvents events={todaysNearbyEvents} />
                </Stack>
              </Box>
              <Box>
                <Stack spacing="8">
                  <Heading as="h1">Nearby events you might be interested in</Heading>
                  <HandleEvents events={interestingNearbyEvents} />
                </Stack>
              </Box>
              <Box>
                <Stack spacing="8">
                  <Heading as="h1">Newly added around you</Heading>
                  <HandleEvents events={newlyCreatedNearbyEvents} />
                </Stack>
              </Box>
            </Stack>
          </>
        );
      }}
    />
  );
};

const LocationUnawareEvents = () => (
  <QueryResult
    queryResult={useQuery(EVENTS, {
      variables: { offset: 0, limit: 4 },
    })}
    render={(data) => (
      <Stack spacing="8">
        <Box>
          <Stack spacing="8">
            <Heading as="h1">Events</Heading>
            <HandleEvents events={data.events} />
          </Stack>
        </Box>
      </Stack>
    )}
  />
);

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

