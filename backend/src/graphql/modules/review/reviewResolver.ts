import { GraphQLError } from 'graphql/error';

import {
  ContextualNullableResolver,
  ContextualResolver,
  ContextualResolverWithParent,
  CustomContext,
  Event,
  MutationCreateReviewArgs,
  MutationMaxRatingAllParticipantsArgs,
  QueryReviewByIdArgs,
  QueryReviewsByUserIdArgs,
  QueryReviewsCountArgs,
  Review,
  User,
} from '../../../types';

import { createUserReview } from './createUserReview';

export const reviewByIdResolver: ContextualNullableResolver<Review, QueryReviewByIdArgs> = async (
  _,
  { reviewId },
  { dataSources },
) => await dataSources.sql.reviews.getById(reviewId);

export const reviewsByUserIdResolver: ContextualResolver<Array<Review>, QueryReviewsByUserIdArgs> = async (
  _,
  { userId, offset, limit },
  { dataSources },
) => await dataSources.sql.reviews.getAllByUserId(userId, offset, limit);

export const reviewsCountResolver: ContextualResolver<number, QueryReviewsCountArgs> = async (
  _,
  { userId },
  { dataSources },
) => {
  const dbResponse = await dataSources.sql.reviews.getUserReviewsCount(userId);
  if (!dbResponse[0]) {
    return 0;
  }

  // @ts-expect-error
  return parseInt(dbResponse[0]['count(*)']);
};

export const reviewUserResolver: ContextualResolverWithParent<User, Review> = async (parent, _, { dataSources }) =>
  (await dataSources.sql.users.getById(parent.user_id)) as unknown as User;

export const reviewReviewerResolver: ContextualResolverWithParent<User, Review> = async (parent, _, { dataSources }) =>
  (await dataSources.sql.users.getById(parent.reviewer_id)) as unknown as User;

export const reviewEventResolver: ContextualResolverWithParent<Event, Review> = async (parent, _, { dataSources }) =>
  (await dataSources.sql.events.getById(parent.event_id)) as unknown as Event;

export const createReviewResolver = async (
  _: unknown,
  { userId, reviewerId, eventId, text, rating }: MutationCreateReviewArgs,
  { dataSources, requestSenderUrl }: CustomContext,
) => createUserReview(userId, reviewerId, text, rating, eventId, dataSources, requestSenderUrl);

export const maxRatingAllParticipantsResolver = async (
  _: unknown,
  { adminId, eventId }: MutationMaxRatingAllParticipantsArgs,
  { dataSources, requestSenderUrl }: CustomContext,
) => {
  const maxRating = 5;
  const text = 'Great!';

  const eventParticipants = await dataSources.sql.events.getEventParticipants(eventId);
  if (!eventParticipants) {
    throw new GraphQLError('Event does not exist or does not have participants');
  }

  eventParticipants.forEach(async (participant) => {
    await createUserReview(participant.id, adminId, text, maxRating, eventId, dataSources, requestSenderUrl);
  });

  return true;
};
