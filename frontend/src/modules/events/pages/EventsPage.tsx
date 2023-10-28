import { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { Button, Center, Stack } from '@chakra-ui/react';
import { Option, pipe, ReadonlyArray } from 'effect';

import { createFilterValuesFromParams, MainFilters, MainFiltersValues } from '../../../shared/filters';
import { useFilterSearchParams } from '../../../shared/filters/hooks';
import { useLngLatGeocoding } from '../../../shared/hooks/useLngLatGeocoding';
import { ContentContainer, QueryResult } from '../../../shared/layout';
import { EventsMapButton, EventsSection } from '../components';
import { toFragmentData } from '../fragments';
import { FILTERED_EVENTS } from '../queries';

const callIfFunc = (f: number | (() => number)) => (typeof f === 'number' ? f : f());

export const EventsPage = () => {
  const [getFilteredEvents, queryResult] = useLazyQuery(FILTERED_EVENTS);
  const { params, noParams } = useFilterSearchParams();

  const location = useLngLatGeocoding({ lng: params.lng, lat: params.lat });
  const [filterValues, setFilterValues] = useState({ ...createFilterValuesFromParams(params), address: location });

  const [limit, setLimit] = useState(4);

  const fetchData = async () => {
    const { lat, lng, distance } = params;
    const filterLocation =
      lat && lng && distance
        ? {
            latitude: lat,
            longitude: lng,
            distance: parseInt(distance),
          }
        : undefined;
    const startDate = params.startDate ? new Date(params.startDate) : undefined;
    const endDate = params.startDate ? new Date(params.startDate) : undefined;
    const eventTypeIds = [...params.sports, ...params.games, ...params.other];
    await getFilteredEvents({
      variables: {
        filterLocation,
        startDatetime: startDate?.toISOString(),
        endDatetime: endDate?.toISOString(),
        eventTypeIds: ReadonlyArray.isNonEmptyArray(eventTypeIds) ? eventTypeIds : undefined,
        limit,
        offset: 0,
        sort: params.sortBy,
      },
    });
    setLimit(8);
  };

  useEffect(() => {
    if (location && filterValues.address === null) {
      setFilterValues((values) => ({ ...values, address: location }));
    }
  }, [location, filterValues]);

  useEffect(() => {
    if (!queryResult.data && !queryResult.error && !noParams) {
      void fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchFilteredEvents = async (values: MainFiltersValues, ownLimit?: number) => {
    const [startDate, endDate] = values.dates;
    const filterLocation = pipe(
      values.address?.geometry?.location,
      Option.fromNullable,
      Option.map(({ lat, lng }) => ({
        latitude: callIfFunc(lat),
        longitude: callIfFunc(lng),
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
        limit: ownLimit ?? limit,
        offset: 0,
        sort: values.sortBy,
      },
    });
  };

  return (
    <>
      <MainFilters
        handleSubmit={async (values) => {
          await fetchFilteredEvents(values, 4);
          setFilterValues(values);
        }}
      />
      <ContentContainer>
        <QueryResult
          queryResult={queryResult}
          render={(data) => {
            const eventFragments = data.filterEvents;
            if (!eventFragments) {
              return null;
            }
            const events = eventFragments.map(toFragmentData);
            return (
              <>
                <EventsMapButton events={events} position="fixed" bottom="8" right="8" />
                <Stack spacing="8">
                  <EventsSection events={events} />
                </Stack>
                <Center
                  mb="16"
                  onClick={async () => {
                    await fetchFilteredEvents(filterValues).then();
                    setLimit((queryResult.data?.filterEvents?.length ?? 0) + 4);
                  }}
                >
                  <Button colorScheme="purple">Show more</Button>
                </Center>
              </>
            );
          }}
        />
      </ContentContainer>
    </>
  );
};

