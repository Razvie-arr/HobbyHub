import { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { Stack } from '@chakra-ui/react';
import { ReadonlyArray } from 'effect';

import { SortType } from '../../../gql/graphql';
import { DataList, NoData } from '../../../shared/design-system';
import {
  AddressFilterField,
  BaseFilters,
  createEventFilterValuesFromParams,
  DateRangeField,
  DistanceSelectField,
  EventFilterPreset,
  EventFiltersValues,
  SortSelectField,
  useFilterSearchParams,
} from '../../../shared/filters';
import { ContentContainer, QueryResult } from '../../../shared/layout';
import { getEventFragmentData } from '../../../shared/types';
import { getFilterLocationInput } from '../../../utils/form';
import { useAuth } from '../../auth';
import { EventsFilterPresetTabs } from '../components';
import { FILTERED_EVENTS } from '../queries';

interface EventsPageProps {
  location: google.maps.places.PlaceResult | null;
}

const DEFAULT_LIMIT = 8;

export const EventsPage = ({ location }: EventsPageProps) => {
  const { user } = useAuth();
  const [getFilteredEvents, queryResult] = useLazyQuery(FILTERED_EVENTS);
  const [noMoreResults, setNoMoreResults] = useState(false);
  const { params, setParams } = useFilterSearchParams<EventFilterPreset, SortType>('today', SortType.DateStart);

  const initialFilterValues = { ...createEventFilterValuesFromParams(params), address: location };

  const fetchFilteredEvents = async (values: EventFiltersValues, ownLimit: number) => {
    const [startDate, endDate] = values.dates;
    const eventTypeIds = [...values.sports, ...values.games, ...values.other];

    await getFilteredEvents({
      variables: {
        filterLocation: getFilterLocationInput(values.address, values.distance),
        startDatetime: startDate?.toISOString(),
        endDatetime: endDate?.toISOString(),
        eventTypeIds: ReadonlyArray.isNonEmptyArray(eventTypeIds) ? eventTypeIds : undefined,
        limit: ownLimit,
        offset: 0,
        sort: values.sortBy,
      },
    });
  };

  useEffect(() => {
    if (!queryResult.data && !queryResult.error) {
      void fetchFilteredEvents(initialFilterValues, DEFAULT_LIMIT);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  const handleFilterSubmit = async ({ address, ...values }: EventFiltersValues) => {
    setNoMoreResults(false);
    if (address && 'name' in address) {
      setParams({ address: null, ...values });
      await fetchFilteredEvents({ address: null, ...values }, DEFAULT_LIMIT);
    } else {
      setParams({ address, ...values });
      await fetchFilteredEvents({ address, ...values }, DEFAULT_LIMIT);
    }
  };

  return (
    <BaseFilters<EventFiltersValues>
      defaultValues={initialFilterValues}
      handleSubmit={handleFilterSubmit}
      createResetHandler={({ reset }) =>
        () => {
          reset({
            dates: [null, null],
            distance: '20',
            sortBy: SortType.DateStart,
            sports: [],
            games: [],
            other: [],
          });
        }}
      slotFilterFields={
        <>
          <DateRangeField />
          <DistanceSelectField />
          <SortSelectField>
            <option value={SortType.DateCreated}>Sort by: Date created</option>
            <option value={SortType.DateStart}>Sort by: Date start</option>
            <option value={SortType.Distance}>Sort by: Distance</option>
          </SortSelectField>
        </>
      }
      slotAddressFilterField={
        <AddressFilterField
          preAddressText="Events in"
          address={location}
          handleFilterSubmit={handleFilterSubmit}
          spacing={0}
        />
      }
      slotFilterPresets={
        user ? (
          <EventsFilterPresetTabs
            user={user}
            currentFilterPreset={params.filterPreset}
            handleFilterSubmit={handleFilterSubmit}
          />
        ) : null
      }
    >
      <ContentContainer>
        <QueryResult
          queryName="filterEvents"
          queryResult={queryResult}
          render={(eventFragments) => {
            const events = eventFragments.map(getEventFragmentData);
            return (
              <Stack spacing="8">
                <DataList
                  type="event"
                  dataArray={events}
                  user={user}
                  noMoreResults={noMoreResults}
                  handleShowMore={async () => {
                    const result = await queryResult.fetchMore({
                      variables: {
                        offset: events.length,
                      },
                    });
                    if ((result.data.filterEvents?.length ?? 0) === 0) {
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

