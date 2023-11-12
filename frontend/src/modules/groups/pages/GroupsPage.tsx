import { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { Button, Center, Flex, Spinner, Stack } from '@chakra-ui/react';
import { Option, pipe, ReadonlyArray } from 'effect';

import { GroupSortType } from '../../../gql/graphql';
import { DataList } from '../../../shared/design-system';
import { DataMapButton } from '../../../shared/design-system/organisms/DataMap';
import { createGroupFilterValuesFromParams, GroupFilters, GroupFiltersValues } from '../../../shared/filters';
import { useFilterSearchParams } from '../../../shared/filters/hooks';
import { useLngLatGeocoding } from '../../../shared/hooks/useLngLatGeocoding';
import { ContentContainer, QueryResult } from '../../../shared/layout';
import { getGroupFragmentData } from '../../../shared/types';
import { useAuth } from '../../auth';
import { FILTERED_GROUPS } from '../queries';

const callIfFunction = (f: number | (() => number)) => (typeof f === 'number' ? f : f());

export const GroupsPageContainer = () => {
  const { params } = useFilterSearchParams();
  const { user } = useAuth();

  const { isLoading, location } = useLngLatGeocoding({
    lng: params.lng ?? user?.location?.longitude,
    lat: params.lat ?? user?.location?.latitude,
  });

  return isLoading ? (
    <Flex justify="center" alignItems="center" width="100%" p="8">
      <Spinner size="xl" />
    </Flex>
  ) : (
    <GroupPage location={location} />
  );
};

interface EventsPageProps {
  location: ReturnType<typeof useLngLatGeocoding>['location'];
}

const DEFAULT_LIMIT = 8;

export const GroupPage = ({ location }: EventsPageProps) => {
  const { user } = useAuth();
  const [getFilteredGroups, queryResult] = useLazyQuery(FILTERED_GROUPS);
  const { params } = useFilterSearchParams<GroupSortType>();

  const defaultFilterValues = { ...createGroupFilterValuesFromParams(params), address: location };

  const [filterValues, setFilterValues] = useState(defaultFilterValues);
  const [noMoreResults, setNoMoreResults] = useState(false);

  const fetchFilteredEvents = async (values: GroupFiltersValues, ownLimit: number) => {
    const filterLocation = pipe(
      values.address?.geometry?.location,
      Option.fromNullable,
      Option.map(({ lat, lng }) => ({
        latitude: callIfFunction(lat),
        longitude: callIfFunction(lng),
        distance: parseInt(values.distance),
      })),
      Option.getOrUndefined,
    );
    const eventTypeIds = [...values.sports, ...values.games, ...values.other];

    const result = await getFilteredGroups({
      variables: {
        filterLocation: filterLocation,
        eventTypeIds: ReadonlyArray.isNonEmptyArray(eventTypeIds) ? eventTypeIds : undefined,
        limit: ownLimit,
        offset: 0,
        sort: values.sortBy,
      },
    });
    return result;
  };

  useEffect(() => {
    if (location && filterValues.address === null) {
      setFilterValues((values) => ({ ...values, address: location }));
    }
  }, [location, filterValues]);

  useEffect(() => {
    if (!queryResult.data && !queryResult.error) {
      void fetchFilteredEvents(filterValues, DEFAULT_LIMIT);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <>
      <GroupFilters
        defaultValues={defaultFilterValues}
        handleSubmit={async (values) => {
          await fetchFilteredEvents(values, DEFAULT_LIMIT);
          setFilterValues(values);
          setNoMoreResults(false);
        }}
      />
      <ContentContainer>
        <QueryResult
          queryResult={queryResult}
          render={(data) => {
            const groupFragments = data.filterGroups;
            if (!groupFragments) {
              return null;
            }
            const groups = groupFragments.map(getGroupFragmentData);
            return (
              <>
                {ReadonlyArray.isNonEmptyArray(groups) ? (
                  <DataMapButton
                    mapInfos={{ user, type: 'group', dataArray: groups }}
                    position="fixed"
                    bottom="8"
                    right="8"
                  />
                ) : null}
                <Stack spacing="8">
                  <DataList type="group" dataArray={groups} user={user} />
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
                        if ((result.data.filterGroups?.length ?? 0) === 0) {
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
      </ContentContainer>
    </>
  );
};
