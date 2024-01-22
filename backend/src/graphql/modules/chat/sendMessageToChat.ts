import { GraphQLError } from 'graphql/error';

import { getSQLDataSource } from '../../../datasource';

export const sendMessageToChat = async (senderId: number, recipientId: number, text: string): Promise<string> =>
  await getSQLDataSource()
    .db.write.transaction(async (trx) => {
      const currentDateTime = new Date().toISOString().slice(0, 19).replace('T', ' ');

      let threadId: number;
      let newThreadCreated = false;

      const foundThreadBetweenUsersId = (
        await trx('User_Thread')
          .select('thread_id')
          .whereIn('user_id', [senderId, recipientId])
          .groupBy('thread_id')
          .havingRaw('COUNT(DISTINCT user_id) = 2')
      )[0];
      if (foundThreadBetweenUsersId) {
        threadId = foundThreadBetweenUsersId.thread_id;
        await trx('Thread').update({ last_message_at: currentDateTime }).where('id', threadId);
      } else {
        threadId = (await trx('Thread').insert({ last_message_at: currentDateTime }, 'id'))[0] as unknown as number;
        newThreadCreated = true;
      }

      if (newThreadCreated) {
        await trx('User_Thread').insert({ user_id: senderId, thread_id: threadId });
        await trx('User_Thread').insert({ user_id: recipientId, thread_id: threadId });
      }

      await trx('User_Thread').where('user_id', senderId).andWhere('thread_id', threadId).update('thread_read', true);
      await trx('User_Thread')
        .where('user_id', recipientId)
        .andWhere('thread_id', threadId)
        .update('thread_read', false);

      const messageId = (
        await trx('Message').insert(
          {
            thread_id: threadId,
            sender_id: senderId,
            text: text,
            sent_at: currentDateTime,
          },
          ['id'],
        )
      )[0] as unknown as number;

      return `Message with id ${messageId} sent`;
    })
    .catch((error) => {
      throw new GraphQLError(error);
    });
