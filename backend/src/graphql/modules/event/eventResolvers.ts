import {
  ContextualNullableResolver,
  ContextualResolver,
  ContextualResolverWithParent,
  Event,
  EventType,
  Location,
  QueryGetEventByIdArgs,
  User,
} from '../../../types';

export const getEventsResolver: ContextualResolver<Array<Event>> = async (_, __, { dataSources }) =>
  await dataSources.sql.events.getAll();

export const eventAuthorResolver: ContextualResolverWithParent<User, Event> = async (parent, _, { dataSources }) =>
  (await dataSources.sql.users.getById(parent.author_id)) as unknown as User;

export const eventLocationResolver: ContextualResolverWithParent<Location, Event> = async (
  parent,
  _,
  { dataSources },
) => (await dataSources.sql.locations.getById(parent.location_id)) as unknown as Location;

export const eventEventTypesResolver: ContextualResolverWithParent<Array<EventType>, Event> = async (
  parent,
  _,
  { dataSources },
) => await dataSources.sql.events.getEventEventTypes(parent.id);

export const eventParticipantsResolver: ContextualResolverWithParent<Array<User>, Event> = async (
  parent,
  _,
  { dataSources },
) => await dataSources.sql.events.getEventParticipants(parent.id);

export const getEventByIdResolver: ContextualNullableResolver<Event, QueryGetEventByIdArgs> = async (
  _,
  { id },
  { dataSources },
) => await dataSources.sql.events.getById(id);

