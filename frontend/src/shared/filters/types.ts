import { GroupSortType, SortType } from '../../gql/graphql';

interface CommonFiltersValues {
  sports: number[];
  games: number[];
  other: number[];
  address: google.maps.places.PlaceResult | null;
  distance: string;
}

export type EventFilterPreset = 'today' | 'recommended' | 'newlyAdded' | 'none';

export interface EventFiltersValues extends CommonFiltersValues {
  filterPreset: EventFilterPreset;
  dates: readonly [Date | null, Date | null];
  sortBy: SortType;
}

export type GroupFilterPreset = 'nearby' | 'recommended' | 'none';

export interface GroupFiltersValues extends CommonFiltersValues {
  filterPreset: GroupFilterPreset;
  sortBy: GroupSortType;
}
