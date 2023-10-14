import { type CustomContext } from '../../../types/types';
import { Event, EventType } from '../../../types/graphqlTypesGenerated';

export const eventsResolver = async (_: unknown, __: unknown, { dbConnection }: CustomContext): Promise<Array<Event>> =>
  await dbConnection.query<Array<Event>>(
    `SELECT * FROM Event event JOIN Event_EventType event_eventType ON event.id = event_eventType.event_id JOIN EventType eventType on eventType.id = event_eventType.event_type_id LIMIT 100`,
  );

export const eventResolver = async (
  _: unknown,
  { id }: { id: number },
  { dbConnection }: CustomContext,
): Promise<Event | null> => {
  const events = await dbConnection.query<Array<Event>>(`SELECT * FROM Event where id = ?`, [id]);
  return events[0] ?? null;
};

