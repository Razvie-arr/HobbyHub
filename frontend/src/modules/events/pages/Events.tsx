import { useQuery } from '@apollo/client';
import { Stack } from '@chakra-ui/react';
import { ReadonlyArray } from 'effect';

import { useGeolocation } from '../../../shared/hooks/useGeolocation';
import { QueryResult } from '../../../shared/layout';
import { useAuth } from '../../auth';
import { EventsMapButton, EventsSection } from '../components';
import { toFragmentData } from '../fragments';
import { EVENTS, LOCATION_AWARE_EVENTS } from '../queries';
import { EventProps } from '../types';

interface LocationAwareEventsProps {
  geolocation: GeolocationPosition;
  userId: number;
}

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
      render={(data) => {
        const todaysNearbyEvents = data.todaysNearbyEvents.map(toFragmentData);
        const interestingNearbyEvents = data.interestingNearbyEvents.map(toFragmentData);
        const newlyCreatedNearbyEvents = data.newlyCreatedNearbyEvents.map(toFragmentData);

        const allEvents: Array<EventProps> = ReadonlyArray.dedupeWith(
          [...todaysNearbyEvents, ...interestingNearbyEvents, ...newlyCreatedNearbyEvents],
          (self, that) => self.id === that.id,
        );

        return (
          <>
            <EventsMapButton events={allEvents} position="fixed" bottom="8" right="8" />
            <Stack spacing="8">
              <EventsSection events={todaysNearbyEvents} title="Today around you" />
              <EventsSection events={interestingNearbyEvents} title="Nearby events you might be interested in" />
              <EventsSection events={newlyCreatedNearbyEvents} title="Newly added around you" />
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
        <EventsSection events={data.events.map(toFragmentData)} title="Events" />
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

