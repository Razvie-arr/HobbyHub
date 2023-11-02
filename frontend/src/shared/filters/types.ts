import { SortType } from '../../gql/graphql';

export interface MainFiltersValues {
  sports: number[];
  games: number[];
  other: number[];
  address: google.maps.places.PlaceResult | null;
  distance: string;
  dates: readonly [Date | null, Date | null];
  sortBy: SortType;
}

