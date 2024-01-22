import 'dotenv-flow/config';

import path from 'path';

export const JWT_SECRET = process.env.JWT_SECRET || '';
export const PORT = parseInt(process.env.PORT || '4000', 10);
export const { DB_HOST } = process.env;
export const DB_PORT = process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : undefined;
export const { DB_USER } = process.env;
export const { DB_PASSWORD } = process.env;
export const { DB_NAME } = process.env;
export const { GOOGLE_API_KEY } = process.env;
export const { EMAIL_USER } = process.env;
export const { EMAIL_PASSWORD } = process.env;

export const PROJECT_ROOT = path.resolve(process.cwd());
export const FRONTEND_ROOT = path.resolve(PROJECT_ROOT, `../frontend/`);
export const BACKEND_ROOT = path.resolve(PROJECT_ROOT, '../backend');
export const FRONTEND_PUBLIC_FOLDER = path.resolve(FRONTEND_ROOT, `public`);
export const EMAIL_TEMPLATES_FOLDER = path.resolve(BACKEND_ROOT, 'src', 'emails', 'templates');
