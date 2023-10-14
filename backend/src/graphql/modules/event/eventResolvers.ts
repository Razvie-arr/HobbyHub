import { Event } from '../../../types/graphqlTypesGenerated';
import { type CustomContext } from '../../../types/types';

import { createEventQuery } from './queries';

export const eventsResolver = async (
  _: unknown,
  __: unknown,
  { dbConnection }: CustomContext,
): Promise<Array<Event>> => {
  const result: unknown[] = await dbConnection.query(createEventQuery());
  // @ts-expect-error
  return Object.values(result[0]).flatMap((value) => value);
};

export const eventResolver = async (
  _: unknown,
  { id }: { id: number },
  { dbConnection }: CustomContext,
): Promise<Event | null> => {
  const result = await dbConnection.query<Array<Event>>(createEventQuery({ single: true }), [id]);
  // @ts-expect-error
  return Object.values(result[0]).flatMap((value) => value)[0] ?? null;
};
