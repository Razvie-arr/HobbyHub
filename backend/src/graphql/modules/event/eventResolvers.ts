import { GraphQLError } from 'graphql/error';

import { GOOGLE_API_KEY } from '../../../config';
import { getSQLDataSource } from '../../../datasource';
import { HAVERSINE_FORMULA } from '../../../sharedConstants';
import {
  ContextualNullableResolver,
  ContextualResolver,
  ContextualResolverWithParent,
  CustomContext,
  Event,
  EventType,
  Location,
  MutationCreateEventArgs,
  MutationDeleteEventArgs,
  MutationEditEventArgs,
  QueryEventByIdArgs,
  QueryEventsArgs,
  QueryEventsByIdsArgs,
  QueryFilterEventsArgs,
  QueryInterestingNearbyEventsArgs,
  QueryNewlyCreatedNearbyEventsArgs,
  QuerySimilarEventsArgs,
  QueryTodaysNearbyEventsArgs,
  User,
} from '../../../types';
import { createEventInput, createLocationInput } from '../../../utils/helpers';

const DEFAULT_DISTANCE = 20;
const DEFAULT_LIMIT = 4;
const MINIMUM_COUNT_SIMILAR_EVENTS = 3;

export const eventsResolver: ContextualResolver<Array<Event>, QueryEventsArgs> = async (
  _,
  { offset, limit },
  { dataSources },
) => await dataSources.sql.events.getAll(offset, limit, { value: 'created_at', order: 'desc' });

export const eventAuthorResolver: ContextualResolverWithParent<User, Event> = async (parent, _, { dataSources }) =>
  parent.author_id
    ? ((await dataSources.sql.users.getById(parent.author_id)) as unknown as User)
    : (null as unknown as User);

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

export const eventsByIdsResolver: ContextualResolver<Array<Event>, QueryEventsByIdsArgs> = async (
  _,
  { ids },
  { dataSources },
) => await dataSources.sql.events.getByIds(ids);

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
    .orderBy('created_at', 'desc')
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
    .distinct(...locationAwareEventAttributes)
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
export const createEventResolver = async (
  _: unknown,
  { location, event }: MutationCreateEventArgs,
  { dataSources, googleMapsClient }: CustomContext,
) => {
  if (event.author_id && event.group_id) {
    throw new GraphQLError("Event can't have both author_id and group_id!");
  }

  const geocodeResult = await googleMapsClient.geocode({
    params: {
      address: `${location.street_name} ${location.street_number} ${location.city} ${location.country}`,
      // @ts-expect-error
      key: GOOGLE_API_KEY,
    },
  });

  const firstAddress = geocodeResult.data.results[0];

  if (!firstAddress) {
    throw new GraphQLError(`Error while looking up location coordinates!`);
  }

  const { lat, lng } = firstAddress.geometry.location;

  const dbLocationResponse = await dataSources.sql.db
    .write('Location')
    .insert(createLocationInput({ ...location, latitude: lat, longitude: lng }));

  if (!dbLocationResponse[0]) {
    throw new GraphQLError(`Error while creating Location!`);
  }

  event.location_id = dbLocationResponse[0];

  const dbResponse = await dataSources.sql.db.write('Event').insert(createEventInput(event));
  if (!dbResponse[0]) {
    throw new GraphQLError(`Error while creating event!`);
  }

  const dbResult = await dataSources.sql.events.getById(dbResponse[0]);

  if (!dbResult) {
    throw new GraphQLError(`Error while querying just created event - it should exist but doesn't!`);
  }

  const event_id = dbResponse[0];
  // Use map to create an array of insert promises
  const insertPromises = event.event_type_ids.map((eventTypeId) =>
    dataSources.sql.db.write('Event_EventType').insert({ event_id: event_id, event_type_id: eventTypeId }),
  );

  // Await all insertions
  const dbEventEventTypeResponses = await Promise.all(insertPromises);

  // Check if any of the insertions failed
  if (dbEventEventTypeResponses.some((response) => !response)) {
    throw new GraphQLError(`Error while inserting into Event_EventType table!`);
  }

  return dbResult;
};

