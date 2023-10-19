import * as argon2 from 'argon2';
import { GraphQLError } from 'graphql/error';

import { createToken } from '../../../libs/jwt';
import { sendVerificationEmail } from '../../../libs/nodeMailer';
import {
  type AuthInfo,
  type MutationSignInArgs,
  type MutationSignUpArgs,
  type MutationVerifyArgs,
} from '../../../types/graphqlTypesGenerated';
import { type CustomContext } from '../../../types/types';

export const signInResolver = async (
  _: unknown,
  { email: rawEmail, password }: MutationSignInArgs,
  { dbConnection }: CustomContext,
): Promise<AuthInfo> => {
  const email = rawEmail.toLocaleLowerCase();

  const dbResponse = await dbConnection.query(`SELECT * FROM User WHERE email = ?`, [email]);

  if (dbResponse.length === 0) {
    throw new GraphQLError('Unauthorized.');
  }

  const user = dbResponse[0];
  if (await argon2.verify(user.password, password)) {
    const token = createToken({ id: user.id });

    return {
      user: { ...user },
      token,
    };
  }
  throw new GraphQLError('Unauthorized.');
};

export const signUpResolver = async (
  _: unknown,
  { email: rawEmail, password, name }: MutationSignUpArgs,
  { dbConnection }: CustomContext,
): Promise<AuthInfo> => {
  const email = rawEmail.toLocaleLowerCase();

  const userByEmail = (await dbConnection.query(`SELECT * FROM User WHERE email = ?`, [email]))[0];

  if (userByEmail) {
    await dbConnection.end();
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
    await dbConnection.end();
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
    await sendVerificationEmail(email, token);
  } catch (error) {
    await dbConnection.end();
    throw error;
  }

  await dbConnection.end();
  return { user: userObject, token: token };
};

export const verifyUser = async (
  _: unknown,
  { token }: MutationVerifyArgs,
  { dbConnection }: CustomContext,
): Promise<string> => {
  const { affectedRows } = await dbConnection.query(`UPDATE User SET verified = 1, token = NULL WHERE token = ?`, [
    token,
  ]);
  if (affectedRows === 0) {
    await dbConnection.end();
    throw new GraphQLError('User not found!');
  }

  await dbConnection.end();
  return 'User verified!';
};

