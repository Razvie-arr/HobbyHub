import { InfoCard } from 'src/shared/design-system';

import { route } from '../../../../route';
import { WithEvent } from '../../../../shared/types';
import { useAuth } from '../../../auth';

interface EventCardProps extends WithEvent {
  simplified?: boolean;
  maxFlexBasis?: string;
}

export const EventCard = ({ event, ...other }: EventCardProps) => {
  const { user } = useAuth();
  return <InfoCard detailRoute={route.eventDetails(event.id)} user={user} type="event" {...event} {...other} />;
};

