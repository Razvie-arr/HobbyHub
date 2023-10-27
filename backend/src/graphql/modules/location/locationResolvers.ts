import { Location, QueryLocationByIdArgs } from '../../../types/graphqlTypesGenerated';
import { type CustomContext } from '../../../types/types';

export const locationsResolver = async (
  _: unknown,
  __: unknown,
  { dataSources }: CustomContext,
): Promise<Array<Location>> => await dataSources.sql.locations.getAll(0, 100);

export const locationResolver = async (
  _: unknown,
  { id }: QueryLocationByIdArgs,
  { dataSources }: CustomContext,
): Promise<Location | null> => await dataSources.sql.locations.getById(id);
