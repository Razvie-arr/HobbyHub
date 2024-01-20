import { MdAccountCircle, MdInfo, MdLocationOn } from 'react-icons/md';

import { AddressInfo, DataDetailsCard, EventTypeTag } from '../../../../../shared/design-system';
import { getLocationFragmentData, WithGroup } from '../../../../../shared/types';

import { GroupOwner } from './GroupOwner';

export const GroupDetailsSideCard = ({ group }: WithGroup) => (
  <DataDetailsCard
    title="Summary"
    description={group.summary}
    mapData={group}
    items={[
      {
        icon: MdAccountCircle,
        content: <GroupOwner group={group} />,
      },
      {
        icon: MdInfo,
        content: group.event_types.map((eventType) => <EventTypeTag key={eventType.id} eventType={eventType} />),
      },
      {
        icon: MdLocationOn,
        content: <AddressInfo noIcon fontSize="md" location={getLocationFragmentData(group.location)} />,
      },
    ]}
  />
);

