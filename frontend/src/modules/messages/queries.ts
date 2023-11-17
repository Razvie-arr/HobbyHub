import { gql } from '../../gql';

export const THREADS = gql(`
  query Threads($userId: Int!) {
    threads(userId: $userId) {
      ...ThreadFragment
    }
  }
`);

export const MESSAGES_BY_THREAD = gql(`
  query MessagesByThreadId($threadId: Int!) {
    messagesByThreadId(threadId: $threadId) {
      ...MessageFragment
    }
  }
`);
