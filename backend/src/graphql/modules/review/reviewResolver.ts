import { GraphQLError } from 'graphql/error';

import {
  ContextualNullableResolver,
  ContextualResolver,
  ContextualResolverWithParent,
  CustomContext,
  MutationCreateReviewArgs,
  QueryReviewByIdArgs,
  QueryReviewsByUserIdArgs,
  Review,
  User,
} from '../../../types';

import { editAverageUserRating } from './editAverageUserRating';
import { sendReviewNotification } from './sendReviewNotification';

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

export const createReviewResolver = async (
  _: unknown,
  { userId, reviewerId, text, rating }: MutationCreateReviewArgs,
  { dataSources, requestSenderUrl }: CustomContext,
) => {
  const createUserResponse = await dataSources.sql.reviews.createReview(
    userId,
    reviewerId,
    text as unknown as string,
    rating,
  );
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

  await sendReviewNotification(createdReview, dataSources, requestSenderUrl);

  return createdReview;
};
