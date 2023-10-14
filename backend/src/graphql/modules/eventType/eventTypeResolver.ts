import { EventType } from '../../../types/graphqlTypesGenerated';
import { type CustomContext } from '../../../types/types';

export const eventTypesResolver = async (
  _: unknown,
  __: unknown,
  { dbConnection }: CustomContext,
): Promise<Array<EventType>> => await dbConnection.query<Array<EventType>>(`SELECT * from EventType LIMIT 100`);

export const eventTypeResolver = async (
  _: unknown,
  { id }: { id: number },
  { dbConnection }: CustomContext,
): Promise<EventType | null> => {
  const eventType = await dbConnection.query<Array<EventType>>(`SELECT * from EventType where id = ?`, [id]);
  return eventType[0] ?? null;
};
