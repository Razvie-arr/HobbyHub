import { useEffect, useRef } from 'react';
import {
  CardBody,
  CardFooter,
  CardHeader,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  VStack,
} from '@chakra-ui/react';
import { FaArrowLeft } from 'react-icons/fa6';
import { MdSend } from 'react-icons/md';

import { Message } from '../components';

export const ChatContent = ({
  thread,
  currentUser,
  onBackClick,
}: {
  thread: Thread;
  currentUser: string;
  onBackClick: () => void;
}) => {
  const isMyMessage = (senderId: string) => senderId === currentUser;
  const sortedMessages = [...thread.messages].sort(
    (a, b) => new Date(a.sent_at).getTime() - new Date(b.sent_at).getTime(),
  );
  const otherUsers = thread.users.filter((user) => user !== currentUser);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Scroll to the bottom
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [sortedMessages]);

  return (
    <>
      <CardHeader display="flex" alignItems="center" gap={4}>
        <IconButton
          color="purple.600"
          _hover={{ bg: 'purple.50' }}
          _active={{ bg: 'purple.50' }}
          display={{ base: 'flex', md: 'none' }}
          aria-label="Back to chats"
          variant="ghost"
          fontSize="lg"
          icon={<FaArrowLeft />}
          onClick={onBackClick}
        />
        <Text fontSize="xl" as="b" textAlign="center">
          {otherUsers.join(', ')}
        </Text>
      </CardHeader>
      <CardBody bg="gray.50" overflowY="auto" ref={chatContainerRef}>
        <VStack gap={5}>
          {sortedMessages.map((message) => (
            <Message
              key={message.id}
              isMyMessage={isMyMessage(message.sender_id)}
              senderName={message.sender_id}
              messageText={message.text}
            />
          ))}
        </VStack>
      </CardBody>
      <CardFooter>
        <InputGroup>
          <Input placeholder="Write a reply..." borderRadius="full" />
          <InputRightElement width="3rem">
            <IconButton
              borderRadius="full"
              colorScheme="purple"
              aria-label="Send message"
              h="1.75rem"
              size="sm"
              icon={<Icon as={MdSend} />}
            />
          </InputRightElement>
        </InputGroup>
      </CardFooter>
    </>
  );
};
