import { Flex, Spinner } from '@chakra-ui/react';

import { useGeocoding } from '../../../shared/hooks/useGeocoding';
import { useGeocodingWithGeolocation } from '../../../shared/hooks/useGeocodingWithGeolocation';
import { useUrlState } from '../../../shared/hooks/useUrlState';
import { getLocationFragmentData, WithOnboardedUser } from '../../../shared/types';
import { useAuth } from '../../auth';
import { groupFilterUrlSchema } from '../schemas';

import { GroupsPage } from './GroupsPage';

const PageSpinner = () => (
  <Flex justify="center" alignItems="center" width="100%" p="8">
    <Spinner size="xl" />
  </Flex>
);

export const GroupsPageContainer = () => {
  const { user } = useAuth();
  return user && user.location ? (
    <PersonalizedGroupsPageContainer user={user as WithOnboardedUser['user']} />
  ) : (
    <PublicGroupsPageContainer />
  );
};

export const PersonalizedGroupsPageContainer = ({ user }: WithOnboardedUser) => {
  const [params] = useUrlState(groupFilterUrlSchema);

  const location = getLocationFragmentData(user.location);

  const geocoding = useGeocoding({
    lng: params?.lng ?? location.longitude,
    lat: params?.lat ?? location.latitude,
  });

  return geocoding.isLoading ? <PageSpinner /> : <GroupsPage location={geocoding.location} />;
};

export const PublicGroupsPageContainer = () => {
  const { isLoading, location } = useGeocodingWithGeolocation();
  return isLoading ? <PageSpinner /> : <GroupsPage location={location} />;
};

