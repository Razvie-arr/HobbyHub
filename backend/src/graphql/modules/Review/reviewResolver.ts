import {
  ContextualNullableResolver,
  ContextualResolver,
  ContextualResolverWithParent,
  QueryReviewByIdArgs,
  QueryReviewsByUserIdArgs,
  Review,
  User,
} from '../../../types';

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
