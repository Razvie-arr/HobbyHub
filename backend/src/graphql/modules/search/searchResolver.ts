import { CustomContext, Event, Group, QuerySearchEventsArgs, QuerySearchGroupsArgs } from '../../../types';

export const searchEventsResolver = async (
  _: unknown,
  { text, offset, limit }: QuerySearchEventsArgs,
  { dataSources }: CustomContext,
): Promise<Array<Event>> => {
  offset = offset ?? 0;
  limit = limit ?? 100;
  return dataSources.sql.executeSearchByEventNameAuthorName(text, offset, limit);
};

export const searchGroupsResolver = async (
  _: unknown,
  { text, offset, limit }: QuerySearchGroupsArgs,
  { dataSources }: CustomContext,
): Promise<Array<Group>> => {
  offset = offset ?? 0;
  limit = limit ?? 100;
  return dataSources.sql.executeSearchByGroupNameAdminName(text, offset, limit);
};
