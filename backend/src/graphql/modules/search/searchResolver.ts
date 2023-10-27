import { CustomContext, Event, QuerySearchEventsArgs } from '../../../types';

export const searchEventsResolver = async (
  _: unknown,
  { text, offset, limit }: QuerySearchEventsArgs,
  { dataSources }: CustomContext,
): Promise<Array<Event>> => {
  offset = offset ?? 0;
  limit = limit ?? 100;
  return dataSources.sql.executeSearchByEventNameAuthorName(text, offset, limit);
};
