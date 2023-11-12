import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { Card, CardHeader, Heading, Stack, Text, VStack } from '@chakra-ui/react';

import { ContentContainer, QueryResult } from '../../../shared/layout';
import { getThreadFragmentData, ThreadData, WithAuthUser } from '../../../shared/types';
import { ChatContent, ChatTile } from '../components';
import { THREADS } from '../queries';

// const threadData: Thread[] = [
//   {
//     id: '1',
//     users: ['John Doe', 'Jane Doe'],
//     thread_read: false,
//     messages: [
//       {
//         id: '1',
//         thread_id: '1',
//         sender_id: 'John Doe',
//         text: 'Hello. Are you gonna be available at Saturday for a board game session in my house?',
//         sent_at: '12:03',
//       },
//       { id: '2', thread_id: '1', sender_id: 'Jane Doe', text: 'Hey, yes I am gonna be there.', sent_at: '12:04' },
//       { id: '3', thread_id: '1', sender_id: 'Jane Doe', text: 'Send me the details.', sent_at: '12:05' },
//     ],
//     last_message_at: '12:03',
//     lastMessage: { id: '1', thread_id: '1', sender_id: 'John Doe', text: 'Send me the details.', sent_at: '12:05' },
//   },
//   {
//     id: '2',
//     users: ['John Doe', 'Bobson Dugnutt'],
//     thread_read: false,
//     messages: [
//       {
//         id: '1',
//         thread_id: '2',
//         sender_id: 'Bobson Dugnutt',
//         text: 'Hey. Are you gonna be available at Saturday for a volleyball game?',
//         sent_at: '12:03',
//       },
//       { id: '2', thread_id: '2', sender_id: 'John Doe', text: 'Hey, yes I will.', sent_at: '12:04' },
//       { id: '3', thread_id: '2', sender_id: 'John Doe', text: 'Where is it gonna take place?', sent_at: '12:05' },
//     ],
//     last_message_at: '12:03',
//     lastMessage: {
//       id: '1',
//       thread_id: '1',
//       sender_id: 'John Doe',
//       text: 'Where is it gonna take place?',
//       sent_at: '12:05',
//     },
//   },
//   {
//     id: '3',
//     users: ['Samuel Smith', 'Marie Whitney', 'John Doe'],
//     thread_read: true,
//     messages: [{ id: '2', thread_id: '3', sender_id: 'Samuel Smith', text: 'Lorem ipsum...', sent_at: '11:45' }],
//     last_message_at: '11:45',
//     lastMessage: { id: '2', thread_id: '3', sender_id: 'Samuel Smith', text: 'Lorem ipsum...', sent_at: '11:45' },
//   },
// ];

export const MessagesPage = ({ user }: WithAuthUser) => {
  const queryResult = useQuery(THREADS, { variables: { userId: user.id } });

  const [selectedThread, setSelectedThread] = useState<ThreadData | null>(null);

  const handleChatTileClick = (thread: ThreadData) => {
    setSelectedThread(thread);
  };

  const handleBackButtonClick = () => {
    setSelectedThread(null);
  };

  return (
    <QueryResult
      queryResult={queryResult}
      render={(data) => (
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
                {data.threads.map(getThreadFragmentData).map((thread) => (
                  <ChatTile
                    key={thread.id}
                    title={thread.users
                      .filter(({ id }) => id !== user.id)
                      .map(({ first_name, last_name }) => `${first_name} ${last_name}`)
                      .join(', ')}
                    thread={thread}
                    onClick={() => handleChatTileClick(thread)}
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
            >
              {selectedThread ? (
                <ChatContent
                  user={user}
                  title={selectedThread.users
                    .filter(({ id }) => id !== user.id)
                    .map(({ first_name, last_name }) => `${first_name} ${last_name}`)
                    .join(', ')}
                  thread={selectedThread}
                  onBackClick={handleBackButtonClick}
                />
              ) : (
                <Card flexGrow={1} shadow="sm" height="800px" p={5} alignItems="center" justifyContent="center">
                  <Text fontSize="xl">Select a chat</Text>
                </Card>
              )}
            </Card>
          </Stack>
        </ContentContainer>
      )}
    />
  );
};

