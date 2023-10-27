import { GraphQLError } from 'graphql/error';

import { GOOGLE_API_KEY } from '../../../config';
import {
  ContextualNullableResolver,
  ContextualResolver,
  ContextualResolverWithParent,
  CustomContext,
  Event,
  EventInput,
  EventType,
  Location,
  LocationInput,
  MutationCreateEventArgs,
  MutationDeleteEventArgs,
  MutationEditEventArgs,
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
const DEFAULT_DISTANCE = 100;
const DEFAULT_LIMIT = 5;
const MINIMUM_COUNT_SIMILAR_EVENTS = 3;

export const eventsResolver: ContextualResolver<Array<Event>, QueryEventsArgs> = async (
  _,
  { offset, limit },
  { dataSources },
) => await dataSources.sql.events.getAll(offset, limit);

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
    throw new GraphQLError(`Error while creating location!`);
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

  return dbResult;
};

export const editEventResolver = async (
  _: unknown,
  { location, event }: MutationEditEventArgs,
  { dataSources, googleMapsClient }: CustomContext,
) => {
  if (event.author_id && event.group_id) {
    throw new GraphQLError("Event can't have both author_id and group_id!");
  }
  if (!location.id) {
    throw new GraphQLError('Location ID needs to be filled in order to update!');
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
    .where('id', '=', location.id)
    .update(createLocationInput({ ...location, latitude: lat, longitude: lng }));

  if (!dbLocationResponse) {
    throw new GraphQLError(`Error while updating location!`);
  }

  if (!event.id) {
    throw new GraphQLError('Event ID needs to be filled in order to update!');
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
  const dbLocationResult = await dataSources.sql.db.write('Location').where('id', location_id).delete();

  if (!dbLocationResult) {
    throw new GraphQLError(`Error while deleting location!`);
  }

  const dbEventResult = await dataSources.sql.db.write('Event').where('id', event_id).delete();

  if (!dbEventResult) {
    throw new GraphQLError(`Error while deleting event!`);
  }
  return 'Event and location deleted!';
};

function createEventInput(event: EventInput) {
  return {
    name: getValue(event.name),
    summary: getValue(event.summary),
    description: getValue(event.description),
    image_filePath: getValue(event.image_filePath),
    start_datetime: getValue(event.start_datetime),
    end_datetime: getValue(event.end_datetime),
    capacity: getValue(event.capacity),
    allow_waitlist: getValue(event.allow_waitlist),

    author_id: getValue(event.author_id),
    group_id: getValue(event.group_id),
    location_id: getValue(event.location_id),
  };
}

function createLocationInput(location: LocationInput) {
  return {
    id: getValue(location.id),
    country: getValue(location.country),
    city: getValue(location.city),
    street_name: getValue(location.street_name),
    street_number: getValue(location.street_number),
    additional_information: getValue(location.additional_information),
    latitude: getValue(location.latitude),
    longitude: getValue(location.longitude),
  };
}

function getValue<Type>(input: Type) {
  return input ? input : undefined;
}

