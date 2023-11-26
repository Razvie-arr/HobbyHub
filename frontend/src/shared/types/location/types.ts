import { DocumentType } from '../../../gql';

import { LocationFragment, LocationFragmentType } from './fragments';

export type LocationData = DocumentType<typeof LocationFragment>;

export interface WithLocation {
  location: LocationData;
}

export interface WithLocationFragment {
  location: LocationFragmentType;
}

