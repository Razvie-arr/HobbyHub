import { DataCard } from 'src/shared/design-system';

import { route } from '../../../../route';
import { WithGroup } from '../../../../shared/types';
import { useAuth } from '../../../auth';

interface GroupCardProps extends WithGroup {
  simplified?: boolean;
  maxFlexBasis?: string;
}

export const GroupCard = ({ group, ...other }: GroupCardProps) => {
  const { user } = useAuth();
  return <DataCard detailRoute={route.groupDetails(group.id)} user={user} type="group" data={group} {...other} />;
};

