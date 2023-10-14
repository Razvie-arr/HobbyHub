import jwt, { JwtPayload } from 'jsonwebtoken';

import { JWT_SECRET } from '../config';

export const createToken = (content: string | object): string => jwt.sign(content, JWT_SECRET);

export const verifyToken = (token: string): JwtPayload | string => jwt.verify(token, JWT_SECRET);
