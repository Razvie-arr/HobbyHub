import { useEffect } from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';

import { route } from 'src/route';

import { getLocationFragmentData } from '../../../shared/types';
import { useAuth } from '../../auth';

export const DefaultEventsPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  useEffect(() => {
    if (user && user.event_types.length > 0 && user.location) {
      const startDate = new Date();
      const endDate = new Date();
      endDate.setDate(endDate.getDate() + 1);

      const location = getLocationFragmentData(user.location);

      navigate({
        pathname: route.events(),
        search: createSearchParams({
          filterPreset: 'today',
          lat: location.latitude.toString(),
          lng: location.longitude.toString(),
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
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

