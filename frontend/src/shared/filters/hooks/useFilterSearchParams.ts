import { flow, Number, Option, ReadonlyArray, String } from 'effect';
import { useSearchParams } from 'react-router-dom';

import { useAuth } from '../../../modules/auth';

const processArraySearchParam = flow(
  (value: string | null) => value,
  Option.fromNullable,
  Option.map(
    flow(
      String.split(','),
      ReadonlyArray.filter(String.isNonEmpty),
      ReadonlyArray.map((value) => parseInt(value, 10)),
    ),
  ),
  Option.getOrElse((): number[] => []),
);

export const useFilterSearchParams = <F, S>(initialFilterPreset?: F, initialSortBy?: S) => {
  const { user } = useAuth();
  const [params, setParams] = useSearchParams();

  const lng = params.get('lng');
  const lat = params.get('lat');

  const initialStartDate = new Date();
  initialStartDate.setHours(0, 0, 0, 0);

  const initialEndDate = new Date();
  initialEndDate.setDate(initialEndDate.getDate() + 1);
  initialEndDate.setHours(0, 0, 0, 0);

  const filterPreset = (params.get('filterPreset') ?? (user ? initialFilterPreset : 'none')) as F;

  const updatedParams = {
    filterPreset: filterPreset,
    sports: processArraySearchParam(params.get('sports')),
    games: processArraySearchParam(params.get('games')),
    other: processArraySearchParam(params.get('other')),
    lng: lng ? parseFloat(lng) : null,
    lat: lat ? parseFloat(lat) : null,
    startDate: params.get('startDate') ?? (user && filterPreset === 'today' ? initialStartDate : null),
    endDate: params.get('endDate') ?? (user && filterPreset === 'today' ? initialEndDate : null),
    distance: params.get('distance'),
    sortBy: (params.get('sortBy') ?? (user ? initialSortBy : null)) as S,
  };

  return {
    params: updatedParams,
    setParams: (values: {}, { deleteKeys }: { deleteKeys?: string[] } = {}) => {
      setParams((prevParams) => {
        if (deleteKeys) {
          deleteKeys.forEach((key) => prevParams.delete(key));
        }
        Object.entries(values)
          .filter(([_, value]) => value !== '')
          .filter(([_, value]) => value !== null)
          .filter(([_, value]) => value !== undefined)
          .forEach(([fieldName, value]) => {
            if (fieldName === 'address') {
              const place = value as google.maps.places.PlaceResult;

              // eslint-disable-next-line @typescript-eslint/unbound-method
              const placeLng = place.geometry?.location?.lng;
              // eslint-disable-next-line @typescript-eslint/unbound-method
              const placeLat = place.geometry?.location?.lat;

              const finalPlaceLng = Number.isNumber(placeLng) ? placeLng : placeLng ? placeLng() : undefined;
              const finalPlaceLat = Number.isNumber(placeLat) ? placeLat : placeLat ? placeLat() : undefined;
              if (finalPlaceLng && finalPlaceLat) {
                prevParams.set('lng', finalPlaceLng.toString());
                prevParams.set('lat', finalPlaceLat.toString());
              }
            } else if (['sports', 'games', 'other'].includes(fieldName)) {
              // @ts-expect-error
              prevParams.set(fieldName, value.toString());
            } else if (fieldName === 'dates') {
              // @ts-expect-error
              const [startDate, endDate] = value;
              if (startDate) {
                prevParams.set('startDate', startDate);
              } else {
                prevParams.delete('startDate');
              }
              if (startDate) {
                prevParams.set('endDate', endDate);
              } else {
                prevParams.delete('endDate');
              }
            } else {
              prevParams.set(fieldName, value as string);
            }
          });
        return prevParams;
      });
    },
    noParams:
      ReadonlyArray.isEmptyArray(updatedParams.sports) &&
      ReadonlyArray.isEmptyArray(updatedParams.games) &&
      ReadonlyArray.isEmptyArray(updatedParams.other) &&
      updatedParams.lng === null &&
      updatedParams.lat === null &&
      updatedParams.startDate === null &&
      updatedParams.endDate === null &&
      updatedParams.distance === null &&
      updatedParams.sortBy === null,
  };
};

