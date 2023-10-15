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
  return Object.values(result[0]).flatMap((value) =>
    // @ts-expect-error
    value.map(({ eventTypes, ...rest }) => ({ ...rest, eventTypes: JSON.parse(eventTypes) })),
  );
};

export const eventResolver = async (
  _: unknown,
  { id }: { id: number },
  { dbConnection }: CustomContext,
): Promise<Event | null> => {
  const result = await dbConnection.query<Array<Event>>(createEventQuery({ single: true }), [id]);
  return (
    // @ts-expect-error
    Object.values(result[0]).flatMap((value) =>
      // @ts-expect-error
      value.map(({ eventTypes, ...rest }) => ({ ...rest, eventTypes: JSON.parse(eventTypes) })),
    )[0] ?? null
  );
};

