import { useEffect, useState } from 'react';

const getGeolocationPermissionStatus = async () => navigator.permissions.query({ name: 'geolocation' });

export const useGeolocation = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [permission, setPermission] = useState<PermissionState | null>(null);
  const [geolocation, setGeolocation] = useState<GeolocationPosition>();

  void getGeolocationPermissionStatus().then((permissionStatus) => {
    setPermission(permissionStatus.state);
    permissionStatus.onchange = () => {
      setPermission(permissionStatus.state);
    };
  });

  useEffect(() => {
    if (permission === 'granted' || permission === 'denied') {
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

