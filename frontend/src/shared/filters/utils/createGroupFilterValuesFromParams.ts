import { GroupSortType } from '../../../gql/graphql';
import { useFilterSearchParams } from '../hooks';
import { GroupFilterPreset } from '../types';

export const createGroupFilterValuesFromParams = (
  params: ReturnType<typeof useFilterSearchParams<GroupFilterPreset, GroupSortType>>['params'],
) => ({
  filterPreset: params.filterPreset,
  sports: params.sports,
  games: params.games,
  other: params.other,
  address: null as google.maps.places.PlaceResult | null,
  distance: params.distance ?? '20',
  sortBy: params.sortBy ?? GroupSortType.Distance,
});

