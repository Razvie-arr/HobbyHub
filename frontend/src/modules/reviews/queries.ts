import { gql } from '../../gql';

export const UNREVIEWED_EVENT_PARTICIPANTS = gql(`
  query UnreviewedEventParticipants($userId: Int!, $eventId: Int!) {
    unreviewedEventParticipants(userId: $userId, eventId: $eventId) {
      id
      first_name
      last_name
      email
    }
  }
`);

