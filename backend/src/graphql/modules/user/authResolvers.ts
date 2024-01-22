import * as argon2 from 'argon2';
import { GraphQLError } from 'graphql/error';

import { sendResetPasswordEmail } from '../../../emails/user/sendResetPasswordEmail';
import { sendVerifyAccountEmail } from '../../../emails/user/sendVerifyAccountEmail';
import { createToken, createTokenWithExpirationTime, verifyTokenWithExpirationTime } from '../../../libs/jwt';
import {
  type AuthInfo,
  AuthUser,
  ContextualNullableResolver,
  ContextualResolverWithParent,
  type CustomContext,
  EventType,
  Group,
  Location,
  MutationChangePasswordArgs,
  MutationEditAuthUserArgs,
  type MutationRequestResetPasswordArgs,
  type MutationResetPasswordArgs,
  type MutationSignInArgs,
  type MutationSignUpArgs,
  type MutationVerifyArgs,
  QueryAuthUserByIdArgs,
} from '../../../types';
import { createAuthUserInput } from '../../../utils/helpers';

const tokenExpirationTime = 60 * 60;

export const authUserByIdResolver: ContextualNullableResolver<AuthUser, QueryAuthUserByIdArgs> = async (
  _: unknown,
  { id },
  { dataSources },
  // eslint-disable-next-line @typescript-eslint/await-thenable
) => await dataSources.sql.users.getAuthById(id);

export const signInResolver = async (
  _: unknown,
  { email: rawEmail, password }: MutationSignInArgs,
  { dataSources }: CustomContext,
): Promise<AuthInfo> => {
  const email = rawEmail.toLocaleLowerCase();

  const dbResponse = await dataSources.sql.db.query.raw(`SELECT * FROM User WHERE email = ?`, [email]);

  if (dbResponse.length === 0) {
    throw new GraphQLError('User with that email was not found.');
  }

  const user = dbResponse[0][0];

  if (!user.verified) {
    throw new GraphQLError('Please verify your account with the link sent to your email address.');
  }

  if (await argon2.verify(user.password, password)) {
    const token = createToken({ id: user.id });

    return {
      user: { ...user },
      token,
    };
  }
  throw new GraphQLError('User email and password do not match.');
};

export const authUserEventTypesResolver: ContextualResolverWithParent<Array<EventType>, AuthUser> = async (
  parent,
  _,
  { dataSources },
) => await dataSources.sql.users.getUserEventTypes(parent.id);

export const authUserLocationResolver: ContextualResolverWithParent<Location | null, AuthUser> = async (
  parent,
  _,
  { dataSources },
) =>
  parent.location_id ? ((await dataSources.sql.locations.getById(parent.location_id)) as unknown as Location) : null;

export const authUserAdminGroupsResolver: ContextualResolverWithParent<Array<Group>, AuthUser> = async (
  parent,
  _,
  { dataSources },
) => await dataSources.sql.groups.getGroupsByAdminId(parent.id);

export const signUpResolver = async (
  _: unknown,
  { email: rawEmail, password, first_name, last_name }: MutationSignUpArgs,
  { dataSources, serverUrl }: CustomContext,
): Promise<AuthInfo> => {
  const email = rawEmail.toLocaleLowerCase();

  const userByEmail = (await dataSources.sql.db.query.raw(`SELECT * FROM User WHERE email = ?`, [email]))[0];

  if (userByEmail.length !== 0) {
    throw new GraphQLError('Email already registered');
  }

  const passwordHash = await argon2.hash(password);

  const dbResponse = (
    await dataSources.sql.db.write.raw(
      `INSERT INTO User (id, email, password, first_name, last_name)
    VALUES (NULL, ?, ?, ?, ?);`,
      [email, passwordHash, first_name, last_name],
    )
  )[0];

  const id = Number(dbResponse.insertId);

  const token = createToken({ id });

  const dbUpdateResponse = await dataSources.sql.db.write.raw(`UPDATE User SET token = ? WHERE id=?;`, [
    token,
    dbResponse.insertId,
  ]);

  if (!dbUpdateResponse) {
    throw new GraphQLError(`Error while registering user with id: ${dbResponse.insertId}`);
  }

  const userObject = {
    id,
    email,
    first_name,
    last_name,
    password: passwordHash,
    verified: false,
    event_types: [],
    groups: [],
    location_id: 0,
  };

  await sendVerifyAccountEmail(email, token, serverUrl);

  return { user: userObject, token: token };
};

