import { GraphQLError } from 'graphql/error';

import {
  ContextualResolver,
  ContextualResolverWithParent,
  CustomContext,
  Message,
  MutationSendMessageArgs,
  QueryMessagesByThreadIdArgs,
  User,
} from '../../../types';

export const messageSenderResolver: ContextualResolverWithParent<User, Message> = async (parent, _, { dataSources }) =>
  (await dataSources.sql.users.getById(parent.sender_id)) as unknown as User;

export const messagesByThreadIdResolver: ContextualResolver<Array<Message>, QueryMessagesByThreadIdArgs> = async (
  _,
  { threadId, offset, limit },
  { dataSources },
) => await dataSources.sql.messages.getAllByThreadId(threadId, offset, limit);

export const sendMessageResolver = async (
  _: unknown,
  { senderId, recipientId, text }: MutationSendMessageArgs,
  { dataSources }: CustomContext,
): Promise<string> =>
  await dataSources.sql.db.write
    .transaction(async (trx) => {
      const currentDateTime = new Date().toISOString().slice(0, 19).replace('T', ' ');

      let threadId;
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
      } else {
        threadId = (await trx('Thread').insert({ last_message_at: currentDateTime }, 'id'))[0];
        newThreadCreated = true;
      }

      if (newThreadCreated) {
        await trx('User_Thread').insert({ user_id: senderId, thread_id: threadId as number });
        await trx('User_Thread').insert({ user_id: recipientId, thread_id: threadId as number });
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
      )[0];

      return `Message with id ${messageId} sent`;
    })
    .catch((error) => {
      throw new GraphQLError(error);
    });
