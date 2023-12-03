import { Box, HStack, IconButton, Text } from '@chakra-ui/react';
import { MdAccountCircle } from 'react-icons/md';

import { WithNullableAuthUser } from '../../../../shared/types';
import { SendMessageModal } from '../../../messages';

interface EventParticipantItemProps extends WithNullableAuthUser {
  member: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
  };
}

export const EventParticipantItem = ({ user, member }: EventParticipantItemProps) => (
  <HStack
    justifyContent="space-between"
    bgColor="white"
    p={3}
    flexBasis={{ base: '100%', md: '45%' }}
    borderRadius={10}
    mb={4}
    shadow="sm"
  >
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
    {user ? (
      <Box>
        <SendMessageModal recipient={member} user={user} />
      </Box>
    ) : null}
  </HStack>
);

