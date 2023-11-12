import * as zod from 'zod';

export const addressFormFieldsSchema = {
  streetName: zod.string().min(1, 'You must specify the street name'),
  streetNumber: zod.string().min(1, 'You must specify the street number'),
  city: zod.string().min(1, 'You must specify the city'),
  country: zod.string().min(1, 'You must specify the country'),
};
