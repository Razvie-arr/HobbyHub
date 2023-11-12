import { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { Button, Center, Flex, Spinner, Stack } from '@chakra-ui/react';
import { Option, pipe, ReadonlyArray } from 'effect';

import { SortType } from '../../../gql/graphql';
import { DataList } from '../../../shared/design-system';
import { DataMapButton } from '../../../shared/design-system/organisms/DataMap';
import { createEventFilterValuesFromParams, EventFilters, EventFiltersValues } from '../../../shared/filters';
import { useFilterSearchParams } from '../../../shared/filters/hooks';
import { useLngLatGeocoding } from '../../../shared/hooks/useLngLatGeocoding';
import { ContentContainer, QueryResult } from '../../../shared/layout';
import { getEventFragmentData } from '../../../shared/types';
import { useAuth } from '../../auth';
import { FILTERED_EVENTS } from '../queries';

const callIfFunction = (f: number | (() => number)) => (typeof f === 'number' ? f : f());

export const EventsPageContainer = () => {
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
    <EventsPage location={location} />
  );
};

interface EventsPageProps {
  location: ReturnType<typeof useLngLatGeocoding>['location'];
}

const DEFAULT_LIMIT = 8;

export const EventsPage = ({ location }: EventsPageProps) => {
  const { user } = useAuth();
  const [getFilteredEvents, queryResult] = useLazyQuery(FILTERED_EVENTS);
  const { params } = useFilterSearchParams<SortType>();

  const defaultFilterValues = { ...createEventFilterValuesFromParams(params), address: location };

  const [filterValues, setFilterValues] = useState(defaultFilterValues);
  const [noMoreResults, setNoMoreResults] = useState(false);

  const fetchFilteredEvents = async (values: EventFiltersValues, ownLimit: number) => {
    const [startDate, endDate] = values.dates;
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

    const result = await getFilteredEvents({
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
      <EventFilters
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
            const eventFragments = data.filterEvents;
            if (!eventFragments) {
              return null;
            }
            const events = eventFragments.map(getEventFragmentData);
            return (
              <>
                {ReadonlyArray.isNonEmptyArray(events) ? (
                  <DataMapButton
                    mapInfos={{ user, type: 'event', dataArray: events }}
                    position="fixed"
                    bottom="8"
                    right="8"
                  />
                ) : null}
                <Stack spacing="8">
                  <DataList type="event" dataArray={events} user={user} />
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
                        if ((result.data.filterEvents?.length ?? 0) === 0) {
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
