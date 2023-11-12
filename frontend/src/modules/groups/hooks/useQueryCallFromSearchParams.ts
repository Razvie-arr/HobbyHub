import { useLazyQuery } from '@apollo/client';
import { ReadonlyArray } from 'effect';

import { useFilterSearchParams } from '../../../shared/filters/hooks';
import { FILTERED_EVENTS } from '../queries';

export const useQueryCallFromSearchParams = () => {
  const [getFilteredEvents] = useLazyQuery(FILTERED_EVENTS);
  const { params } = useFilterSearchParams();
  return async () => {
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
        limit: 4,
        offset: 0,
        sort: params.sortBy,
      },
    });
  };
};
