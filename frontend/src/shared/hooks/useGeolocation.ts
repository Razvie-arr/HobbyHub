import { useEffect, useState } from 'react';

export const useGeolocation = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [geolocation, setGeolocation] = useState<GeolocationPosition>();
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setGeolocation(position);
      });
    }
    setIsLoading(false);
  }, [geolocation]);
  return { geolocation, isLoading };
};