export const verifyUserResolver = async (
  _: unknown,
  { token }: MutationVerifyArgs,
  { dataSources }: CustomContext,
): Promise<string> => {
  const dbResult = await dataSources.sql.db.write.raw(`UPDATE User SET verified = 1, token = NULL WHERE token = ?`, [
    token,
  ]);
  if (!dbResult) {
    throw new GraphQLError('User not found!');
  }

  return 'User verified!';
};

export const requestResetPasswordResolver = async (
  _: unknown,
  { email: rawEmail }: MutationRequestResetPasswordArgs,
  { dataSources, serverUrl }: CustomContext,
): Promise<boolean> => {
  const email = rawEmail.toLocaleLowerCase();

  const user = await dataSources.sql.db.query('User').where('email', email);
  if (!user || user.length === 0 || !user[0]) {
    throw new GraphQLError('User not found');
  }

  if (user.length > 1) {
    throw new GraphQLError('Multiple users found!');
  }

  const resetToken = createTokenWithExpirationTime({ id: user[0].id }, tokenExpirationTime);

  const dbUpdateResponse = await dataSources.sql.users.updateUserToken(email, resetToken);

  if (!dbUpdateResponse) {
    throw new GraphQLError("Reset token wasn't updated");
  }

  await sendResetPasswordEmail(email, resetToken, serverUrl);

  return true;
};

export const resetPasswordResolver = async (
  _: unknown,
  { password, token }: MutationResetPasswordArgs,
  { dataSources }: CustomContext,
): Promise<boolean> => {
  const user = await dataSources.sql.users.getUserByToken(token);
  if (!user) {
    throw new GraphQLError('Token is incorrect');
  }

  try {
    verifyTokenWithExpirationTime(token, tokenExpirationTime);
  } catch (error) {
    throw error;
  }

  const passwordHash = await argon2.hash(password);

  const dbUpdateResponse = await dataSources.sql.users.updatePassword(passwordHash, user);

  if (!dbUpdateResponse) {
    throw new GraphQLError('Password not changed');
  }

  return true;
};

export const editAuthUserResolver = async (
  _: unknown,
  { location, user }: MutationEditAuthUserArgs,
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

  location.id = location.id ? location.id : user.location_id;
  await dataSources.sql.locations.updateLocation(location, googleMapsClient);

  await dataSources.sql.eventTypes.updateUser_EventTypeRelation(user.id, user.event_type_ids);

  user.password = await argon2.hash(user.password);

  const dbUpdateUserResponse = await dataSources.sql.db
    .write('User')
    .where('id', user.id)
    .update(createAuthUserInput(user));

  if (!dbUpdateUserResponse) {
    throw new GraphQLError(`Error while updating User!`);
  }

  // eslint-disable-next-line @typescript-eslint/await-thenable
  const dbUserResponse = await dataSources.sql.users.getAuthById(user.id);

  if (!dbUserResponse) {
    throw new GraphQLError(`Error while fetching User!`);
  }

  return dbUserResponse;
};

export const changePasswordResolver = async (
  _: unknown,
  { id, password }: MutationChangePasswordArgs,
  { dataSources }: CustomContext,
) => {
  const passwordHash = await argon2.hash(password);

  const dbResult = await dataSources.sql.users.changePassword(passwordHash, id);

  if (!dbResult) {
    throw new GraphQLError(`Error while attempting to change password for user with id ${id}!`);
  }

  return true;
};
