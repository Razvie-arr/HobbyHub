import { gql } from '../../gql';

export const ADD_REVIEW = gql(`
  mutation CreateReview($userId: Int!, $reviewerId: Int!, $eventId: Int!, $text: String!, $rating: Float!) {
    createReview(userId: $userId, reviewerId: $reviewerId, eventId: $eventId, text: $text, rating: $rating) {
      id
    }
  }
`);

export const MAX_RATING_ALL_PARTICIPANTS = gql(`
  mutation MaxRatingAllParticipants($adminId: Int!, $eventId: Int!) {
    maxRatingAllParticipants(adminId: $adminId, eventId: $eventId)
  }
`);

