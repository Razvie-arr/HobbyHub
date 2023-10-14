import { GraphQLError } from 'graphql/error';

import { type CustomContext } from '../../../types/types';
import { Location } from '../../../types/graphqlTypesGenerated';

export const locationsResolver = async (
  _: unknown,
  __: unknown,
  { dbConnection }: CustomContext,
): Promise<Array<Location>> => {
  return await dbConnection.query(`SELECT * from Location LIMIT 100`);
};

export const locationResolver = async (
  _: unknown,
  { latitude, longitude }: { latitude: number; longitude: number },
  { dbConnection }: CustomContext,
): Promise<Location | null> => {
  const locations = await dbConnection.query(`SELECT * from EventType where latitude = ? and longitude = ?`, [
    latitude,
    longitude,
  ]);
  return locations[0] ?? null;
};

