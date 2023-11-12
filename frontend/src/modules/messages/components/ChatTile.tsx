import { Avatar, Box, Circle, Flex, Spacer, Text } from '@chakra-ui/react';

import { getMessageFragmentData, WithThread } from '../../../shared/types';

interface ChatTileProps extends WithThread {
  title: string;
  onClick: () => void;
  isSelected: boolean;
}

export const ChatTile = ({ title, thread, onClick, isSelected }: ChatTileProps) => {
  const lastMessage = getMessageFragmentData(thread.lastMessage);
  const { locale } = Intl.DateTimeFormat().resolvedOptions();
  const lastMessageSentAt = new Date(lastMessage.sent_at);
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
        <Avatar boxSize="50px" name={title} bg="purple.500" />
        <Box mx={4}>
          <Text as="b">{title}</Text>
          <Flex alignItems="center">
            <Text noOfLines={1} width="100%">
              {lastMessage.text}
            </Text>
            <Spacer />
          </Flex>
        </Box>
        <Spacer />
        <Text mx={3} fontSize="sm">
          {lastMessageSentAt.toLocaleString(locale, {
            day: 'numeric',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </Text>
        <Circle visibility={thread.thread_read ? 'hidden' : 'visible'} size="10px" bg="purple.500"></Circle>
      </Flex>
    </Box>
  );
};

