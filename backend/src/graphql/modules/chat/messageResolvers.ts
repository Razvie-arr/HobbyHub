import { sendGotMessageEmail } from '../../../emails/chat/sendGotMessageEmail';
import {
  ContextualResolver,
  ContextualResolverWithParent,
  CustomContext,
  Message,
  MutationSendMessageArgs,
  QueryMessagesByThreadIdArgs,
  User,
} from '../../../types';

import { sendMessageToChat } from './sendMessageToChat';

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
  { serverUrl }: CustomContext,
): Promise<string> => {
  const response: string = await sendMessageToChat(sender.id, recipient.id, text);

  await sendGotMessageEmail(recipient.first_name, recipient.email, serverUrl);
  return response;
};
