import { Box, HStack, IconButton, Text } from '@chakra-ui/react';
import { MdAccountCircle } from 'react-icons/md';

import { WithAuthUser } from '../../../shared/types';

import { AddReviewModalForm } from './AddReviewModalForm';

interface ReviewEventMemberProps extends WithAuthUser {
  eventId: number;
  member: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
  };
}

export const ReviewEventMember = ({ eventId, user, member }: ReviewEventMemberProps) => (
  <HStack justifyContent="space-between" bgColor="white" p={3} borderRadius={10} shadow="sm">
    <HStack>
      <IconButton
        isRound={true}
        color="purple.500"
        bgColor="white"
        alignSelf="center"
        aria-label="Profile"
        icon={<MdAccountCircle />}
        fontSize="40"
      />
      <Text>{`${member.first_name} ${member.last_name}`}</Text>
    </HStack>
    <Box>
      <AddReviewModalForm eventId={eventId} user={user} member={member} />
    </Box>
  </HStack>
);

