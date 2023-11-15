import { Client } from '@googlemaps/google-maps-services-js';
import { GraphQLError } from 'graphql/error';

import { GOOGLE_API_KEY } from '../../../config';
import { SQLDataSource } from '../../../datasource';
import {
  Location,
  LocationInputWithoutCoords,
  QueryLocationByIdArgs,
  QueryLocationsArgs,
  QueryLocationsByIdsArgs,
} from '../../../types/graphqlTypesGenerated';
import { ContextualNullableResolver, ContextualResolver } from '../../../types/types';
import { createLocationInput } from '../../../utils/helpers';

export const locationsResolver: ContextualResolver<Array<Location>, QueryLocationsArgs> = async (
  _,
  { offset, limit },
  { dataSources },
) => await dataSources.sql.locations.getAll(offset, limit);

export const locationByIdResolver: ContextualNullableResolver<Location, QueryLocationByIdArgs> = async (
  _,
  { id },
  { dataSources },
) => await dataSources.sql.locations.getById(id);

export const locationsByIdsResolver: ContextualResolver<Array<Location>, QueryLocationsByIdsArgs> = async (
  _,
  { ids },
  { dataSources },
) => await dataSources.sql.locations.getByIds(ids);

export const createLocation = async (
  location: LocationInputWithoutCoords,
  dataSources: { sql: SQLDataSource },
  googleMapsClient: Client,
) => {
  const geocodeResult = await googleMapsClient.geocode({
    params: {
      address: `${location.street_name} ${location.street_number} ${location.city} ${location.country}`,
      // @ts-expect-error
      key: GOOGLE_API_KEY,
    },
  });

  const firstAddress = geocodeResult.data.results[0];

  if (!firstAddress) {
    throw new GraphQLError(`Error while looking up location coordinates!`);
  }

  const { lat, lng } = firstAddress.geometry.location;

  const dbLocationResponse = await dataSources.sql.db
    .write('Location')
    .insert(createLocationInput({ ...location, latitude: lat, longitude: lng }));

  if (!dbLocationResponse[0]) {
    throw new GraphQLError(`Error while creating Location!`);
  }

  return dbLocationResponse[0];
};

export const updateLocation = async (
  location: LocationInputWithoutCoords,
  dataSources: { sql: SQLDataSource },
  googleMapsClient: Client,
) => {
  const geocodeResult = await googleMapsClient.geocode({
    params: {
      address: `${location.street_name} ${location.street_number} ${location.city} ${location.country}`,
      // @ts-expect-error
      key: GOOGLE_API_KEY,
    },
  });

  const firstAddress = geocodeResult.data.results[0];

  if (!firstAddress) {
    throw new GraphQLError(`Error while looking up location coordinates!`);
  }

  const { lat, lng } = firstAddress.geometry.location;

  const dbLocationResponse = await dataSources.sql.db
    .write('Location')
    .where('id', location.id)
    .update(createLocationInput({ ...location, latitude: lat, longitude: lng }));

  if (!dbLocationResponse) {
    throw new GraphQLError(`Error while updating location!`);
  }
};
