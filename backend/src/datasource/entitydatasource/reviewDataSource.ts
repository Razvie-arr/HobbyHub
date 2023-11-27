import { DataSourceKnex } from '@nic-jennings/sql-datasource';

export const reviewDataSource = (db: { query: DataSourceKnex; write: DataSourceKnex }) => ({
  getAllByUserId: (userId: number, offset?: number | null, limit?: number | null) => {
    const query = db
      .query('Review')
      .where('user_id', userId)
      .orderBy('id', 'desc')
      .offset(offset ?? 0);
    return limit ? query.limit(limit) : query;
  },

  insertReview: (userId: number, reviewerId: number, text: string | null, rating: number) =>
    db.write('Review').insert({ user_id: userId, reviewer_id: reviewerId, rating: rating, text: text }),

  updateUserAverageReview: (userId: number, averageRating: number) =>
    db.write('User').where('id', userId).update({ average_rating: averageRating }),
});
