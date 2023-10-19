import * as argon2 from 'argon2';
import { GraphQLError } from 'graphql/error';

import { createToken } from '../../../libs/jwt';
import { CustomContext } from '../../../types';
import { type AuthInfo, type MutationSignInArgs, type MutationSignUpArgs } from '../../../types';

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

  const userObject = {
    id,
    email,
    name: name,
  };

  return { user: userObject, token: token };
};
