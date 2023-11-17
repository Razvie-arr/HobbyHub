import { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { Stack } from '@chakra-ui/react';
import { Option, pipe, ReadonlyArray } from 'effect';

import { GroupSortType } from '../../../gql/graphql';
import { DataList } from '../../../shared/design-system';
import {
  AddressFilterBar,
  createGroupFilterValuesFromParams,
  GroupFilters,
  GroupFiltersValues,
} from '../../../shared/filters';
import { useFilterSearchParams } from '../../../shared/filters/hooks';
import { GroupFilterPreset } from '../../../shared/filters/types';
import { ContentContainer, QueryResult } from '../../../shared/layout';
import { getGroupFragmentData } from '../../../shared/types';
import { useAuth } from '../../auth';
import { GroupsFilterPresetTabs } from '../components';
import { FILTERED_GROUPS } from '../queries';

const callIfFunction = (f: number | (() => number)) => (typeof f === 'number' ? f : f());

interface EventsPageProps {
  location: google.maps.places.PlaceResult | null;
}

const DEFAULT_LIMIT = 8;

export const GroupsPage = ({ location }: EventsPageProps) => {
  const { user } = useAuth();
  const [getFilteredGroups, queryResult] = useLazyQuery(FILTERED_GROUPS);
  const [noMoreResults, setNoMoreResults] = useState(false);
  const { params } = useFilterSearchParams<GroupFilterPreset, GroupSortType>();

  const initialFilterValues = { ...createGroupFilterValuesFromParams(params), address: location };

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
    if (!queryResult.data && !queryResult.error) {
      void fetchFilteredEvents(initialFilterValues, DEFAULT_LIMIT);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <GroupFilters
      defaultValues={initialFilterValues}
      handleSubmit={async (values) => {
        await fetchFilteredEvents(values, DEFAULT_LIMIT);
      }}
      renderAddressBar={(renderProps) => (
        <AddressFilterBar
          address={location}
          onAddressSelected={async (address) => {
            const currentFilterValues = renderProps.getFilterValues();
            await renderProps.handleFilterSubmit({
              ...currentFilterValues,
              address,
            });
          }}
        />
      )}
      renderFilterPresets={(renderProps) => (user ? <GroupsFilterPresetTabs user={user} {...renderProps} /> : null)}
    >
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
              <Stack spacing="8">
                <DataList
                  type="group"
                  dataArray={groups}
                  user={user}
                  noMoreResults={noMoreResults}
                  handleShowMore={async () => {
                    const result = await queryResult.fetchMore({
                      variables: {
                        offset: groups.length,
                      },
                    });
                    if ((result.data.filterGroups?.length ?? 0) === 0) {
                      setNoMoreResults(true);
                    }
                  }}
                />
              </Stack>
            );
          }}
        />
      </ContentContainer>
    </GroupFilters>
  );
};
