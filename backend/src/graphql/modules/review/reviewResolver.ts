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
  QueryUnreviewedEventParticipantsArgs,
  Review,
  User,
} from '../../../types';
import { getEventBossId } from '../event/getEventBossId';

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

export const unreviewedEventParticipantsResolver = async (
  _: unknown,
  { userId, eventId }: QueryUnreviewedEventParticipantsArgs,
  { dataSources }: CustomContext,
) => {
  const event = await dataSources.sql.events.getById(eventId);
  if (!event) {
    throw new GraphQLError('Event does not exist.');
  }

  const eventParticipants: User[] = await dataSources.sql.events.getEventParticipants(eventId);

  const userIsParticipant = eventParticipants.find((participant) => participant.id === userId) !== undefined;
  if (!userIsParticipant) {
    throw new GraphQLError('User is not participant of this event.');
  }

  //if user is not author or admin resolver should return event author or group admin
  const eventBossId = await getEventBossId(event);
  if (eventBossId !== userId) {
    const eventBoss = await dataSources.sql.users.getById(eventBossId);
    if (!eventBoss) {
      throw new GraphQLError('Event admin or author does not exist');
    }
    return [eventBoss];
  }

  const eventReviews = await dataSources.sql.reviews.getAllByEventId(eventId);
  if (eventReviews.length === 0) {
    return eventParticipants;
  }

  const reviewedUserIds = eventReviews.map((eventReview) => eventReview.user_id);
  return eventParticipants.filter((participant) => !reviewedUserIds.includes(participant.id));
};
