import { gql } from '../../gql';

export const BLOCK_USER = gql(`
  mutation BlockUser($blockerId: Int!, $blockedId: Int!) {
    blockUser(blocker_id: $blockerId, blocked_id: $blockedId)
  }
`);

export const UNBLOCK_USER = gql(`
  mutation UnblockUser($blockerId: Int!, $blockedId: Int!) {
    unblockUser(blocker_id: $blockerId, blocked_id: $blockedId)
  }
`);

