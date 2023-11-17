import { Avatar, Box, HStack, Text } from '@chakra-ui/react';

interface MessageProps {
  isMyMessage: boolean;
  senderName: string;
  messageText: string;
}

export const Message = ({ isMyMessage, senderName, messageText }: MessageProps) => (
  <HStack alignSelf={isMyMessage ? 'flex-end' : 'flex-start'} spacing={4}>
    {!isMyMessage && <Avatar boxSize="50px" name={senderName} bg="purple.500" />}
    <Box
      shadow="sm"
      bg={isMyMessage ? 'purple.500' : 'white'}
      color={isMyMessage ? 'white' : 'black'}
      p={4}
      borderRadius={8}
    >
      <Text>{messageText}</Text>
    </Box>
  </HStack>
);
