import * as argon2 from 'argon2';
import { GraphQLError } from 'graphql/error';

import { createToken, createTokenWithExpirationTime, verifyTokenWithExpirationTime } from '../../../libs/jwt';
import { sendVerificationEmail } from '../../../libs/nodeMailer';
import {
  type AuthInfo,
  type CustomContext,
  type MutationRequestResetPasswordArgs,
  type MutationResetPasswordArgs,
  type MutationSignInArgs,
  type MutationSignUpArgs,
  type MutationVerifyArgs,
} from '../../../types';

const tokenExpirationTime = 60 * 60;
const SUBJECT_VERIFY = 'Verification email';
const MESSAGE_VERIFY = 'Please verify your email via this link!';
const SUBJECT_RESET_PASSWORD = 'Reset password link';
const MESSAGE_RESET_PASSWORD = 'Please reset your password using this link';
export const signInResolver = async (
  _: unknown,
  { email: rawEmail, password }: MutationSignInArgs,
  { dbConnection }: CustomContext,
): Promise<AuthInfo> => {
  const email = rawEmail.toLocaleLowerCase();

  const dbResponse = await dbConnection.query(`SELECT * FROM User WHERE email = ?`, [email]);

  if (dbResponse.length === 0) {
    throw new GraphQLError('User not with that email was not found.');
  }

  const user = dbResponse[0];
  if (await argon2.verify(user.password, password)) {
    const token = createToken({ id: user.id });

    return {
      user: { ...user },
      token,
    };
  }
  throw new GraphQLError('User email and password do not match.');
};

export const signUpResolver = async (
  _: unknown,
  { email: rawEmail, password, name }: MutationSignUpArgs,
  { dbConnection }: CustomContext,
): Promise<AuthInfo> => {
  const email = rawEmail.toLocaleLowerCase();

  const userByEmail = (await dbConnection.query(`SELECT * FROM User WHERE email = ?`, [email]))[0];

  if (userByEmail) {
    throw new GraphQLError('Email already registered');
  }

  const passwordHash = await argon2.hash(password);

  const dbResponse = await dbConnection.query(
    `INSERT INTO User (id, email, password, name)
    VALUES (NULL, ?, ?, ?);`,
    [email, passwordHash, name],
  );

  const id = Number(dbResponse.insertId);

  const token = createToken({ id });

  const { affectedRows } = await dbConnection.query(`UPDATE User SET token = ? WHERE id=?;`, [
    token,
    dbResponse.insertId,
  ]);

  if (affectedRows === 0) {
    throw new GraphQLError(`Error while registering user with id: ${dbResponse.insertId}`);
  }

  const userObject = {
    id,
    email,
    name: name,
    password: passwordHash,
    verified: false,
  };

  try {
    await sendVerificationEmail(email, SUBJECT_VERIFY, MESSAGE_VERIFY, token);
  } catch (error) {
    throw error;
  }

  return { user: userObject, token: token };
};

export const verifyUserResolver = async (
  _: unknown,
  { token }: MutationVerifyArgs,
  { dbConnection }: CustomContext,
): Promise<string> => {
  const { affectedRows } = await dbConnection.query(`UPDATE User SET verified = 1, token = NULL WHERE token = ?`, [
    token,
  ]);
  if (affectedRows === 0) {
    throw new GraphQLError('User not found!');
  }

  return 'User verified!';
};

export const requestResetPasswordResolver = async (
  _: unknown,
  { email: rawEmail }: MutationRequestResetPasswordArgs,
  { dbConnection }: CustomContext,
): Promise<boolean> => {
  const email = rawEmail.toLocaleLowerCase();

  const user = (await dbConnection.query(`SELECT * FROM User WHERE email = ?`, [email]))[0];
  if (!user) {
    throw new GraphQLError('User not found');
  }

  const resetToken = createTokenWithExpirationTime({ id: user.id }, tokenExpirationTime);

  const { affectedRows } = await dbConnection.query('UPDATE User SET token = ? WHERE email = ?', [resetToken, email]);

  if (affectedRows === 0) {
    throw new GraphQLError("Reset token wasn't updated");
  }

  try {
    await sendVerificationEmail(email, SUBJECT_RESET_PASSWORD, MESSAGE_RESET_PASSWORD, resetToken);
  } catch (error) {
    throw error;
  }

  return true;
};

export const resetPasswordResolver = async (
  _: unknown,
  { password, token }: MutationResetPasswordArgs,
  { dbConnection }: CustomContext,
): Promise<boolean> => {
  const user = (await dbConnection.query(`SELECT * FROM User WHERE token = ?`, [token]))[0];
  if (!user) {
    throw new GraphQLError('Token is incorrect');
  }

  try {
    verifyTokenWithExpirationTime(token, tokenExpirationTime);
  } catch (error) {
    throw error;
  }

  const passwordHash = await argon2.hash(password);

  const { affectedRows } = await dbConnection.query('UPDATE User SET password = ? WHERE id = ?', [
    passwordHash,
    user.id,
  ]);

  if (affectedRows === 0) {
    throw new GraphQLError('Password not changed');
  }

  return true;
};

