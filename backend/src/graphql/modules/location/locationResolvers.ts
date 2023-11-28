import {
  Location,
  QueryLocationByIdArgs,
  QueryLocationsArgs,
  QueryLocationsByIdsArgs,
} from '../../../types/graphqlTypesGenerated';
import { ContextualNullableResolver, ContextualResolver } from '../../../types/types';

export const locationsResolver: ContextualResolver<Array<Location>, QueryLocationsArgs> = async (
  _,
  { offset, limit },
  { dataSources },
) => await dataSources.sql.locations.getAll(offset, limit);

export const locationByIdResolver: ContextualNullableResolver<Location, QueryLocationByIdArgs> = async (
  _,
  { id },
  { dataSources },
) => await dataSources.sql.locations.getById(id);

export const locationsByIdsResolver: ContextualResolver<Array<Location>, QueryLocationsByIdsArgs> = async (
  _,
  { ids },
  { dataSources },
) => await dataSources.sql.locations.getByIds(ids);
