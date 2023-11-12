import { GroupSortType, SortType } from '../../gql/graphql';

interface CommonFiltersValues {
  sports: number[];
  games: number[];
  other: number[];
  address: google.maps.places.PlaceResult | null;
  distance: string;
}

export interface EventFiltersValues extends CommonFiltersValues {
  dates: readonly [Date | null, Date | null];
  sortBy: SortType;
}

export interface GroupFiltersValues extends CommonFiltersValues {
  sortBy: GroupSortType;
}

