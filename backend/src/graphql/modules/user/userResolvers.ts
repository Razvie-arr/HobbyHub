import { GraphQLError } from 'graphql/error';

import { GOOGLE_API_KEY } from '../../../config';
import {
  ContextualNullableResolver,
  ContextualResolver,
  ContextualResolverWithParent,
  CustomContext,
  EventType,
  Location,
  MutationEditUserArgs,
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

  if (!user.location_id) {
    throw new GraphQLError('User location_id must be filled!');
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
