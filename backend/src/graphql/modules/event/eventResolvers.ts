import {
  ContextualNullableResolver,
  ContextualResolver,
  ContextualResolverWithParent,
  CustomContext,
  Event,
  EventType,
  Location,
  QueryEventByIdArgs,
  QueryEventsArgs,
  QueryInterestingNearbyEventsArgs,
  QueryNewlyCreatedNearbyEventsArgs,
  QuerySimilarEventsArgs,
  QueryTodaysNearbyEventsArgs,
  User,
} from '../../../types';

const HAVERSINE_FORMULA = ` (
      6371 * acos(
        cos(
          radians(?)
        ) * cos(
          radians(latitude)
        ) * cos(
          radians(longitude) - radians(?)
        ) + sin(
          radians(?)
        ) * sin(
          radians(latitude)
        )
      )
    )`;
const DEFAULT_DISTANCE = 20;
const DEFAULT_LIMIT = 5;
const MINIMUM_COUNT_SIMILAR_EVENTS = 3;

export const eventsResolver: ContextualResolver<Array<Event>, QueryEventsArgs> = async (
  _,
  { offset, limit },
  { dataSources },
) => await dataSources.sql.events.getAll(offset, limit);

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

export const eventByIdResolver: ContextualNullableResolver<Event, QueryEventByIdArgs> = async (
  _,
  { id },
  { dataSources },
) => await dataSources.sql.events.getById(id);

const locationAwareEventAttributes = [
  'Event.id as id',
  'name',
  'summary',
  'description',
  'author_id',
  'capacity',
  'allow_waitlist',
  'image_filepath',
  'start_datetime',
  'end_datetime',
  'location_id',
  'created_at',
  'country',
  'city',
  'street_name',
  'street_number',
  'additional_information',
  'latitude',
  'longitude',
];

export const newlyCreatedNearbyEventsResolver = async (
  _: unknown,
  { longitude, latitude, offset, limit }: QueryNewlyCreatedNearbyEventsArgs,
  { dataSources }: CustomContext,
): Promise<Array<Event>> => {
  const distance = dataSources.sql.db.query.raw(HAVERSINE_FORMULA, [latitude, longitude, latitude]);
  const result = dataSources.sql.db.query
    .select(...locationAwareEventAttributes)
    .from('Event')
    .join('Location', 'Event.location_id', '=', 'Location.id')
    .having(distance, '<', DEFAULT_DISTANCE)
    .orderBy('created_at')
    .offset(offset ?? 0);
  return limit ? result.limit(limit) : result;
};

export const todaysNearbyEventsResolver = async (
  _: unknown,
  { longitude, latitude, offset, limit }: QueryTodaysNearbyEventsArgs,
  { dataSources }: CustomContext,
): Promise<Array<Event>> => {
  const distance = dataSources.sql.db.query.raw(HAVERSINE_FORMULA, [latitude, longitude, latitude]);
  const todaysDate = new Date().toISOString().split('T')[0];
  const result = dataSources.sql.db.query
    .select(...locationAwareEventAttributes)
    .from('Event')
    .join('Location', 'Event.location_id', '=', 'Location.id')
    .having(distance, '<', DEFAULT_DISTANCE)
    .whereRaw('DATE(start_datetime) = ?', [todaysDate])
    .orderByRaw(distance)
    .offset(offset ?? 0);
  return limit ? result.limit(limit) : result.limit(DEFAULT_LIMIT);
};

export const interestingNearbyEventsResolver = async (
  _: unknown,
  { latitude, longitude, userId, offset, limit }: QueryInterestingNearbyEventsArgs,
  { dataSources }: CustomContext,
): Promise<Array<Event>> => {
  const distance = dataSources.sql.db.query.raw(HAVERSINE_FORMULA, [latitude, longitude, latitude]);
  const result = dataSources.sql.db.query
    .select(...locationAwareEventAttributes)
    .from('Event')
    .join('Event_EventType', 'Event.id', 'Event_EventType.event_id')
    .join('User_EventType', 'Event_EventType.event_type_id', 'User_EventType.event_type_id')
    .join('Location', 'Event.location_id', '=', 'Location.id')
    .where('User_EventType.user_id', '=', userId)
    .having(distance, '<', DEFAULT_DISTANCE)
    .offset(offset ?? 0);
  return limit ? result.limit(limit) : result.limit(DEFAULT_LIMIT);
};

export const similarEventsResolver = async (
  _: unknown,
  { eventId, city, eventTypeIds, offset, limit }: QuerySimilarEventsArgs,
  { dataSources }: CustomContext,
): Promise<Array<Event>> => {
  offset = offset ?? 0;
  limit = limit ?? DEFAULT_LIMIT;

  const similarEventsWithinSameCity: Array<Event> = await dataSources.sql.getEventsWithSameTypeInCity(
    eventId,
    eventTypeIds,
    city,
    offset,
    limit,
  );

  const similarEventsCount = similarEventsWithinSameCity.length;

  if (similarEventsCount < MINIMUM_COUNT_SIMILAR_EVENTS) {
    const similarEventsOutsideCity = await dataSources.sql.getEventsWithSameTypeExceptCity(
      eventId,
      eventTypeIds,
      city,
      0,
      limit - similarEventsCount,
    );
    return [...similarEventsWithinSameCity, ...similarEventsOutsideCity];
  }

  return similarEventsWithinSameCity;
};
