import { useQuery } from '@apollo/client';
import { Alert, AlertIcon, Heading, HStack, Stack, Text } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

import { AuthPromptWarning, EventTypeTag } from 'src/shared/design-system';
import { ContentContainer, QueryResult } from 'src/shared/layout';
import { getLocationFragmentData } from 'src/shared/types';

import { useAuth } from '../../auth';
import { ProfileDetailsTabs } from '../components';
import { ProfileDetailsInfo } from '../components/ProfileDetailsInfo';
import { USER_PROFILE } from '../queries';

export const ProfileDetailsPageContainer = () => {
  const { userId } = useParams();
  const { user } = useAuth();

  if (!user) {
    return <AuthPromptWarning text="Only registered users can view user profiles." />;
  }

  if (!userId && user) {
    return <ProfileDetailsPage userId={user.id} />;
  }

  return userId ? <ProfileDetailsPage userId={parseInt(userId)} /> : null;
};

export const ProfileDetailsPage = ({ userId }: { userId: number }) => (
  <QueryResult
    queryResult={useQuery(USER_PROFILE, { variables: { userId } })}
    queryName="userById"
    render={(result) => {
      const userProfile = {
        ...result,
        location: result.location ? getLocationFragmentData(result.location) : undefined,
      };
      return (
        <ContentContainer>
          <Stack flexDirection="column" align={{ base: 'center', md: 'flex-start' }} spacing={12}>
            <ProfileDetailsInfo userProfile={userProfile} />
            <Stack spacing={6}>
              <Stack spacing={2}>
                <Heading size="md">About me</Heading>
                {userProfile.description ? (
                  <Text>{userProfile.description}</Text>
                ) : (
                  <Alert status="info" colorScheme="purple">
                    <AlertIcon />
                    User has no description.
                  </Alert>
                )}
              </Stack>
              <Stack spacing={2}>
                <Heading size="md">Interests ({userProfile.event_types.length})</Heading>
                <HStack spacing={4}>
                  {userProfile.event_types.map((eventType) => (
                    <EventTypeTag key={eventType.id} eventType={eventType} />
                  ))}
                </HStack>
              </Stack>
            </Stack>
          </Stack>
          <ProfileDetailsTabs userProfile={userProfile} />
        </ContentContainer>
      );
    }}
  />
);

