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
});
