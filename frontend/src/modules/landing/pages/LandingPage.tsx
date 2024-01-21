import { useEffect } from 'react';
import { useDisclosure, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import { route } from '../../../route';
import { ContentContainer } from '../../../shared/layout';
import { useAuth } from '../../auth';
import { SignUpForm } from '../../auth/components/SignUpForm';
import { EventCategories, JoinHobbyHubPrompt, Jumbotron, MeetNewPeoplePrompt } from '../components';

export const LandingPage = () => {
  const signUpModalDisclosure = useDisclosure();

  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      // TODO: This needs be resolved declaratively
      navigate(route.events());
    }
  });

  return user ? null : (
    <ContentContainer my="16">
      <VStack spacing={16} alignItems="start">
        <Jumbotron
          signUpFormModalButton={
            <SignUpForm
              disclosure={signUpModalDisclosure}
              modalButtonText="Join HobbyHub"
              modalButtonProps={{ size: 'lg' }}
            />
          }
        />

        <EventCategories />

        <JoinHobbyHubPrompt
          signUpFormModalButton={
            <SignUpForm
              disclosure={signUpModalDisclosure}
              modalButtonText="Sign Up"
              modalButtonProps={{ size: 'lg' }}
            />
          }
        />

        <MeetNewPeoplePrompt
          signUpFormModalButton={
            <SignUpForm
              disclosure={signUpModalDisclosure}
              modalButtonText="Start a group"
              modalButtonProps={{ w: '100%', variant: 'outline' }}
            />
          }
        />
      </VStack>
    </ContentContainer>
  );
};

