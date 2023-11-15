import { useEffect } from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';

import { route } from '../../../route';
import { useAuth } from '../../auth';

export const DefaultEventsPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  useEffect(() => {
    if (user && user.event_types.length > 0 && user.location) {
      const startDate = new Date();
      const endDate = new Date();
      endDate.setDate(endDate.getDate() + 1);
      navigate({
        pathname: route.events(),
        search: createSearchParams({
          filterPreset: 'today',
          lat: user.location.latitude.toString(),
          lng: user.location.longitude.toString(),
          startDate: startDate.toLocaleDateString(),
          endDate: endDate.toLocaleDateString(),
        }).toString(),
      });
    } else {
      navigate({
        pathname: route.events(),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

