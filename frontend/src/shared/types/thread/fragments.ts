import { FragmentType, getFragmentData, gql } from '../../../gql';

export const ThreadFragment = gql(/* GraphQL */ `
  fragment ThreadFragment on Thread {
    id
    last_message_at
    thread_read
    users {
      id
      first_name
      last_name
      email
    }
    lastMessage {
      ...MessageFragment
    }
    messages {
      ...MessageFragment
    }
  }
`);

export type ThreadFragmentType = FragmentType<typeof ThreadFragment>;

export const getThreadFragmentData = (event: ThreadFragmentType) => getFragmentData(ThreadFragment, event);

