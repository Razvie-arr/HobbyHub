import { CustomContext, Event, Group, QuerySearchEventsArgs, QuerySearchGroupsArgs } from '../../../types';

export const searchEventsResolver = async (
  _: unknown,
  { text, user_id, offset, limit }: QuerySearchEventsArgs,
  { dataSources }: CustomContext,
): Promise<Array<Event>> => {
  offset = offset ?? 0;
  limit = limit ?? 100;
  return dataSources.sql.search.executeSearchByEventNameAuthorNameGroupName(text, offset, limit, user_id);
};

export const searchGroupsResolver = async (
  _: unknown,
  { text, user_id, offset, limit }: QuerySearchGroupsArgs,
  { dataSources }: CustomContext,
): Promise<Array<Group>> => {
  offset = offset ?? 0;
  limit = limit ?? 100;
  return dataSources.sql.search.executeSearchByGroupNameAdminName(text, offset, limit, user_id);
};
