import { getSQLDataSource } from '../../../datasource';

export const reviewAlreadySent = async (userId: number, reviewerId: number, eventId: number) => {
  const review = await getSQLDataSource().reviews.getByUserAndReviewerAndEventIds(userId, reviewerId, eventId);
  return review[0] != null;
};
