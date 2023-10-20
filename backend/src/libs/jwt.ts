import jwt, { JwtPayload } from 'jsonwebtoken';

import { JWT_SECRET } from '../config';

export const createToken = (content: string | object): string => jwt.sign(content, JWT_SECRET);

export const verifyToken = (token: string): JwtPayload | string => jwt.verify(token, JWT_SECRET);

export const createTokenWithExpirationTime = (content: string | object, timeInSeconds: number): string =>
  jwt.sign(
    {
      data: content,
    },
    JWT_SECRET,
    { expiresIn: timeInSeconds },
  );

export const verifyTokenWithExpirationTime = (content: string, timeInSeconds: number): JwtPayload | string =>
  jwt.verify(content, JWT_SECRET, { maxAge: timeInSeconds });
