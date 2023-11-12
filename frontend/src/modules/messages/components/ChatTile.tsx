import { Avatar, Box, Circle, Flex, Spacer, Text } from '@chakra-ui/react';

interface ChatTileProps {
  thread: Thread;
  onClick: () => void;
  currentUser: string;
  isSelected: boolean;
}

export const ChatTile = ({ thread, onClick, currentUser, isSelected }: ChatTileProps) => {
  const otherUsers = thread.users.filter((user) => user !== currentUser);
  return (
    <Box
      w="20"
      minH="20"
      bg={isSelected ? 'gray.300' : 'gray.50'}
      width="100%"
      px={5}
      borderRadius={8}
      onClick={onClick}
      _hover={{ cursor: 'pointer' }}
    >
      <Flex height="100%" alignItems="center">
        <Avatar src="gibbresh.png" boxSize="50px" name={thread.users[0]} bg="purple.500" />
        <Box mx={4}>
          <Text as="b">{otherUsers.join(', ')}</Text>
          <Flex alignItems="center">
            <Text noOfLines={1} width="100%">
              {thread.lastMessage?.text}
            </Text>
            <Spacer />
          </Flex>
        </Box>
        <Spacer />
        <Text mx={3} fontSize="sm">
          {thread.last_message_at}
        </Text>
        <Circle visibility={thread.thread_read ? 'hidden' : 'visible'} size="10px" bg="purple.500"></Circle>
      </Flex>
    </Box>
  );
};
