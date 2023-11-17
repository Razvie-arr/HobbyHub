import { Avatar, Box, Circle, Flex, HStack, Spacer, Text } from '@chakra-ui/react';

import { MessageData } from '../../../shared/types';

interface ChatTileProps {
  title: string;
  onClick: () => void;
  isSelected: boolean;
  lastMessage: MessageData;
  read?: boolean;
}

export const ChatTile = ({ title, lastMessage, read, onClick, isSelected }: ChatTileProps) => {
  const { locale } = Intl.DateTimeFormat().resolvedOptions();
  const lastMessageSentAt = new Date(lastMessage.sent_at);
  return (
    <Box
      w="20"
      minH="20"
      bg={isSelected ? 'gray.300' : 'gray.50'}
      width="100%"
      px={3}
      borderRadius={8}
      onClick={onClick}
      _hover={{ cursor: 'pointer' }}
    >
      <HStack height="100%" alignItems="center" spacing={3}>
        <Avatar boxSize="50px" name={title} bg="purple.500" />
        <Box>
          <Text as="b">{title}</Text>
          <Flex alignItems="center">
            <Text noOfLines={1} width="100%">
              {lastMessage.text}
            </Text>
          </Flex>
        </Box>
        <Spacer />
        <Text mx={3} fontSize="sm" m="0">
          {lastMessageSentAt.toLocaleString(locale, {
            day: 'numeric',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </Text>
        <Circle visibility={read ? 'hidden' : 'visible'} size="10px" bg="purple.500"></Circle>
      </HStack>
    </Box>
  );
};
