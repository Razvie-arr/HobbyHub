import * as argon2 from 'argon2';
import { GraphQLError } from 'graphql/error';

import { createToken, createTokenWithExpirationTime, verifyTokenWithExpirationTime } from '../../../libs/jwt';
import { sendVerificationEmail } from '../../../libs/nodeMailer';
import {
  type AuthInfo,
  AuthUser,
  ContextualResolverWithParent,
  type CustomContext,
  EventType,
  Location,
  type MutationRequestResetPasswordArgs,
  type MutationResetPasswordArgs,
  type MutationSignInArgs,
  type MutationSignUpArgs,
  type MutationVerifyArgs,
} from '../../../types';

const tokenExpirationTime = 60 * 60;
const SUBJECT_VERIFY = 'Verification email';
const SUBJECT_RESET_PASSWORD = 'Reset password link';

export const signInResolver = async (
  _: unknown,
  { email: rawEmail, password }: MutationSignInArgs,
  { dataSources }: CustomContext,
): Promise<AuthInfo> => {
  const email = rawEmail.toLocaleLowerCase();

  const dbResponse = await dataSources.sql.db.query.raw(`SELECT * FROM User WHERE email = ?`, [email]);

  if (dbResponse.length === 0) {
    throw new GraphQLError('User not with that email was not found.');
  }

  const user = dbResponse[0][0];

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

export const authUserLocationResolver: ContextualResolverWithParent<Location, AuthUser> = async (
  parent,
  _,
  { dataSources },
) => (await dataSources.sql.locations.getById(parent.location_id)) as unknown as Location;

export const signUpResolver = async (
  _: unknown,
  { email: rawEmail, password, first_name, last_name }: MutationSignUpArgs,
  { dataSources }: CustomContext,
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
    location_id: 0,
  };

  const verificationTextMessage = `Please verify your account via this link!\nhttps://frontend-team01-vse.handson.p.pro/auth/verifyUser?token=${token}">`;
  const verificationHTMLMessage = `Please click <a href="https://frontend-team01-vse.handson.pro/auth/verifyUser?token=${token}">here</a> to verify your account!`;

  try {
    await sendVerificationEmail(email, SUBJECT_VERIFY, {
      text: verificationTextMessage,
      html: verificationHTMLMessage,
    });
  } catch (error) {
    throw error;
  }

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
  { dataSources }: CustomContext,
): Promise<boolean> => {
  const email = rawEmail.toLocaleLowerCase();

  const user = (await dataSources.sql.db.query.raw(`SELECT * FROM User WHERE email = ?`, [email]))[0];
  if (!user) {
    throw new GraphQLError('User not found');
  }

  const resetToken = createTokenWithExpirationTime({ id: user.id }, tokenExpirationTime);

  const dbUpdateResponse = await dataSources.sql.db.write.raw('UPDATE User SET token = ? WHERE email = ?', [
    resetToken,
    email,
  ]);

  if (!dbUpdateResponse) {
    throw new GraphQLError("Reset token wasn't updated");
  }

  const resetPasswordTextMessage = `Please reset your password via this link!\nhttps://dev-frontend-team01-vse.handson.pro/auth/verifyUser=token?=${resetToken}`;
  const resetPasswordHTMLMessage = `Please reset your password using this <a href="<url for resetting password>?token=${resetToken}" >link</a>`;

  try {
    await sendVerificationEmail(email, SUBJECT_RESET_PASSWORD, {
      text: resetPasswordTextMessage,
      html: resetPasswordHTMLMessage,
    });
  } catch (error) {
    throw error;
  }

  return true;
};

export const resetPasswordResolver = async (
  _: unknown,
  { password, token }: MutationResetPasswordArgs,
  { dataSources }: CustomContext,
): Promise<boolean> => {
  const user = (await dataSources.sql.db.query.raw(`SELECT * FROM User WHERE token = ?`, [token]))[0];
  if (!user) {
    throw new GraphQLError('Token is incorrect');
  }

  try {
    verifyTokenWithExpirationTime(token, tokenExpirationTime);
  } catch (error) {
    throw error;
  }

  const passwordHash = await argon2.hash(password);

  const dbUpdateResponse = await dataSources.sql.db.write.raw('UPDATE User SET password = ? WHERE id = ?', [
    passwordHash,
    user.id,
  ]);

  if (!dbUpdateResponse) {
    throw new GraphQLError('Password not changed');
  }

  return true;
};

