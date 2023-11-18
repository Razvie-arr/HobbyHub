import { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { Stack } from '@chakra-ui/react';
import { flow, Option, pipe, ReadonlyArray } from 'effect';

import { SortType } from '../../../gql/graphql';
import { DataList } from '../../../shared/design-system';
import {
  AddressFilterBar,
  createEventFilterValuesFromParams,
  EventFilterPreset,
  EventFilters,
  EventFiltersValues,
} from '../../../shared/filters';
import { useFilterSearchParams } from '../../../shared/filters/hooks';
import { ContentContainer, QueryResult } from '../../../shared/layout';
import { getEventFragmentData } from '../../../shared/types';
import { useAuth } from '../../auth';
import { EventsFilterPresetTabs } from '../components';
import { FILTERED_EVENTS } from '../queries';

const callIfFunction = (f: number | (() => number)) => (typeof f === 'number' ? f : f());

interface EventsPageProps {
  location: google.maps.places.PlaceResult | null;
}

const DEFAULT_LIMIT = 8;

const getAddressGeolocation = flow(
  (address: google.maps.places.PlaceResult) => address.geometry?.location,
  Option.fromNullable,
  Option.map(({ lat, lng }) => ({
    latitude: callIfFunction(lat),
    longitude: callIfFunction(lng),
  })),
);

export const EventsPage = ({ location }: EventsPageProps) => {
  const { user } = useAuth();
  const [getFilteredEvents, queryResult] = useLazyQuery(FILTERED_EVENTS);
  const [noMoreResults, setNoMoreResults] = useState(false);
  const { params } = useFilterSearchParams<EventFilterPreset, SortType>();

  const initialFilterValues = { ...createEventFilterValuesFromParams(params), address: location };

  const fetchFilteredEvents = async (values: EventFiltersValues, ownLimit: number) => {
    const [startDate, endDate] = values.dates;
    const filterLocation = pipe(
      Option.fromNullable(values.address),
      Option.flatMap(getAddressGeolocation),
      Option.map((geolocation) => ({
        ...geolocation,
        distance: parseInt(values.distance),
      })),
      Option.getOrUndefined,
    );
    const eventTypeIds = [...values.sports, ...values.games, ...values.other];

    await getFilteredEvents({
      variables: {
        filterLocation: filterLocation,
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

  return (
    <EventFilters
      defaultValues={initialFilterValues}
      handleSubmit={async (values) => {
        setNoMoreResults(false);
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
          spacing={0}
        />
      )}
      renderFilterPresets={(renderProps) => (user ? <EventsFilterPresetTabs user={user} {...renderProps} /> : null)}
    >
      <ContentContainer>
        <QueryResult
          queryResult={queryResult}
          queryName="filterEvents"
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
        />
      </ContentContainer>
    </EventFilters>
  );
};

