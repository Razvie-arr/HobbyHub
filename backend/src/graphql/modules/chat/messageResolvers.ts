import { GraphQLError } from 'graphql/error';

import { getSQLDataSource } from '../../../datasource';
import { sendEmail } from '../../../libs/nodeMailer';
import {
  ContextualResolver,
  ContextualResolverWithParent,
  CustomContext,
  Message,
  MutationSendMessageArgs,
  QueryMessagesByThreadIdArgs,
  User,
} from '../../../types';

const MESSAGE_NOTIFICATION_SUBJECT = 'New message in HobbyHub';

export const messageSenderResolver: ContextualResolverWithParent<User, Message> = async (parent, _, { dataSources }) =>
  (await dataSources.sql.users.getById(parent.sender_id)) as unknown as User;

export const messagesByThreadIdResolver: ContextualResolver<Array<Message>, QueryMessagesByThreadIdArgs> = async (
  _,
  { threadId, offset, limit },
  { dataSources },
) => await dataSources.sql.messages.getAllByThreadId(threadId, offset, limit);

export const sendMessageResolver = async (
  _: unknown,
  { sender, recipient, text }: MutationSendMessageArgs,
  { requestSenderUrl }: CustomContext,
): Promise<string> => {
  const response: string = await sendMessage(sender.id, recipient.id, text);

  await sendEmailNotification(sender.first_name, recipient.first_name, recipient.email, requestSenderUrl);
  return response;
};

const sendMessage = async (senderId: number, recipientId: number, text: string): Promise<string> =>
  await getSQLDataSource()
    .db.write.transaction(async (trx) => {
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
        await trx('Thread').update({ last_message_at: currentDateTime }).where('id', threadId);
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

const sendEmailNotification = async (
  senderName: string,
  recipientName: string,
  recipientEmail: string,
  frontendUrl: string,
) => {
  const emailTextMessage = `Hi ${recipientName}! You just got a new message from ${senderName}\n View messages using this link ${frontendUrl}/messages`;
  const emailHtmlMessage = `Hi ${recipientName}! You just got a new message from ${senderName} <br> View messages using this <a href="${frontendUrl}/messages">link </a>`;

  try {
    await sendEmail(recipientEmail, MESSAGE_NOTIFICATION_SUBJECT, {
      text: emailTextMessage,
      html: emailHtmlMessage,
    });
  } catch (error) {
    throw error;
  }
};
