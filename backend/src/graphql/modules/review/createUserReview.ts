import { GraphQLError } from 'graphql/error';

import { SQLDataSource } from '../../../datasource';
import { sendGotReviewEmail } from '../../../emails/review/sendGotReviewEmail';
import { User } from '../../../types';
import { getEventBossId } from '../event/getEventBossId';

import { editAverageUserRating } from './editAverageUserRating';
import { reviewAlreadySent } from './reviewAlreadySent';

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
  const user = (await dataSources.sql.users.getById(userId)) as unknown as User;
  if (!user) {
    throw new GraphQLError('User does not exist');
  }

  const reviewer = (await dataSources.sql.users.getById(reviewerId)) as unknown as User;
  if (!reviewer) {
    throw new GraphQLError('Reviewer does not exist');
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

  const isParticipant = reviewer.id !== (await getEventBossId(event));
  const reviewerFullName = reviewer.first_name + ' ' + reviewer.last_name;
  await sendGotReviewEmail(isParticipant, event.name, user.email, reviewerFullName, createdReview, serverUrl);

  return createdReview;
};
