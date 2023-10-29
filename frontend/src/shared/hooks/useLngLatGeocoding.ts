import { useEffect, useState } from 'react';

interface LngLat {
  lng?: number | null;
  lat?: number | null;
}

export const useLngLatGeocoding = ({ lng, lat }: LngLat) => {
  const [isLoading, setIsLoading] = useState(true);
  const [location, setLocation] = useState<google.maps.places.PlaceResult | null>(null);
  useEffect(() => {
    const getPlace = async () => {
      if (lng && lat) {
        const result = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&result_type=street_address&key=${
            import.meta.env.VITE_GOOGLE_API_KEY
          }`,
        );
        const json = await result.json();
        setLocation(json.results[0] ?? null);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    };
    void getPlace();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return { isLoading, location };
};

