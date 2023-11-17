import { route } from '../../../../route';
import { DataDetails, DataList } from '../../../../shared/design-system';
import { getEventFragmentData, WithGroup } from '../../../../shared/types';
import { useAuth } from '../../../auth';

export const GroupDetails = ({ group }: WithGroup) => {
  const { user } = useAuth();
  console.log(group);
  const groupEvents = group.events.map(getEventFragmentData);
  if (groupEvents[0] && groupEvents[0].author.__typename === 'User') {
  }
  return (
    <DataDetails
      user={user}
      type="group"
      data={group}
      editRoute={route.editEvent(group.id)}
      additionalTabs={[
        { title: 'Events', content: <DataList user={user} type="event" dataArray={groupEvents} maxColumnCount={3} /> },
      ]}
    />
  );
};
