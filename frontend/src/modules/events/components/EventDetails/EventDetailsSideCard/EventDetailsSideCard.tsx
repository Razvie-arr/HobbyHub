import { MdAccountCircle, MdCalendarToday, MdGroups, MdInfo, MdLocationOn } from 'react-icons/md';
import { match } from 'ts-pattern';

import {
  AddressInfo,
  DataDetailsCard,
  EventCapacity,
  EventDateTime,
  EventTypeTag,
} from '../../../../../shared/design-system';
import { getLocationFragmentData, WithEvent, WithNullableAuthUser } from '../../../../../shared/types';
import { getCurrentDateTime } from '../../../../../utils/form';

import { CancelEventButton } from './CancelEventButton';
import { EventAuthor } from './EventAuthor';

export const EventDetailsSideCard = ({ event, user }: WithEvent & WithNullableAuthUser) => {
  const authorId = match(event.author)
    .with({ __typename: 'User' }, ({ id }) => id)
    .with({ __typename: 'Group' }, ({ admin }) => admin.id)
    .exhaustive();

  const showCancelButton =
    user && user.id === authorId && !event.cancelled && event.start_datetime.slice(0, 23) > getCurrentDateTime();
  return (
    <DataDetailsCard
      title="Summary"
      description={event.summary}
      mapData={event}
      items={[
        {
          icon: MdAccountCircle,
          content: <EventAuthor event={event} />,
        },
        {
          icon: MdInfo,
          content: event.event_types.map((eventType) => <EventTypeTag key={eventType.id} eventType={eventType} />),
        },
        {
          icon: MdGroups,
          content: <EventCapacity noIcon fontSize="md" capacity={event.capacity} participants={event.participants} />,
        },
        {
          icon: MdCalendarToday,
          content: (
            <EventDateTime noIcon fontSize="md" startDateTime={event.start_datetime} endDateTime={event.end_datetime} />
          ),
        },
        {
          icon: MdLocationOn,
          content: <AddressInfo noIcon fontSize="md" location={getLocationFragmentData(event.location)} />,
        },
      ]}
    >
      {showCancelButton ? <CancelEventButton event={event} /> : null}
    </DataDetailsCard>
  );
};

