import { Text } from '@chakra-ui/react';

import { route } from '../../../../../route';
import { RouterLink } from '../../../../../shared/navigation';
import { WithGroup } from '../../../../../shared/types';

export const GroupOwner = ({ group }: WithGroup) => (
  <Text>
    Admin:{' '}
    <RouterLink to={route.profile(group.admin.id)}>
      <Text as="b">
        {group.admin.first_name} {group.admin.last_name}
      </Text>
    </RouterLink>
  </Text>
);

