import { Avatar, Box, Button, Heading, HStack, Stack, Text, VStack } from '@chakra-ui/react';
import { MdInfo, MdLocationOn } from 'react-icons/md';

import { DataRowItem, StarRating } from 'src/shared/design-system/';

import { route } from '../../../route';
import { ReactRouterLink } from '../../../shared/navigation';
import { getLocationFragmentData, WithUserProfile } from '../../../shared/types';
import { useAuth } from '../../auth';
import { BlockUserButton, UnblockUserButton } from '../../block';

export const ProfileDetailsInfo = ({ userProfile }: WithUserProfile) => {
  const { user } = useAuth();

  const userProfileName = `${userProfile.first_name} ${userProfile.last_name}`;
  const userProfileLocation = userProfile.location ? getLocationFragmentData(userProfile.location) : undefined;

  return (
    <Stack>
      <HStack w="100%" spacing={8}>
        <Avatar name={userProfileName} size="2xl" bg="purple.300" />
        <VStack align="start">
          <HStack>
            <Heading fontSize="2xl">
              {userProfile.first_name} {userProfile.last_name}
            </Heading>
            {user && user.id === userProfile.id ? (
              <Button as={ReactRouterLink} to={route.editProfile()} colorScheme="purple" size="sm">
                Edit
              </Button>
            ) : null}
            {user && user.id !== userProfile.id && !userProfile.blockedBy?.map(({ id }) => id).includes(user.id) ? (
              <BlockUserButton
                blockerId={user.id}
                blockedId={userProfile.id}
                blockedName={userProfileName}
                refetchQueries={['UserProfile']}
                size="sm"
              />
            ) : null}
            {user && user.id !== userProfile.id && userProfile.blockedBy?.map(({ id }) => id).includes(user.id) ? (
              <UnblockUserButton
                blockerId={user.id}
                blockedId={userProfile.id}
                blockedName={userProfileName}
                refetchQueries={['UserProfile']}
                size="sm"
              />
            ) : null}
          </HStack>
          <HStack>
            <Text fontSize="lg" as="b">
              {userProfile.average_rating}
            </Text>
            <Box display="flex" alignItems="center">
              <StarRating rating={userProfile.average_rating} size="32px" />
            </Box>
          </HStack>
          <DataRowItem icon={MdInfo}>
            <Text fontSize="md">{userProfile.email}</Text>
          </DataRowItem>
          <DataRowItem icon={MdLocationOn}>
            {userProfileLocation ? (
              <Text fontSize="md">
                {userProfileLocation.city}, {userProfileLocation.country}
              </Text>
            ) : null}
          </DataRowItem>
        </VStack>
      </HStack>
    </Stack>
  );
};

