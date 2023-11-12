import { Client } from '@googlemaps/google-maps-services-js';

export const getGoogleMapsClient = () => {
  const client = new Client({});
  return client;
};
