import jwt, { JwtPayload } from 'jsonwebtoken';
import { JWT_SECRET } from '../config';

export const createToken = (content: string | object): string => {
  return jwt.sign(content, JWT_SECRET);
};

export const verifyToken = (token: string): JwtPayload | string => {
  return jwt.verify(token, JWT_SECRET);
};
