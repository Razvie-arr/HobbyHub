import { useEffect, useState } from 'react';

export const useGeolocation = () => {
  const [geolocation, setGeolocation] = useState<GeolocationPosition>();
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setGeolocation(position);
      });
    }
  }, []);
  return geolocation;
};

