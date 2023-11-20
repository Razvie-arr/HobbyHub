import { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { Stack } from '@chakra-ui/react';
import { ReadonlyArray } from 'effect';

import { GroupSortType } from '../../../gql/graphql';
import { DataList, NoData } from '../../../shared/design-system';
import {
  AddressFilterBar,
  BaseFilters,
  createGroupFilterValuesFromParams,
  GroupFiltersValues,
} from '../../../shared/filters';
import { DistanceSelectField } from '../../../shared/filters/fields';
import { useFilterSearchParams } from '../../../shared/filters/hooks';
import { GroupFilterPreset } from '../../../shared/filters/types';
import { SelectField } from '../../../shared/forms';
import { ContentContainer, QueryResult } from '../../../shared/layout';
import { getGroupFragmentData } from '../../../shared/types';
import { getFilterLocationInput } from '../../../utils/form';
import { useAuth } from '../../auth';
import { GroupsFilterPresetTabs } from '../components';
import { FILTERED_GROUPS } from '../queries';

interface EventsPageProps {
  location: google.maps.places.PlaceResult | null;
}

const DEFAULT_LIMIT = 8;

export const GroupsPage = ({ location }: EventsPageProps) => {
  const { user } = useAuth();
  const [getFilteredGroups, queryResult] = useLazyQuery(FILTERED_GROUPS);
  const [noMoreResults, setNoMoreResults] = useState(false);
  const { params, setParams } = useFilterSearchParams<GroupFilterPreset, GroupSortType>(
    'nearby',
    GroupSortType.Distance,
  );

  const initialFilterValues = { ...createGroupFilterValuesFromParams(params), address: location };

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

  const handleFilterSubmit = async ({ address, ...values }: GroupFiltersValues) => {
    setNoMoreResults(false);
    if (address && 'name' in address) {
      setParams({ address: null, ...values });
      await fetchFilteredGroups({ address: null, ...values }, DEFAULT_LIMIT);
    } else {
      setParams({ address, ...values });
      await fetchFilteredGroups({ address, ...values }, DEFAULT_LIMIT);
    }
  };

  return (
    <BaseFilters<GroupFiltersValues>
      defaultValues={initialFilterValues}
      handleSubmit={handleFilterSubmit}
      createResetHandler={({ reset }) =>
        () => {
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
          <SelectField
            name="sortBy"
            formControlProps={{ flexBasis: { base: 'none', lg: '13%' } }}
            bg="white"
            borderRadius="full"
            size={{ base: 'sm', md: 'md' }}
          >
            <option value={GroupSortType.Distance}>Sort by: Distance</option>
            <option value={GroupSortType.Name}>Sort by: Name</option>
          </SelectField>
        </>
      }
      renderAddressBar={(renderProps) => (
        <AddressFilterBar
          preAddressText="Groups in"
          address={location}
          onAddressSelected={async (address) => {
            await handleFilterSubmit({
              ...renderProps.getFilterValues(),
              address,
            });
          }}
        />
      )}
      renderFilterPresets={() =>
        user ? (
          <GroupsFilterPresetTabs
            user={user}
            currentFilterPreset={params.filterPreset}
            handleFilterSubmit={handleFilterSubmit}
          />
        ) : null
      }
    >
      <ContentContainer>
        <QueryResult
          queryResult={queryResult}
          queryName="filterGroups"
          render={(groupFragments) => {
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
          renderOnNoData={<NoData description="Try changing your filter options to find more events." />}
        />
      </ContentContainer>
    </BaseFilters>
  );
};

