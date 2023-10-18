import { Location, QueryGetLocationByIdArgs } from '../../../types/graphqlTypesGenerated';
import { type CustomContext } from '../../../types/types';

export const locationsResolver = async (
  _: unknown,
  __: unknown,
  { dbConnection }: CustomContext,
): Promise<Array<Location>> => await dbConnection.query(`SELECT * from Location LIMIT 100`);

export const locationResolver = async (
  _: unknown,
  { id }: QueryGetLocationByIdArgs,
  { dbConnection }: CustomContext,
): Promise<Location | null> => {
  const locations = await dbConnection.query(`SELECT * from EventType where id = ?`, [id]);
  return locations[0] ?? null;
};

