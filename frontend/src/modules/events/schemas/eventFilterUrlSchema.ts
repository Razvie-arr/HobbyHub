import { z } from 'zod';

import { SortType } from '../../../gql/graphql';
import { latLngSchema } from '../../../shared/schemas';

export const eventFilterUrlSchema = z
  .object({
    startDate: z.coerce.date().nullish(),
    endDate: z.coerce.date().nullish(),
    distance: z.coerce.number().optional(),
    sortBy: z.nativeEnum(SortType).optional(),
    sports: z.array(z.coerce.number()).optional(),
    games: z.array(z.coerce.number()).optional(),
    other: z.array(z.coerce.number()).optional(),
    filterPreset: z
      .union([z.literal('none'), z.literal('today'), z.literal('recommended'), z.literal('newlyAdded')])
      .optional(),
  })
  .and(latLngSchema);

