import { pipe } from 'effect';

import { route } from '../../../../route';
import { DataDetails } from '../../../../shared/design-system';
import { renderEventList } from '../../../../shared/renderers';
import { getEventFragmentData, WithGroup } from '../../../../shared/types';
import { useAuth } from '../../../auth';

import { SimilarGroups } from './SimilarGroups';

export const GroupDetails = ({ group }: WithGroup) => {
  const { user } = useAuth();
  const groupEvents = group.events.map(getEventFragmentData);
  if (groupEvents[0] && groupEvents[0].author.__typename === 'User') {
  }
  return (
    <DataDetails
      user={user}
      type="group"
      data={group}
      editRoute={route.editGroup(group.id)}
      additionalTabs={[
        { title: 'Events', content: pipe(group.events, renderEventList({ user, maxColumnCount: 3 })) },
        {
          title: 'Similar groups',
          content: <SimilarGroups group={group} />,
        },
      ]}
    />
  );
};

