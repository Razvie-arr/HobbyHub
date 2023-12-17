import { Flex, Spinner } from '@chakra-ui/react';

import { useGeocoding } from '../../../shared/hooks/useGeocoding';
import { useGeocodingWithGeolocation } from '../../../shared/hooks/useGeocodingWithGeolocation';
import { useUrlState } from '../../../shared/hooks/useUrlState';
import { getLocationFragmentData, WithOnboardedUser } from '../../../shared/types';
import { useAuth } from '../../auth';
import { eventFilterUrlSchema } from '../schemas';

import { EventsPage } from './EventsPage';

const PageSpinner = () => (
  <Flex justify="center" alignItems="center" width="100%" p="8">
    <Spinner size="xl" />
  </Flex>
);

export const EventsPageContainer = () => {
  const { user } = useAuth();
  return user && user.location ? (
    <PersonalizedEventsPageContainer user={user as WithOnboardedUser['user']} />
  ) : (
    <PublicEventsPageContainer />
  );
};

export const PersonalizedEventsPageContainer = ({ user }: WithOnboardedUser) => {
  const [params] = useUrlState(eventFilterUrlSchema);

  const location = getLocationFragmentData(user.location);

  const geocoding = useGeocoding({
    lng: params?.lng ?? location.longitude,
    lat: params?.lat ?? location.latitude,
  });

  return geocoding.isLoading ? <PageSpinner /> : <EventsPage location={geocoding.location} />;
};

export const PublicEventsPageContainer = () => {
  const { isLoading, location } = useGeocodingWithGeolocation();
  return isLoading ? <PageSpinner /> : <EventsPage location={location} />;
};

