import { Client } from '@googlemaps/google-maps-services-js';
import { DataSourceKnex } from '@nic-jennings/sql-datasource';
import { GraphQLError } from 'graphql/error';

import { GOOGLE_API_KEY } from '../../config';
import { LocationInputWithoutCoords } from '../../types';
import { createLocationInput } from '../../utils/helpers';

export const locationsDataSource = (db: { query: DataSourceKnex; write: DataSourceKnex }) => ({
  createLocation: async (location: LocationInputWithoutCoords, googleMapsClient: Client) => {
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

    const dbLocationResponse = await db
      .write('Location')
      .insert(createLocationInput({ ...location, latitude: lat, longitude: lng }));

    if (!dbLocationResponse[0]) {
      throw new GraphQLError(`Error while creating Location!`);
    }

    return dbLocationResponse[0];
  },

  updateLocation: async (location: LocationInputWithoutCoords, googleMapsClient: Client) => {
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

    const dbLocationResponse = await db
      .write('Location')
      .where('id', location.id)
      .update(createLocationInput({ ...location, latitude: lat, longitude: lng }));

    if (!dbLocationResponse) {
      throw new GraphQLError(`Error while updating location!`);
    }
  },
});
