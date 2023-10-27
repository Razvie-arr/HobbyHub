import { EventType } from '../../../types/graphqlTypesGenerated';
import { type CustomContext } from '../../../types/types';

export const eventTypesResolver = async (
  _: unknown,
  __: unknown,
  { dataSources }: CustomContext,
): Promise<Array<EventType>> => await dataSources.sql.eventTypes.getAll(0, 100);

export const eventTypeResolver = async (
  _: unknown,
  { id }: { id: number },
  { dataSources }: CustomContext,
): Promise<EventType | null> => await dataSources.sql.eventTypes.getById(id);
