import { SQLDataSource } from '../../../datasource';

export const editAverageUserRating = async (userId: number, dataSources: { sql: SQLDataSource }) => {
  const userReviews = await dataSources.sql.reviews.getAllByUserId(userId);
  const ratings: number[] = userReviews.map((review) => review.rating);

  const averageRating = computeAverageRating(ratings);

  return dataSources.sql.reviews.editUserAverageReview(userId, averageRating);
};
export const computeAverageRating = (ratings: number[]) => {
  let sum = 0;
  for (const rating of ratings) {
    sum += rating;
  }
  return sum / ratings.length;
};
