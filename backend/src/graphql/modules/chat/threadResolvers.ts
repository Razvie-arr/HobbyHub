import { GraphQLError } from 'graphql/error';

import {
  ContextualResolver,
  ContextualResolverWithParent,
  Message,
  MutationReadThreadArgs,
  QueryThreadsArgs,
  Thread,
  User,
} from '../../../types';

export const threadsResolver: ContextualResolver<Array<Thread>, QueryThreadsArgs> = async (
  _,
  { userId, offset, limit },
  { dataSources },
) => dataSources.sql.threads.getAllByUserId(userId, offset, limit);

export const threadUsersResolver: ContextualResolverWithParent<Array<User>, Thread> = async (
  parent,
  _,
  { dataSources },
) => await dataSources.sql.threads.getUsers(parent.id);

export const threadMessagesResolver: ContextualResolverWithParent<Array<Message>, Thread> = async (
  parent,
  _,
  { dataSources },
) => await dataSources.sql.threads.getMessages(parent.id);

export const threadLastMessageResolver: ContextualResolverWithParent<Message, Thread> = async (
  parent,
  _,
  { dataSources },
) => await dataSources.sql.threads.getLastMessage(parent.id);

export const editReadThreadResolver: ContextualResolver<string, MutationReadThreadArgs> = async (
  _,
  { userId, threadId, read },
  { dataSources },
) => {
  const dbResponse = await dataSources.sql.threads.setRead(userId, threadId, read);
  if (!dbResponse) {
    throw new GraphQLError('Error when changing thread read status');
  }
  return 'Thread read status changed!';
};
