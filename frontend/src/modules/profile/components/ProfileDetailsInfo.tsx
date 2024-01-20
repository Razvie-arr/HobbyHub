import { Avatar, Box, Heading, HStack, Stack, Text, VStack } from '@chakra-ui/react';
import { MdInfo, MdLocationOn } from 'react-icons/md';

import { DataRowItem, StarRating } from 'src/shared/design-system/';

import { WithUserProfile } from '../types';

export const ProfileDetailsInfo = ({ userProfile }: WithUserProfile) => (
  <Stack>
    <HStack w="100%" spacing={8}>
      <Avatar name={userProfile?.first_name.concat(' ', userProfile?.last_name)} size="2xl" bg="purple.300" />
      <VStack align="start">
        <Heading fontSize="2xl">
          {userProfile.first_name} {userProfile.last_name}
        </Heading>
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
    </HStack>
  </Stack>
);

