import { route } from '../../../../route';
import { DataDetails } from '../../../../shared/design-system';
import { WithGroup } from '../../../../shared/types';
import { useAuth } from '../../../auth';

export const GroupDetails = ({ group }: WithGroup) => {
  const { user } = useAuth();
  return <DataDetails user={user} type="group" data={group} editRoute={route.editEvent(group.id)} />;
};
