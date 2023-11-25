import { DataSourceKnex } from '@nic-jennings/sql-datasource';

export const threadsDataSource = (db: { query: DataSourceKnex; write: DataSourceKnex }) => ({
  getAllByUserId: (userId: number, offset?: number | null, limit?: number | null) => {
    const query = db
      .query('User_Thread')
      .innerJoin('Thread', 'User_Thread.thread_id', 'Thread.id')
      .where('user_id', userId)
      .orderBy('last_message_at', 'desc')
      .offset(offset ?? 0);
    return limit ? query.limit(limit) : query;
  },

  getMessages: (threadId: number) => db.query('Message').where('thread_id', threadId).orderBy('sent_at', 'desc'),

  getLastMessage: (threadId: number) =>
    db.query('Message').where('thread_id', threadId).orderBy('sent_at', 'desc').first('*'),

  getUsers: (threadId: number) =>
    db.query('User_Thread').innerJoin('User', 'User_Thread.user_id', 'User.id').where('thread_id', threadId),

  setRead: (userId: number, threadId: number, read: boolean) =>
    db.write('User_Thread').where('user_id', userId).andWhere('thread_id', threadId).update('thread_read', read),
});
