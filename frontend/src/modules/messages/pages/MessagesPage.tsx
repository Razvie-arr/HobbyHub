import { useEffect, useState } from 'react';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { Card, CardFooter, CardHeader, Heading, Stack, Text, VStack } from '@chakra-ui/react';
import { ReadonlyArray } from 'effect';
import { NonEmptyArray } from 'effect/dist/declarations/src/ReadonlyArray';

import { User } from '../../../gql/graphql';
import { ContentContainer, QueryResult } from '../../../shared/layout';
import {
  getMessageFragmentData,
  getThreadFragmentData,
  ThreadData,
  WithAuthUser,
  WithNonEmptyThreads,
} from '../../../shared/types';
import { ChatContent, ChatTile } from '../components';
import { SendMessageForm } from '../components/SendMessageForm';
import { EDIT_THREAD_READ } from '../mutations';
import { MESSAGES_BY_THREAD, THREADS } from '../queries';

export const MessagesPageContainer = ({ user }: WithAuthUser) => {
  const threadQueryResult = useQuery(THREADS, { variables: { userId: user.id } });
  return (
    <QueryResult
      queryResult={threadQueryResult}
      render={(data) => {
        const threads = data.threads.map(getThreadFragmentData);
        return ReadonlyArray.isNonEmptyArray(threads) ? <MessagesPage user={user} threads={threads} /> : null;
      }}
    />
  );
};

const MessagesPage = ({ user, threads }: WithAuthUser & WithNonEmptyThreads) => {
  const [getMessagesByThreadId, messagesQueryResult] = useLazyQuery(MESSAGES_BY_THREAD);

  const [editThreadRead] = useMutation(EDIT_THREAD_READ);

  const [selectedThread, setSelectedThread] = useState<ThreadData | null>(threads[0]);
  const [readThreads, setReadThreads] = useState<Record<number, boolean>>({});

  const handleChatTileClick = async (thread: ThreadData) => {
    setSelectedThread(thread);
    if (!thread.thread_read) {
      await editThreadRead({
        variables: {
          read: true,
          threadId: thread.id,
          userId: user.id,
        },
      });
      setReadThreads((value) => ({ [thread.id]: true, ...value }));
    }
    await getMessagesByThreadId({ variables: { threadId: thread.id } });
  };

  const handleBackButtonClick = () => {
    setSelectedThread(null);
  };

  useEffect(() => {
    void handleChatTileClick(threads[0]);
  }, []);

  return (
    <ContentContainer>
      <Stack direction="row" py="8" height="80vh" spacing={4}>
        <Card
          flexGrow={1}
          display={{ base: selectedThread ? 'none' : 'flex', md: 'flex' }}
          shadow="sm"
          height="100%"
          width="60%"
          p={5}
          border="solid"
          borderWidth={1}
          borderColor="purple.100"
        >
          <CardHeader borderBottom="solid" borderBottomWidth={2} borderColor="gray.100">
            <Heading size="xl">Chats</Heading>
          </CardHeader>
          <VStack spacing="1" overflowY="auto" maxH="100%" py="4" width="100%">
            {threads.map((thread) => (
              <ChatTile
                key={thread.id}
                title={thread.users
                  .filter(({ id }) => id !== user.id)
                  .map(({ first_name, last_name }) => `${first_name} ${last_name}`)
                  .join(', ')}
                lastMessage={getMessageFragmentData(thread.lastMessage)}
                read={thread.thread_read || readThreads[thread.id]}
                onClick={async () => handleChatTileClick(thread)}
                isSelected={selectedThread?.id === thread.id}
              />
            ))}
          </VStack>
        </Card>

        <Card
          flexGrow={3}
          display={{ base: selectedThread ? 'flex' : 'none', md: 'flex' }}
          shadow="sm"
          width="100%"
          border="solid"
          borderWidth={1}
          borderColor="purple.100"
          justifyContent="center"
        >
          {selectedThread ? (
            <QueryResult
              queryResult={messagesQueryResult}
              render={(messagesData) => {
                const messages = messagesData.messagesByThreadId.map(getMessageFragmentData);
                const otherUsers = selectedThread.users.filter(({ id }) => id !== user.id) as NonEmptyArray<User>;
                return (
                  <>
                    <ChatContent
                      user={user}
                      otherUsers={otherUsers}
                      messages={messages}
                      onBackClick={handleBackButtonClick}
                    />
                    <CardFooter>
                      <SendMessageForm
                        user={user}
                        otherUsers={otherUsers}
                        refetchMessages={async () => {
                          await messagesQueryResult.refetch({ threadId: selectedThread.id });
                        }}
                      />
                    </CardFooter>
                  </>
                );
              }}
            />
          ) : (
            <Card flexGrow={1} shadow="sm" height="800px" p={5} alignItems="center" justifyContent="center">
              <Text fontSize="xl">Select a chat</Text>
            </Card>
          )}
        </Card>
      </Stack>
    </ContentContainer>
  );
};

