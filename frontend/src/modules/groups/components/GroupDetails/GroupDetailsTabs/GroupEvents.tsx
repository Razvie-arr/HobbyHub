import { Option, pipe, ReadonlyArray } from 'effect';

import { NoData } from '../../../../../shared/design-system';
import { renderEventList } from '../../../../../shared/renderers';
import { WithGroup, WithNullableAuthUser } from '../../../../../shared/types';

export const GroupEvents = ({ group, user }: WithGroup & WithNullableAuthUser) =>
  pipe(
    Option.fromNullable(group.events),
    Option.filter(ReadonlyArray.isNonEmptyArray),
    Option.match({
      onNone: () => <NoData title="No events" description={`${group.name} has not organized any events yet`} />,
      onSome: renderEventList({ user, maxColumnCount: 3 }),
    }),
  );

