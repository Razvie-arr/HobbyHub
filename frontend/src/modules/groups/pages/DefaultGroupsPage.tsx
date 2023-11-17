import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { Button, Center, Stack } from '@chakra-ui/react';
import { Option, pipe, ReadonlyArray } from 'effect';
import { createSearchParams, useNavigate } from 'react-router-dom';

import { AuthUser, EventType } from '../../../gql/graphql';
import { route } from '../../../route';
import { DataList } from '../../../shared/design-system';
import { DataMapButton } from '../../../shared/design-system/organisms/DataMap';
import { QueryResult } from '../../../shared/layout';
import { getGroupFragmentData } from '../../../shared/types';
import { useAuth } from '../../auth';
import { GROUPS, LOCATION_AWARE_GROUPS } from '../queries';

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

const LocationAwareGroups = ({ geolocation, user }: LocationAwareEventsProps) => {
  const navigate = useNavigate();

  const { latitude, longitude } = geolocation;

  const result = useQuery(LOCATION_AWARE_GROUPS, {
    variables: { offset: 0, limit: 4, longitude, latitude, userId: user.id },
  });

  return (
    <QueryResult
      queryResult={result}
      render={(data) => {
        const nearbyGroups = data.nearbyGroups.map(getGroupFragmentData);
        const interestingNearbyGroups = data.interestingNearbyGroups.map(getGroupFragmentData);

        const allGroups = ReadonlyArray.dedupeWith(
          [...nearbyGroups, ...interestingNearbyGroups],
          (self, that) => self.id === that.id,
        );

        return (
          <>
            {ReadonlyArray.isNonEmptyArray(allGroups) ? (
              <DataMapButton
                mapInfos={{ user, type: 'group', dataArray: allGroups }}
                position="fixed"
                bottom="8"
                right="8"
              />
            ) : null}
            <Stack spacing="8" mt="8">
              <DataList
                user={user}
                type="group"
                dataArray={nearbyGroups}
                title="Groups near you"
                handleSeeAll={() => {
                  const startDate = new Date();
                  const endDate = new Date();
                  endDate.setDate(endDate.getDate() + 1);
                  navigate({
                    pathname: route.groups(),
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
                type="group"
                dataArray={interestingNearbyGroups}
                title="Nearby groups you might be interested in"
                handleSeeAll={() => {
                  navigate({
                    pathname: route.groups(),
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
            </Stack>
          </>
        );
      }}
    />
  );
};

const LocationUnawareGroups = () => {
  const queryResult = useQuery(GROUPS, {
    variables: { offset: 0, limit: 8 },
  });

  const [noMoreResults, setNoMoreResults] = useState(false);

  return (
    <QueryResult
      queryResult={queryResult}
      render={(data) => {
        const groups = data.groups.map(getGroupFragmentData);
        return (
          <>
            {ReadonlyArray.isNonEmptyArray(groups) ? (
              <DataMapButton
                mapInfos={{ user: null, type: 'group', dataArray: groups }}
                position="fixed"
                bottom="8"
                right="8"
              />
            ) : null}
            <Stack spacing="8" mt="8">
              <DataList user={null} type="group" dataArray={groups} title="Groups" />
            </Stack>
            {ReadonlyArray.isNonEmptyArray(groups) ? (
              <Center mb="16">
                <Button
                  colorScheme="purple"
                  isDisabled={noMoreResults}
                  onClick={async () => {
                    const result = await queryResult.fetchMore({
                      variables: {
                        offset: groups.length,
                      },
                    });
                    if ((result.data.groups.length ?? 0) === 0) {
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

export const DefaultGroupsPage = () => {
  const { user } = useAuth();

  return user && user.event_types.length > 0 && user.location ? (
    <LocationAwareGroups
      geolocation={{ latitude: user.location.latitude, longitude: user.location.longitude }}
      user={user}
    />
  ) : (
    <LocationUnawareGroups />
  );
};
