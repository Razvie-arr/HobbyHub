import { useEffect, useState } from 'react';

interface Geolocation {
  coords: Pick<GeolocationPosition['coords'], 'latitude' | 'longitude'>;
}

const getGeolocationPermissionStatus = async () => navigator.permissions.query({ name: 'geolocation' });

export const useGeolocation = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [permission, setPermission] = useState<PermissionState | null>(null);
  const [geolocation, setGeolocation] = useState<Geolocation>();

  void getGeolocationPermissionStatus().then((permissionStatus) => {
    setPermission(permissionStatus.state);
    permissionStatus.onchange = () => {
      setPermission(permissionStatus.state);
    };
  });

  useEffect(() => {
    if (permission === 'granted' || permission === 'denied') {
      if (permission === 'denied') {
        setGeolocation({ coords: { latitude: 50.073658, longitude: 14.41854 } });
      }
      setIsLoading(false);
    }
  }, [permission]);

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setGeolocation(position);
      });
    }
  }, []);

  return { geolocation, isLoading };
};

