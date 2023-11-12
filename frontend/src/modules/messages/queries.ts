import { gql } from '../../gql';

export const THREADS = gql(`
  query Threads($userId: Int!) {
    threads(userId: $userId) {
      ...ThreadFragment
    }
  }
`);

