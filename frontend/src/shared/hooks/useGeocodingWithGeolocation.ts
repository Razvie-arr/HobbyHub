import { useEffect, useState } from 'react';

import { latLngSchema } from '../schemas';

import { useGeolocation } from './useGeolocation';
import { useUrlState } from './useUrlState';

export const useGeocodingWithGeolocation = () => {
  const [params] = useUrlState(latLngSchema);
  const { geolocation } = useGeolocation();

  const [isLoading, setIsLoading] = useState(true);
  const [location, setLocation] = useState<google.maps.places.PlaceResult | null>(null);

  useEffect(() => {
    const lat = params?.lat ?? geolocation?.coords.latitude;
    const lng = params?.lng ?? geolocation?.coords.longitude;
    const getPlace = async () => {
      if (lat && lng) {
        const result = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${
            import.meta.env.VITE_GOOGLE_API_KEY
          }`,
        );
        const json = await result.json();
        setLocation(json.results[0] ?? null);
      }
    };
    void getPlace();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [geolocation]);

  useEffect(() => {
    if (location) {
      setIsLoading(false);
    }
  }, [setIsLoading, location]);

  return { isLoading, location };
};

