import { FragmentType, getFragmentData, gql } from '../../../gql';

export const MessageFragment = gql(/* GraphQL */ `
  fragment MessageFragment on Message {
    id
    thread_id
    sender_id
    text
    sent_at
    sender {
      id
      first_name
      last_name
    }
  }
`);

export type MessageFragmentType = FragmentType<typeof MessageFragment>;

export const getMessageFragmentData = (event: MessageFragmentType) => getFragmentData(MessageFragment, event);
