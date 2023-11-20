import { Option, pipe } from 'effect';

import { getAddressGeolocation } from './googleMaps';

const normalizeDateParts = (value: number) => (value < 10 ? `0${value}` : value);

export const getCurrentDateTime = () => {
  const date = new Date();

  const currentMonth = date.getMonth() + 1;
  const monthPart = normalizeDateParts(currentMonth);

  const currentDate = date.getDate();
  const datePart = normalizeDateParts(currentDate);

  const currentHours = date.getHours();
  const hoursPart = normalizeDateParts(currentHours);

  const currentMinutes = date.getMinutes();
  const minutesPart = normalizeDateParts(currentMinutes);

  return `${date.getFullYear()}-${monthPart}-${datePart}T${hoursPart}:${minutesPart}`;
};

export const getFilterLocationInput = (address: google.maps.places.PlaceResult | null, distance: string) =>
  pipe(
    Option.fromNullable(address),
    Option.flatMap(getAddressGeolocation),
    Option.map((geolocation) => ({
      ...geolocation,
      distance: parseInt(distance),
    })),
    Option.getOrUndefined,
  );

