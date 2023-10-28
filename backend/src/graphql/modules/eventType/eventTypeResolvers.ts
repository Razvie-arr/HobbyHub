import {
  EventType,
  QueryEventTypeByIdArgs,
  QueryEventTypesArgs,
  QueryEventTypesByIdsArgs,
} from '../../../types/graphqlTypesGenerated';
import { ContextualNullableResolver, ContextualResolver } from '../../../types/types';

export const eventTypesResolver: ContextualResolver<Array<EventType>, QueryEventTypesArgs> = async (
  _,
  { offset, limit },
  { dataSources },
) => await dataSources.sql.eventTypes.getAll(offset, limit);

export const eventTypeByIdResolver: ContextualNullableResolver<EventType, QueryEventTypeByIdArgs> = async (
  _,
  { id },
  { dataSources },
) => await dataSources.sql.eventTypes.getById(id);

export const eventTypesByIdsResolver: ContextualResolver<Array<EventType>, QueryEventTypesByIdsArgs> = async (
  _,
  { ids },
  { dataSources },
) => await dataSources.sql.eventTypes.getByIds(ids);
