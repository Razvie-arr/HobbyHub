import { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { ReadonlyArray } from 'effect';

import { GroupSortType } from '../../../gql/graphql';
import { NoData } from '../../../shared/design-system';
import {
  AddressFilterField,
  BaseFilters,
  DistanceSelectField,
  GroupFiltersValues,
  SortSelectField,
} from '../../../shared/filters';
import { useUrlState } from '../../../shared/hooks/useUrlState';
import { ContentContainer, QueryResult } from '../../../shared/layout';
import { renderGroupList } from '../../../shared/renderers/renderGroupList';
import { createShowMoreHandler } from '../../../utils/dataFetch';
import { getFilterLocationInput } from '../../../utils/form';
import { getLngLatFromPlaceResult } from '../../../utils/googleMaps';
import { useAuth } from '../../auth';
import { GroupsFilterPresetTabs } from '../components';
import { FILTERED_GROUPS } from '../queries';
import { groupFilterUrlSchema } from '../schemas';

interface EventsPageProps {
  location: google.maps.places.PlaceResult | null;
}

const DEFAULT_LIMIT = 8;

export const GroupsPage = ({ location }: EventsPageProps) => {
  const { user } = useAuth();
  const [getFilteredGroups, queryResult] = useLazyQuery(FILTERED_GROUPS);
  const [noMoreResults, setNoMoreResults] = useState(false);
  const [params, setParams] = useUrlState(groupFilterUrlSchema);

  const initialFilterValues = {
    address: location,
    sports: params?.sports ?? [],
    games: params?.games ?? [],
    other: params?.other ?? [],
    distance: (params?.distance ?? 20).toString(),
    sortBy: GroupSortType.Name,
    filterPreset: params?.filterPreset ?? 'nearby',
  };

  const fetchFilteredGroups = async (values: GroupFiltersValues, ownLimit: number) => {
    const eventTypeIds = [...values.sports, ...values.games, ...values.other];

    const result = await getFilteredGroups({
      variables: {
        filterLocation: getFilterLocationInput(values.address, values.distance),
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
      void fetchFilteredGroups(initialFilterValues, DEFAULT_LIMIT);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  const handleFilterSubmit = async ({ address, distance, ...values }: GroupFiltersValues) => {
    setNoMoreResults(false);
    setParams({
      ...(address ? getLngLatFromPlaceResult(address) : {}),
      distance: parseInt(distance),
      ...values,
    });
    await fetchFilteredGroups({ address, distance, ...values }, DEFAULT_LIMIT);
  };

  return (
    <BaseFilters<GroupFiltersValues>
      defaultValues={initialFilterValues}
      handleSubmit={handleFilterSubmit}
      createResetHandler={(reset) => () => {
        reset({
          distance: '20',
          sortBy: GroupSortType.Distance,
          sports: [],
          games: [],
          other: [],
        });
      }}
      filterFields={
        <>
          <DistanceSelectField />
          <SortSelectField>
            <option value={GroupSortType.Distance}>Sort by: Distance</option>
            <option value={GroupSortType.Name}>Sort by: Name</option>
          </SortSelectField>
        </>
      }
      addressFilterField={
        <AddressFilterField<GroupFiltersValues>
          preAddressText="Groups in"
          address={location}
          handleFilterSubmit={handleFilterSubmit}
        />
      }
      filterPresets={
        user ? (
          <GroupsFilterPresetTabs
            user={user}
            currentFilterPreset={params?.filterPreset ?? initialFilterValues.filterPreset}
            handleFilterSubmit={handleFilterSubmit}
          />
        ) : null
      }
    >
      <ContentContainer>
        <QueryResult
          queryResult={queryResult}
          queryName="filterGroups"
          render={renderGroupList((groups) => ({
            noMoreResults,
            handleShowMore: createShowMoreHandler({
              queryResult,
              queryName: 'filterGroups',
              offset: groups.length,
              onNoMoreResults: () => {
                setNoMoreResults(true);
              },
            }),
            withMap: true,
          }))}
          renderOnNoData={<NoData description="Try changing your filter options to find more events." />}
        />
      </ContentContainer>
    </BaseFilters>
  );
};

