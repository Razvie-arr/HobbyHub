import { z } from 'zod';

import { addressFormFieldsSchema } from '../../../shared/forms';
import { getCurrentDateTime } from '../../../utils/form';

export const eventFormSchema = z
  .object({
    author: z.coerce.number(),
    name: z.string().min(1, 'Event name is required').max(100, 'Name cannot be more than 100 characters long'),
    summary: z.string().min(1, 'Event summary is required').max(300, 'Summary cannot be more than 300 characters long'),
    eventTypes: z
      .array(z.object({ value: z.number(), label: z.string() }))
      .nonempty('You must specify at least one event type'),
    capacity: z.coerce
      .number()
      .int('Fractional people will not be able to come to your event, please input integer numbers')
      .min(1, 'Capacity must be at least 1')
      .max(100, 'Capacity must be more than 100'),
    allowWaitlist: z.boolean(),
    date: z.string().min(1, 'Date is required'),
    startTime: z.string().min(1, 'Start time is required'),
    endTime: z.string().min(1, 'End time is required'),
    ...addressFormFieldsSchema,
    eventImagePath: z.string().nullish(),
    description: z.string().nullish(),
  })
  .refine(
    ({ date }) => {
      const currentDateTime = getCurrentDateTime();
      return date >= currentDateTime.slice(0, 10);
    },
    {
      message: 'Event cannot start in the past',
      path: ['date'],
    },
  )
  .refine(
    ({ date, startTime }) => {
      const currentDateTime = getCurrentDateTime();
      return `${date}T${startTime}` >= currentDateTime.slice(11);
    },
    {
      message: 'Event cannot start in the past',
      path: ['startTime'],
    },
  )
  .refine(({ startTime, endTime }) => endTime > startTime, {
    message: 'Event cannot end earlier than start time',
    path: ['endTime'],
  });

