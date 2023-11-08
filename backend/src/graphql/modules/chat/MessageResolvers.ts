import { ContextualResolverWithParent, Message, User } from '../../../types';

export const messageSenderResolver: ContextualResolverWithParent<User, Message> = async (parent, _, { dataSources }) =>
  (await dataSources.sql.users.getById(parent.sender_id)) as unknown as User;
