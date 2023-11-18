import { Box, HStack, IconButton, Text, useDisclosure } from '@chakra-ui/react';
import { MdAccountCircle } from 'react-icons/md';

import { SendMessageModal } from '../../../../modules/messages';
import { WithAuthUser } from '../../../types';

interface MemberItemProps extends WithAuthUser {
  member: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
  };
}

export const MemberItem = ({ user, member }: MemberItemProps) => {
  const sendMessageModalDisclosure = useDisclosure();
  return (
    <HStack justifyContent="space-between" bgColor="white" p={3} flexBasis="45%" borderRadius={10} mb={4} shadow="sm">
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
        <SendMessageModal disclosure={sendMessageModalDisclosure} recipient={member} user={user} />
      </Box>
    </HStack>
  );
};

