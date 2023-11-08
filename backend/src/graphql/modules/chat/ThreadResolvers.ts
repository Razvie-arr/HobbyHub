import {
  ContextualNullableResolver,
  ContextualResolver,
  ContextualResolverWithParent,
  Message,
  QueryThreadByIdArgs,
  QueryThreadsArgs,
  Thread,
  User,
} from '../../../types';

export const threadsResolver: ContextualResolver<Array<Thread>, QueryThreadsArgs> = async (
  _,
  { userId },
  { dataSources },
) => await dataSources.sql.threads.getAllByUserId(userId);
export const threadByIdResolver: ContextualNullableResolver<Thread, QueryThreadByIdArgs> = async (
  _,
  { id },
  { dataSources },
) => await dataSources.sql.threads.getById(id);

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
) => {
  const message = await dataSources.sql.threads.getLastMessage(parent.id);
  console.log(message);
  return message as unknown as Message;
};