export const editEventResolver = async (
  _: unknown,
  { location, event }: MutationEditEventArgs,
  { dataSources, googleMapsClient }: CustomContext,
) => {
  if (!event.id) {
    throw new GraphQLError('Event ID needs to be filled in order to update!');
  }
  if (event.author_id && event.group_id) {
    throw new GraphQLError("Event can't have both author_id and group_id!");
  }
  if (!location.id && !event.location_id) {
    throw new GraphQLError('Location ID needs to be filled in order to update!');
  }
  if (event.event_type_ids.some((eventTypeId) => !eventTypeId)) {
    throw new GraphQLError('EventTypeId needs to be filled in order to update!');
  }

  const geocodeResult = await googleMapsClient.geocode({
    params: {
      address: `${location.street_name} ${location.street_number} ${location.city} ${location.country}`,
      // @ts-expect-error
      key: GOOGLE_API_KEY,
    },
  });

  const firstAddress = geocodeResult.data.results[0];

  if (!firstAddress) {
    throw new GraphQLError(`Error while looking up location coordinates!`);
  }

  const { lat, lng } = firstAddress.geometry.location;

  const locationId = location.id ? location.id : event.location_id;
  const dbLocationResponse = await dataSources.sql.db
    .write('Location')
    .where('id', locationId)
    .update(createLocationInput({ ...location, latitude: lat, longitude: lng }));

  if (!dbLocationResponse) {
    throw new GraphQLError(`Error while updating location!`);
  }

  const event_id = event.id;
  const dbDeleteEventEventTypeResponse = await dataSources.sql.db
    .write('Event_EventType')
    .where('event_id', event_id)
    .delete();

  if (!dbDeleteEventEventTypeResponse) {
    throw new GraphQLError(`Error while updating Event_EventType table part 1!`);
  }
  // Use map to create an array of insert promises
  const insertPromises = event.event_type_ids.map((eventTypeId) =>
    dataSources.sql.db
      .write('Event_EventType')
      .where('event_id', event_id)
      .insert({ event_id: event_id, event_type_id: eventTypeId }),
  );

  // Await all insertions
  const dbEventEventTypeResponses = await Promise.all(insertPromises);

  // Check if any of the insertions failed
  if (dbEventEventTypeResponses.some((response) => !response)) {
    throw new GraphQLError(`Error while updating Event_EventType table part 2!`);
  }

  const dbResponse = await dataSources.sql.db.write('Event').where('id', '=', event.id).update(createEventInput(event));

  if (!dbResponse) {
    throw new GraphQLError(`Error while updating event!`);
  }

  const dbResult = await dataSources.sql.events.getById(event.id);

  if (!dbResult) {
    throw new GraphQLError(`Error while querying just created event - it should exist but doesn't!`);
  }

  return dbResult;
};

export const deleteEventResolver = async (
  _: unknown,
  { event_id, location_id }: MutationDeleteEventArgs,
  { dataSources }: CustomContext,
) => {
  const dbEventEventTypeResult = await dataSources.sql.db.write('Event_EventType').where('event_id', event_id).delete();

  if (!dbEventEventTypeResult) {
    throw new GraphQLError(`Error while deleting event from Event_EventType table!`);
  }

  const dbEventResult = await dataSources.sql.db.write('Event').where('id', event_id).delete();

  if (!dbEventResult) {
    throw new GraphQLError(`Error while deleting event!`);
  }

  const dbLocationResult = await dataSources.sql.db.write('Location').where('id', location_id).delete();

  if (!dbLocationResult) {
    throw new GraphQLError(`Error while deleting location!`);
  }
  return 'Event and location deleted!';
};

export const filterEventResolver = async (
  _: unknown,
  { eventTypeIds, start_datetime, end_datetime, filterLocation, offset, limit, sort }: QueryFilterEventsArgs,
  { dataSources }: CustomContext,
): Promise<Array<Event>> => {
  offset = offset ?? 0;
  limit = limit ?? DEFAULT_LIMIT;
  const events = await dataSources.sql.getFilteredEvents(
    offset,
    limit,
    eventTypeIds,
    start_datetime,
    end_datetime,
    filterLocation,
    sort ? sort.toString() : null,
  );
  return events[0];
};
