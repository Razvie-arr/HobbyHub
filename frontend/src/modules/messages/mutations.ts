import { gql } from '../../gql';

export const EDIT_THREAD_READ = gql(`
  mutation EditReadThread($userId: Int!, $threadId: Int!, $read: Boolean!) {
    editReadThread(userId: $userId, threadId: $threadId, read: $read)
  }
`);

export const SEND_MESSAGE = gql(`
  mutation SendMessage($senderId: Int!, $recipientId: Int!, $text: String!) {
    sendMessage(senderId: $senderId, recipientId: $recipientId, text: $text)
  }
`);

