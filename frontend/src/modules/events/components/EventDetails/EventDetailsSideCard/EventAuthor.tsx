import { Text } from '@chakra-ui/react';
import { match } from 'ts-pattern';

import { route } from '../../../../../route';
import { RouterLink } from '../../../../../shared/navigation';
import { WithEvent } from '../../../../../shared/types';

export const EventAuthor = ({ event }: WithEvent) => (
  <Text>
    Hosted by:{' '}
    {match(event.author)
      .with({ __typename: 'User' }, (author) => (
        <RouterLink to={route.profile(author.id)}>
          <Text as="b">
            {author.first_name} {author.last_name}
          </Text>
        </RouterLink>
      ))
      .with({ __typename: 'Group' }, (group) => (
        <RouterLink to={route.groupDetails(group.id)}>
          <Text as="b">{group.name}</Text>
        </RouterLink>
      ))
      .exhaustive()}
  </Text>
);

