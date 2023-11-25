import { z } from 'zod';

export const latLngSchema = z.object({
  lat: z.coerce.number().optional(),
  lng: z.coerce.number().optional(),
});

