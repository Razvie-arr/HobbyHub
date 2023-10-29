import { GraphQLError } from 'graphql/error';

import { GOOGLE_API_KEY } from '../../../config';
import {
  AuthUser,
  ContextualNullableResolver,
  ContextualResolver,
  ContextualResolverWithParent,
  CustomContext,
  EventType,
  Location,
  MutationEditUserArgs,
  MutationOnboardUserArgs,
  QueryUserByIdArgs,
  QueryUsersArgs,
  QueryUsersByIdsArgs,
  User,
} from '../../../types';
import { createLocationInput, createUserInput } from '../../../utils/helpers';

export const usersResolver: ContextualResolver<Array<User>, QueryUsersArgs> = async (
  _,
  { offset, limit },
  { dataSources },
) => await dataSources.sql.users.getAll(offset, limit);

export const userByIdResolver: ContextualNullableResolver<User, QueryUserByIdArgs> = async (
  _,
  { id },
  { dataSources },
) => await dataSources.sql.users.getById(id);

export const usersByIdsResolver: ContextualResolver<Array<User>, QueryUsersByIdsArgs> = async (
  _,
  { ids },
  { dataSources },
) => await dataSources.sql.users.getByIds(ids);

export const userEventTypesResolver: ContextualResolverWithParent<Array<EventType>, User> = async (
  parent,
  _,
  { dataSources },
) => await dataSources.sql.users.getUserEventTypes(parent.id);

export const userLocationResolver: ContextualResolverWithParent<Location, User> = async (parent, _, { dataSources }) =>
  parent.location_id
    ? ((await dataSources.sql.locations.getById(parent.location_id)) as unknown as Location)
    : (null as unknown as Location);

export const editUserResolver = async (
  _: unknown,
  { location, user }: MutationEditUserArgs,
  { dataSources, googleMapsClient }: CustomContext,
) => {
  if (!user.id) {
    throw new GraphQLError('User id must be filled!');
  }
  if (!user.location_id && !location.id) {
    throw new GraphQLError('Location id must be filled!');
  }
  if (user.event_type_ids.some((eventTypeId) => !eventTypeId)) {
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

  const locationId = location.id ? location.id : user.location_id;
  const dbLocationResponse = await dataSources.sql.db
    .write('Location')
    .where('id', locationId)
    .update(createLocationInput({ ...location, latitude: lat, longitude: lng }));

  if (!dbLocationResponse) {
    throw new GraphQLError(`Error while updating Location!`);
  }

  const user_id = user.id;
  //Swap old Event Types for new ones
  const dbDeleteUserEventTypeResponse = await dataSources.sql.db
    .write('User_EventType')
    .where('user_id', user_id)
    .delete();

  if (!dbDeleteUserEventTypeResponse) {
    throw new GraphQLError(`Error while updating User_EventType table part 1!`);
  }
  // Use map to create an array of insert promises
  const insertPromises = user.event_type_ids.map((eventTypeId) =>
    dataSources.sql.db.write('User_EventType').insert({ user_id: user_id, event_type_id: eventTypeId }),
  );

  // Await all insertions
  const dbUserEventTypeResponses = await Promise.all(insertPromises);

  // Check if any of the insertions failed
  if (dbUserEventTypeResponses.some((response) => !response)) {
    throw new GraphQLError(`Error while updating User_EventType table part 2!`);
  }
  const dbUpdateUserResponse = await dataSources.sql.db
    .write('User')
    .where('id', user.id)
    .update(createUserInput(user));

  if (!dbUpdateUserResponse) {
    throw new GraphQLError(`Error while updating User!`);
  }

  const dbUserResponse = await dataSources.sql.users.getById(user.id);

  if (!dbUserResponse) {
    throw new GraphQLError(`Error while fetching User!`);
  }

  return dbUserResponse;
};

export const onboardUserResolver = async (
  _: unknown,
  { user, location }: MutationOnboardUserArgs,
  { dataSources, googleMapsClient }: CustomContext,
): Promise<AuthUser> => {
  if (user.event_type_ids.some((eventTypeId) => !eventTypeId)) {
    throw new GraphQLError('EventTypeId needs to be filled in order to onboard!');
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
    throw new GraphQLError(`Error while inserting Location!`);
  }

  user.location_id = dbLocationResponse[0];

  const dbUpdateUserResponse = await dataSources.sql.db
    .write('User')
    .where('id', user.id)
    .update(createUserInput(user));

  if (!dbUpdateUserResponse) {
    throw new GraphQLError(`Error while updating User!`);
  }

  const dbUpdatedUserResponse = await dataSources.sql.users.getById(user.id);

  if (!dbUpdatedUserResponse) {
    throw new GraphQLError(`Error while fetching User!`);
  }

  // Use map to create an array of insert promises
  const insertPromises = user.event_type_ids.map((eventTypeId) =>
    dataSources.sql.db.write('User_EventType').insert({ user_id: user.id, event_type_id: eventTypeId }),
  );

  // Await all insertions
  const dbUserEventTypeResponses = await Promise.all(insertPromises);

  // Check if any of the insertions failed
  if (dbUserEventTypeResponses.some((response) => !response)) {
    throw new GraphQLError(`Error while inserting into User_EventType table!`);
  }

  const dbUserResponse = await dataSources.sql.users.getById(user.id);

  if (!dbUserResponse) {
    throw new GraphQLError(`Error while fetching User!`);
  }

  // eslint-disable-next-line @typescript-eslint/prefer-ts-expect-error
  // @ts-ignore
  return dbUserResponse;
};

