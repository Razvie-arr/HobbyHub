import { Box, Button, Heading, HStack, Image, Stack, Text, VStack } from '@chakra-ui/react';
import { MdInfo, MdLocationOn } from 'react-icons/md';

import { DataRowItem, StarRating } from 'src/shared/design-system/';

import { DEFAULT_IMAGE_PATH } from '../../../shared/constants';
import { useAuth } from '../../auth';
import { WithUserProfile } from '../types';

export const ProfileDetailsInfo = ({ userProfile }: WithUserProfile) => {
  const { user } = useAuth();
  const isCurrentUser = user && user.id === userProfile.id;
  return (
    <Stack
      spacing={8}
      flexDirection={{ base: 'column', md: 'row' }}
      alignItems="center"
      justifyContent="center"
      mt={16}
    >
      <Image
        borderRadius="full"
        boxSize="200px"
        src={DEFAULT_IMAGE_PATH}
        alt="User profile image"
        fallbackSrc="https://via.placeholder.com/150"
      ></Image>
      <VStack align="start">
        <HStack spacing={4} alignItems="center">
          <Heading fontSize="2xl">
            {userProfile.first_name} {userProfile.last_name}
          </Heading>
          {isCurrentUser ? (
            <Button colorScheme="purple" size="sm">
              Edit
            </Button>
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
          {userProfile.location ? (
            <Text fontSize="md">
              {userProfile.location.city}, {userProfile.location.country}
            </Text>
          ) : null}
        </DataRowItem>
      </VStack>
    </Stack>
  );
};

