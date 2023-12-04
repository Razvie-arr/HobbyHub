import { GraphQLError } from 'graphql/error';

import { SQLDataSource } from '../../../datasource';

import { editAverageUserRating } from './editAverageUserRating';
import { reviewAlreadySent } from './reviewAlreadySent';
import { sendReviewNotification } from './sendReviewNotification';

export const createUserReview = async (
  userId: number,
  reviewerId: number,
  text: string,
  rating: number,
  eventId: number,
  dataSources: { sql: SQLDataSource },
  serverUrl: string,
) => {
  const event = await dataSources.sql.events.getById(eventId);
  if (!event) {
    throw new GraphQLError('Event does not exist');
  }

  const isReviewAlreadySent = await reviewAlreadySent(userId, reviewerId, eventId);

  if (isReviewAlreadySent) {
    throw new GraphQLError('Review already exists');
  }

  const createUserResponse = await dataSources.sql.reviews.insertReview(userId, reviewerId, text, rating, eventId);
  if (!createUserResponse) {
    throw new GraphQLError('Error while creating Review');
  }
  const createdReviewId: number = createUserResponse[0] as number;

  const editAverageRatingResponse = await editAverageUserRating(userId, dataSources);
  if (!editAverageRatingResponse) {
    throw new GraphQLError(`Error while editing average user review!`);
  }

  const createdReview = await dataSources.sql.reviews.getById(createdReviewId);
  if (!createdReview) {
    throw new GraphQLError(`Error while fetching Review!`);
  }

  await sendReviewNotification(createdReview, dataSources, serverUrl);

  return createdReview;
};
