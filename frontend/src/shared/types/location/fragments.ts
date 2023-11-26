import { FragmentType, getFragmentData, gql } from '../../../gql';

export const LocationFragment = gql(/* GraphQL */ `
  fragment LocationFragment on Location {
    id
    country
    city
    street_name
    street_number
    longitude
    latitude
  }
`);

export type LocationFragmentType = FragmentType<typeof LocationFragment>;

export const getLocationFragmentData = (event: LocationFragmentType) => getFragmentData(LocationFragment, event);

