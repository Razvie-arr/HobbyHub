import { Flex, Spinner } from '@chakra-ui/react';

import { useGeocoding } from '../../../shared/hooks/useGeocoding';
import { useGeocodingWithGeolocation } from '../../../shared/hooks/useGeocodingWithGeolocation';
import { useUrlState } from '../../../shared/hooks/useUrlState';
import { WithOnboardedUser } from '../../../shared/types';
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

  const { isLoading, location } = useGeocoding({
    lng: params?.lng ?? user.location.longitude,
    lat: params?.lat ?? user.location.latitude,
  });

  return isLoading ? <PageSpinner /> : <GroupsPage location={location} />;
};

export const PublicGroupsPageContainer = () => {
  const { isLoading, location } = useGeocodingWithGeolocation();
  return isLoading ? <PageSpinner /> : <GroupsPage location={location} />;
};

