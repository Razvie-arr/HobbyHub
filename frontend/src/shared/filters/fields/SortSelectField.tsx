import { PropsWithChildren } from 'react';

import { SelectField } from '../../forms';

export const SortSelectField = ({ children }: PropsWithChildren) => (
  <SelectField
    name="sortBy"
    formControlProps={{ flexBasis: { base: 'none', lg: '14%' } }}
    bg="white"
    borderRadius="full"
    size={{ base: 'sm', md: 'md' }}
  >
    {children}
  </SelectField>
);

