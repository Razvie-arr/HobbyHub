import { useQuery } from '@apollo/client';
import { Alert, AlertIcon, Box, Button, Flex, Heading, HStack, Stack, Text } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

import { route } from 'src/route';
import { AuthPromptWarning, EventTypeTag } from 'src/shared/design-system';
import { ContentContainer, QueryResult } from 'src/shared/layout';
import { ReactRouterLink } from 'src/shared/navigation';
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

export const ProfileDetailsPage = ({ userId }: { userId: number }) => {
  const { user } = useAuth();
  const isCurrentUser = user && user.id === userId;

  return (
    <QueryResult
      queryResult={useQuery(USER_PROFILE, { variables: { userId } })}
      queryName="userById"
      render={(result) => {
        const userProfile = {
          ...result,
          location: result.location ? getLocationFragmentData(result.location) : undefined,
        };
        return (
          <ContentContainer pt={5}>
            <Flex justify="end">
              {isCurrentUser ? (
                    <Button as={ReactRouterLink} to={route.editProfile()} colorScheme="purple" size="md">
                    Edit
                    </Button>
                  ) : null}
            </Flex>
  
            <Flex direction={{ base: 'column', md: 'row' }} align="start" justify="space-between">
              <Box w={{ base: '100%', md: '50%' }}>
                <ProfileDetailsInfo userProfile={userProfile} />
              </Box>
  
              <Stack w={{ base: '100%', md: '50%' }} flexDirection="row" align="center" spacing={12}>
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
            </Flex>
  
            <ProfileDetailsTabs userProfile={userProfile} />
          </ContentContainer>
        );
      }}
    ></QueryResult>
  );
};