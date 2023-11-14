import { Fragment, useEffect, useRef } from 'react';
import { CardBody, CardHeader, IconButton, Text, VStack } from '@chakra-ui/react';
import { NonEmptyArray } from 'effect/dist/declarations/src/ReadonlyArray';
import { FaArrowLeft } from 'react-icons/fa6';

import { User } from '../../../gql/graphql';
import { WithAuthUser, WithMessages } from '../../../shared/types';
import { Message } from '../components';

interface ChatContentProps extends WithMessages, WithAuthUser {
  onBackClick: () => void;
  otherUsers: NonEmptyArray<User>;
}

export const ChatContent = ({ messages, user, otherUsers, onBackClick }: ChatContentProps) => {
  const { locale } = Intl.DateTimeFormat().resolvedOptions();

  const sortedMessages = messages.sort((a, b) => new Date(a.sent_at).getTime() - new Date(b.sent_at).getTime());
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
          {otherUsers.map(({ first_name, last_name }) => `${first_name} ${last_name}`).join(', ')}
        </Text>
      </CardHeader>
      <CardBody bg="gray.50" overflowY="auto" ref={chatContainerRef}>
        <VStack gap={8}>
          {sortedMessages.map((message) => {
            const sentAt = new Date(message.sent_at);
            return (
              <Fragment key={message.id}>
                {sentAt.toLocaleString(locale, {
                  day: 'numeric',
                  month: 'short',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
                <Message
                  isMyMessage={message.sender_id === user.id}
                  senderName={`${message.sender.first_name} ${message.sender.last_name}`}
                  messageText={message.text}
                />
              </Fragment>
            );
          })}
        </VStack>
      </CardBody>
    </>
  );
};

