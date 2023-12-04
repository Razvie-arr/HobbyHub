/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
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
  QueryUnreviewedEventParticipantsArgs,
  Review,
  User,
} from '../../../types';
import { getEventBossId } from '../event/getEventBossId';

import { askForFeedback } from './askForFeedback';
import { createUserReview } from './createUserReview';
import { reviewAlreadySent } from './reviewAlreadySent';

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

  const eventParticipants = await dataSources.sql.events.getAcceptedEventParticipants(eventId);
  if (!eventParticipants) {
    throw new GraphQLError('Event does not exist or does not have participants');
  }

  eventParticipants.forEach(async (participant) => {
    await createUserReview(participant.id, adminId, text, maxRating, eventId, dataSources, requestSenderUrl);
  });

  return true;
};

export const askForFeedbackResolver = async (
  _: unknown,
  __: unknown,
  { dataSources, requestSenderUrl }: CustomContext,
) => {
  const events = await dataSources.sql.events.getEventsForFeedback();
  const sentEvents: string[] = [];

  for (const event of events) {
    if (event.author_id) {
      const author = await dataSources.sql.users.getById(event.author_id);
      if (author) {
        await askForFeedback(author, event, requestSenderUrl);
      }
    }

    if (event.group_id) {
      const group = await dataSources.sql.groups.getById(event.group_id);
      if (group) {
        // @ts-ignore
        await askForFeedback(group.admin, event, requestSenderUrl);
      }
    }

    const users = await dataSources.sql.events.getAcceptedEventParticipants(event.id);

    for (const user of users) {
      await askForFeedback(user, event, requestSenderUrl);
    }

    sentEvents.push(event.name);
    await dataSources.sql.events.setFeedbackSentStatus(event.id, true);
  }

  return sentEvents;
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

  const eventParticipants: User[] = await dataSources.sql.events.getAcceptedEventParticipants(eventId);
  const userIsParticipant = eventParticipants.find((participant) => participant.id === userId) !== undefined;

  // @ts-ignore
  if (!(userIsParticipant || userId === event.author_id)) {
    throw new GraphQLError('User is not participant of this event.');
  }

  //if user is not author or admin, resolver should return event author or group admin
  const eventBossId = await getEventBossId(event);
  if (eventBossId !== userId) {
    const eventBoss = await dataSources.sql.users.getById(eventBossId);
    if (!eventBoss) {
      throw new GraphQLError('Event admin or author does not exist');
    }
    if (await reviewAlreadySent(eventBossId, userId, eventId)) {
      return [];
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
