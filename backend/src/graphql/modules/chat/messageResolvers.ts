import { GraphQLError } from 'graphql/error';

import { ContextualResolverWithParent, CustomContext, Message, MutationSendMessageArgs, User } from '../../../types';

export const messageSenderResolver: ContextualResolverWithParent<User, Message> = async (parent, _, { dataSources }) =>
  (await dataSources.sql.users.getById(parent.sender_id)) as unknown as User;

export const sendMessageResolver = async (
  _: unknown,
  { senderId, recipientId, text }: MutationSendMessageArgs,
  { dataSources }: CustomContext,
): Promise<string> =>
  await dataSources.sql.db.write
    .transaction(async (trx) => {
      const currentDateTime = new Date().toISOString().slice(0, 19).replace('T', ' ');

      let threadIdDb;
      let newThreadCreated = false;

      const foundThreadBetweenUsersId = (
        await trx('User_Thread')
          .select('thread_id')
          .whereIn('user_id', [senderId, recipientId])
          .groupBy('thread_id')
          .havingRaw('COUNT(DISTINCT user_id) = 2')
      )[0];
      if (foundThreadBetweenUsersId) {
        threadIdDb = foundThreadBetweenUsersId.thread_id;
      } else {
        threadIdDb = (await trx('Thread').insert({ last_message_at: currentDateTime, thread_read: false }, 'id'))[0];
        newThreadCreated = true;
      }

      if (newThreadCreated) {
        await trx('User_Thread').insert({ user_id: senderId, thread_id: threadIdDb as number });
        await trx('User_Thread').insert({ user_id: recipientId, thread_id: threadIdDb as number });
      }

      const messageId = (
        await trx('Message').insert(
          {
            thread_id: threadIdDb,
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
