import { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { ReadonlyArray } from 'effect';

import { SortType } from '../../../gql/graphql';
import { NoData } from '../../../shared/design-system';
import {
  AddressFilterField,
  BaseFilters,
  DateRangeField,
  DistanceSelectField,
  EventFiltersValues,
  SortSelectField,
} from '../../../shared/filters';
import { useUrlState } from '../../../shared/hooks/useUrlState';
import { ContentContainer, QueryResult } from '../../../shared/layout';
import { renderEventList } from '../../../shared/renderers';
import { createShowMoreHandler } from '../../../utils/dataFetch';
import { getFilterLocationInput } from '../../../utils/form';
import { getLngLatFromPlaceResult } from '../../../utils/googleMaps';
import { useAuth } from '../../auth';
import { EventsFilterPresetTabs } from '../components';
import { FILTERED_EVENTS } from '../queries';
import { eventFilterUrlSchema } from '../schemas';

interface EventsPageProps {
  location: google.maps.places.PlaceResult | null;
}

const DEFAULT_LIMIT = 8;

export const EventsPage = ({ location }: EventsPageProps) => {
  const { user } = useAuth();
  const [getFilteredEvents, queryResult] = useLazyQuery(FILTERED_EVENTS);
  const [noMoreResults, setNoMoreResults] = useState(false);
  const [params, setParams] = useUrlState(eventFilterUrlSchema);

  const initialStartDate = new Date();
  initialStartDate.setHours(0, 0, 0, 0);

  const initialEndDate = new Date();
  initialEndDate.setDate(initialEndDate.getDate() + 1);
  initialEndDate.setHours(0, 0, 0, 0);

  const initialFilterPreset = params?.filterPreset ?? 'today';

  const initialFilterValues = {
    address: location,
    sports: params?.sports ?? [],
    games: params?.games ?? [],
    other: params?.other ?? [],
    dates: [
      initialFilterPreset === 'today' ? initialStartDate : params?.startDate ?? null,
      initialFilterPreset === 'today' ? initialEndDate : params?.endDate ?? null,
    ] as const,
    distance: (params?.distance ?? 20).toString(),
    sortBy: SortType.DateStart,
    filterPreset: initialFilterPreset,
  };

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
  }, []);

  const handleFilterSubmit = async ({ address, dates, distance, ...values }: EventFiltersValues) => {
    setNoMoreResults(false);
    setParams({
      ...(address ? getLngLatFromPlaceResult(address) : {}),
      startDate: dates[0],
      endDate: dates[1],
      distance: parseInt(distance),
      ...values,
    });
    await fetchFilteredEvents({ address, dates, distance, ...values }, DEFAULT_LIMIT);
  };

  return (
    <BaseFilters<EventFiltersValues>
      defaultValues={initialFilterValues}
      handleSubmit={handleFilterSubmit}
      createResetHandler={(reset) => () => {
        reset({
          dates: [null, null],
          distance: '20',
          sortBy: SortType.DateStart,
          sports: [],
          games: [],
          other: [],
        });
      }}
      filterFields={
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
      addressFilterField={
        <AddressFilterField
          preAddressText="Events in"
          address={location}
          handleFilterSubmit={handleFilterSubmit}
          spacing={0}
        />
      }
      filterPresets={
        user ? (
          <EventsFilterPresetTabs
            user={user}
            currentFilterPreset={params?.filterPreset ?? initialFilterValues.filterPreset}
            handleFilterSubmit={handleFilterSubmit}
          />
        ) : null
      }
    >
      <ContentContainer>
        <QueryResult
          queryName="filterEvents"
          queryResult={queryResult}
          render={renderEventList((events) => ({
            user,
            noMoreResults,
            handleShowMore:
              events.length >= DEFAULT_LIMIT
                ? createShowMoreHandler({
                    queryResult,
                    queryName: 'filterEvents',
                    offset: events.length,
                    onNoMoreResults: () => {
                      setNoMoreResults(true);
                    },
                  })
                : undefined,
            withMap: true,
          }))}
          renderOnNoData={<NoData description="Try changing your filter options to find more events." />}
        />
      </ContentContainer>
    </BaseFilters>
  );
};

