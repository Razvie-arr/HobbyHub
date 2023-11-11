import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { Button, Center, Stack } from '@chakra-ui/react';
import { Option, pipe, ReadonlyArray } from 'effect';
import { createSearchParams, useNavigate } from 'react-router-dom';

import { AuthUser, EventType, SortType } from '../../../gql/graphql';
import { route } from '../../../route';
import { DataList } from '../../../shared/design-system';
import { DataMapButton } from '../../../shared/design-system/organisms/DataMap';
import { ContentContainer, QueryResult } from '../../../shared/layout';
import { EventProps, getEventFragmentData } from '../../../shared/types';
import { useAuth } from '../../auth';
import { EVENTS, LOCATION_AWARE_EVENTS } from '../queries';

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
              <DataMapButton
                mapInfos={{ user, type: 'event', dataArray: allEvents }}
                position="fixed"
                bottom="8"
                right="8"
              />
            ) : null}
            <Stack spacing="8" mt="8">
              <DataList
                user={user}
                type="event"
                dataArray={todaysNearbyEvents}
                title="Today around you"
                handleSeeAll={() => {
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
              <DataList
                user={user}
                type="event"
                dataArray={interestingNearbyEvents}
                title="Nearby events you might be interested in"
                handleSeeAll={() => {
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
              <DataList
                user={user}
                type="event"
                dataArray={newlyCreatedNearbyEvents}
                title="Newly added around you"
                handleSeeAll={() => {
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
              <DataMapButton
                mapInfos={{ user: null, type: 'event', dataArray: events }}
                position="fixed"
                bottom="8"
                right="8"
              />
            ) : null}
            <Stack spacing="8" mt="8">
              <DataList user={null} type="event" dataArray={events} title="Events" />
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

