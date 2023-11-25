import { z } from 'zod';

import { GroupSortType } from '../../../gql/graphql';
import { latLngSchema } from '../../../shared/schemas';

export const groupFilterUrlSchema = z
  .object({
    distance: z.coerce.number().optional(),
    sortBy: z.nativeEnum(GroupSortType).optional(),
    sports: z.array(z.coerce.number()).optional(),
    games: z.array(z.coerce.number()).optional(),
    other: z.array(z.coerce.number()).optional(),
    filterPreset: z.union([z.literal('none'), z.literal('recommended'), z.literal('nearby')]).optional(),
  })
  .and(latLngSchema);

