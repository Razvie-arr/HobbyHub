import { GroupSortType } from '../../../gql/graphql';
import { useFilterSearchParams } from '../hooks';

export const createGroupFilterValuesFromParams = (
  params: ReturnType<typeof useFilterSearchParams<GroupSortType>>['params'],
) => ({
  sports: params.sports,
  games: params.games,
  other: params.other,
  address: null as google.maps.places.PlaceResult | null,
  distance: '20',
  sortBy: params.sortBy ?? GroupSortType.Distance,
});
