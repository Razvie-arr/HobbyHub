import { z } from 'zod';

import { addressFormFieldsSchema } from '../../../shared/forms';

export const groupFormSchema = z.object({
  name: z.string().min(1, 'Group name is required').max(100, 'Name cannot be more than 100 characters long'),
  summary: z.string().min(1, 'Group summary is required').max(300, 'Summary cannot be more than 300 characters long'),
  eventTypes: z
    .array(z.object({ value: z.number(), label: z.string() }))
    .nonempty('You must specify at least one group type'),
  ...addressFormFieldsSchema,
  groupImagePath: z.string().nullish(),
  description: z.string().nullish(),
});

