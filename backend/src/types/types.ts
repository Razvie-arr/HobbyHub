import { Connection } from 'mariadb';

import { SQLDataSource } from '../dataSource';

export interface CustomContext {
  dbConnection: Connection;
  dataSources: {
    sql: SQLDataSource;
  };
  auth: string | string[];
}

export type ContextualResolverWithParent<R, P = unknown, A = unknown> = (
  parent: P,
  args: A,
  context: CustomContext,
) => Promise<R>;
export type ContextualResolver<R, A = unknown> = (parent: unknown, args: A, context: CustomContext) => Promise<R>;
export type ContextualNullableResolver<R, A = unknown> = (
  parent: unknown,
  args: A,
  context: CustomContext,
) => Promise<R | null>;

