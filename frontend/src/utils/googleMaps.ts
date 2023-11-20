import { flow, Option } from 'effect';

const callIfFunction = (f: number | (() => number)) => (typeof f === 'number' ? f : f());

export const getAddressGeolocation = flow(
  (address: google.maps.places.PlaceResult) => address.geometry?.location,
  Option.fromNullable,
  Option.map(({ lat, lng }) => ({
    latitude: callIfFunction(lat),
    longitude: callIfFunction(lng),
  })),
);

export const getAddressComponents = flow(
  (addressComponents?: google.maps.places.PlaceResult['address_components'] | null) => addressComponents,
  Option.fromNullable,
  Option.map((value) => {
    const country = value.find(({ types }) => types.includes('country'));
    const city = value.find(({ types }) => types.includes('administrative_area_level_2'));
    const cityFallback = value.find(({ types }) => types.includes('postal_town'));
    const streetName = value.find(({ types }) => types.includes('route'));
    const streetNumber = value.find(({ types }) => types.includes('street_number'));
    const premise = value.find(({ types }) => types.includes('premise'));
    return { country, city, cityFallback, streetName, streetNumber, premise };
  }),
);

export const getAddressName = flow(
  (addressComponents?: google.maps.places.PlaceResult['address_components'] | null) => addressComponents,
  getAddressComponents,
  Option.map((value) => {
    const city = value.city?.short_name;
    const cityFallback = value.cityFallback?.short_name;
    const streetName = value.streetName?.short_name;
    const streetNumber = value.streetNumber?.short_name;
    const premise = value.premise?.short_name;
    return `${streetName ?? ''}${streetNumber || premise ? ' ' : ''}${
      premise && streetNumber ? `${premise}/${streetNumber}` : premise ? premise : streetNumber ? streetNumber : ''
    }${city || cityFallback ? `, ${city || cityFallback}` : ''}`;
  }),
  Option.getOrElse(() => ''),
);

