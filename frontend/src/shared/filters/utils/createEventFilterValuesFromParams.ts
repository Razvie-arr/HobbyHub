import { SortType } from '../../../gql/graphql';
import { useFilterSearchParams } from '../hooks';

export const createEventFilterValuesFromParams = (
  params: ReturnType<typeof useFilterSearchParams<SortType>>['params'],
) => ({
  sports: params.sports,
  games: params.games,
  other: params.other,
  address: null as google.maps.places.PlaceResult | null,
  distance: '20',
  dates: (params.startDate && params.endDate
    ? ([new Date(params.startDate), new Date(params.endDate)] as const)
    : ([null, null] as const)) as readonly [Date | null, Date | null],
  sortBy: params.sortBy ?? SortType.Date,
});
