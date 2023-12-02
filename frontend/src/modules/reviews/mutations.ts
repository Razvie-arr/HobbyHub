import { gql } from '../../gql';

export const ADD_REVIEW = gql(`
  mutation CreateReview($userId: Int!, $reviewerId: Int!, $eventId: Int!, $text: String!, $rating: Float!) {
    createReview(userId: $userId, reviewerId: $reviewerId, eventId: $eventId, text: $text, rating: $rating) {
      id
    }
  }
`);

