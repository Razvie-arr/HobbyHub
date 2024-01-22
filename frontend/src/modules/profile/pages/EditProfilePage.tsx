import { useEffect } from 'react';
import { Container } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import { route } from '../../../route';
import { getLocationFragmentData, WithAuthUser } from '../../../shared/types';
import { ChangePasswordForm, EditProfileForm } from '../components/forms';

export const EditProfilePage = ({ user }: WithAuthUser) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (user && (!user.location || user.event_types.length === 0)) {
      // TODO: This needs be resolved declaratively
      navigate(route.onboarding());
    }
  });

  if (!user.location || user.event_types.length === 0) {
    return null;
  }

  const location = getLocationFragmentData(user.location);

  return (
    <Container maxW="3xl">
      <EditProfileForm user={user} location={location} />
      <ChangePasswordForm user={user} />
    </Container>
  );
};

