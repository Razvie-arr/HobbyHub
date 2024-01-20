import { gql } from '../../gql';

export const BLOCK_USER = gql(`
  mutation BlockUser($blockerId: Int!, $blockedId: Int!) {
    blockUser(blocker_id: $blockerId, blocked_id: $blockedId)
  }
`);

