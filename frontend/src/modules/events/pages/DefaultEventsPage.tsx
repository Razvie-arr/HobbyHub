import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { Button, Center, Stack } from '@chakra-ui/react';
import { Option, pipe, ReadonlyArray } from 'effect';
import { createSearchParams, useNavigate } from 'react-router-dom';

import { AuthUser, EventType, SortType } from '../../../gql/graphql';
import { route } from '../../../route';
import { ContentContainer, QueryResult } from '../../../shared/layout';
import { useAuth } from '../../auth';
import { EventsMapButton, EventsSection } from '../components';
import { getEventFragmentData } from '../fragments';
import { EVENTS, LOCATION_AWARE_EVENTS } from '../queries';
import { EventProps } from '../types';

interface LocationAwareEventsProps {
  geolocation: Pick<GeolocationPosition['coords'], 'longitude' | 'latitude'>;
  user: AuthUser;
}

const eventTypesToSearchParams = (eventTypes: Array<EventType>, eventTypeCategory: string) =>
  pipe(
    eventTypes,
    ReadonlyArray.filterMap(({ category, id }) => (category === eventTypeCategory ? Option.some(id) : Option.none())),
    (ids) => ids.toString(),
  );

const LocationAwareEvents = ({ geolocation, user }: LocationAwareEventsProps) => {
  const navigate = useNavigate();

  const { latitude, longitude } = geolocation;

  const result = useQuery(LOCATION_AWARE_EVENTS, {
    variables: { offset: 0, limit: 4, longitude, latitude, userId: user.id },
  });

  return (
    <QueryResult
      queryResult={result}
      render={(data) => {
        const todaysNearbyEvents = data.todaysNearbyEvents.map(getEventFragmentData);
        const interestingNearbyEvents = data.interestingNearbyEvents.map(getEventFragmentData);
        const newlyCreatedNearbyEvents = data.newlyCreatedNearbyEvents.map(getEventFragmentData);

        const allEvents: Array<EventProps> = ReadonlyArray.dedupeWith(
          [...todaysNearbyEvents, ...interestingNearbyEvents, ...newlyCreatedNearbyEvents],
          (self, that) => self.id === that.id,
        );

        return (
          <>
            {ReadonlyArray.isNonEmptyArray(allEvents) ? (
              <EventsMapButton events={allEvents} position="fixed" bottom="8" right="8" />
            ) : null}
            <Stack spacing="8" mt="8">
              <EventsSection
                events={todaysNearbyEvents}
                title="Today around you"
                handleSeeAllEvents={() => {
                  const startDate = new Date();
                  const endDate = new Date();
                  endDate.setDate(endDate.getDate() + 1);
                  navigate({
                    pathname: route.events(),
                    search: createSearchParams({
                      lat: latitude.toString(),
                      lng: longitude.toString(),
                      startDate: startDate.toLocaleDateString(),
                      endDate: endDate.toLocaleDateString(),
                    }).toString(),
                  });
                }}
              />
              <EventsSection
                events={interestingNearbyEvents}
                title="Nearby events you might be interested in"
                handleSeeAllEvents={() => {
                  navigate({
                    pathname: route.events(),
                    search: createSearchParams({
                      lat: latitude.toString(),
                      lng: longitude.toString(),
                      distance: '20',
                      sports: eventTypesToSearchParams(user.event_types, 'Sports'),
                      games: eventTypesToSearchParams(user.event_types, 'Games'),
                      other: eventTypesToSearchParams(user.event_types, 'Other'),
                    }).toString(),
                  });
                }}
              />
              <EventsSection
                events={newlyCreatedNearbyEvents}
                title="Newly added around you"
                handleSeeAllEvents={() => {
                  navigate({
                    pathname: route.events(),
                    search: createSearchParams({
                      lat: latitude.toString(),
                      lng: longitude.toString(),
                      distance: '20',
                      sortBy: SortType.Date,
                    }).toString(),
                  });
                }}
              />
            </Stack>
          </>
        );
      }}
    />
  );
};

const LocationUnawareEvents = () => {
  const queryResult = useQuery(EVENTS, {
    variables: { offset: 0, limit: 8 },
  });

  const [noMoreResults, setNoMoreResults] = useState(false);

  return (
    <QueryResult
      queryResult={queryResult}
      render={(data) => {
        const events = data.events.map(getEventFragmentData);
        return (
          <>
            {ReadonlyArray.isNonEmptyArray(events) ? (
              <EventsMapButton events={events} position="fixed" bottom="8" right="8" />
            ) : null}
            <Stack spacing="8" mt="8">
              <EventsSection events={events} title="Events" />
            </Stack>
            {ReadonlyArray.isNonEmptyArray(events) ? (
              <Center mb="16">
                <Button
                  colorScheme="purple"
                  isDisabled={noMoreResults}
                  onClick={async () => {
                    const result = await queryResult.fetchMore({
                      variables: {
                        offset: events.length,
                      },
                    });
                    if ((result.data.events.length ?? 0) === 0) {
                      setNoMoreResults(true);
                    }
                  }}
                >
                  {noMoreResults ? 'No more results: Try different filter values' : 'Show more'}
                </Button>
              </Center>
            ) : null}
          </>
        );
      }}
    />
  );
};

export const DefaultEventsPage = () => {
  const { user } = useAuth();

  return user && user.event_types.length > 0 && user.location ? (
    <ContentContainer>
      <LocationAwareEvents
        geolocation={{ latitude: user.location.latitude, longitude: user.location.longitude }}
        user={user}
      />
    </ContentContainer>
  ) : (
    <ContentContainer>
      <LocationUnawareEvents />
    </ContentContainer>
  );
};

