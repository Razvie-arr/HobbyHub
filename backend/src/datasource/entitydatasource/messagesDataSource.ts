import { DataSourceKnex } from '@nic-jennings/sql-datasource';

export const messagesDataSource = (db: { query: DataSourceKnex; write: DataSourceKnex }) => ({
  getAllByThreadId: (threadId: number, offset?: number | null, limit?: number | null) => {
    const query = db
      .query('Message')
      .where('thread_id', threadId)
      .offset(offset ?? 0);
    return limit ? query.limit(limit) : query;
  },
});
