import {
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
  { id },
  _,
  { dataSources },
) =>
  await dataSources.sql.db
    .query('Event_EventType')
    .innerJoin('EventType', 'Event_EventType.event_type_id', 'EventType.id')
    .where('event_id', id);

export const eventParticipantsResolver: ContextualResolverWithParent<Array<User>, Event> = async (
  { id },
  _,
  { dataSources },
) =>
  await dataSources.sql.db.query('Event_User').innerJoin('User', 'Event_User.user_id', 'User.id').where('event_id', id);

export const getEventByIdResolver: ContextualResolver<Event | null, QueryGetEventByIdArgs> = async (
  _,
  { id },
  { dataSources },
) => await dataSources.sql.events.getById(id);

