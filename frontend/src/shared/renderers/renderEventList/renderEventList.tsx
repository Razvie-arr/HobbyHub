import { flow, ReadonlyArray } from 'effect';

import { DataList, DataListProps, DataMapButton } from '../../design-system';
import { EventData, getEventFragmentData, WithNullableAuthUser } from '../../types';

import { EventCard } from './EventCard';

interface EventListProps extends WithNullableAuthUser, DataListProps {
  maxColumnCount?: 4 | 3;
  withMap?: boolean;
}

export const renderEventList = (props: EventListProps | ((events: Array<EventData>) => EventListProps)) =>
  flow(ReadonlyArray.map(getEventFragmentData), (events) => {
    const { user, maxColumnCount = 4, withMap, ...dataListProps } = typeof props === 'function' ? props(events) : props;
    return (
      <>
        {withMap && ReadonlyArray.isNonEmptyArray(events) ? (
          <DataMapButton
            type="multiple"
            data={events}
            renderMarkerContent={(data) => <EventCard user={user} event={data} />}
          />
        ) : null}
        <DataList {...dataListProps}>
          {events.map((event) => (
            <EventCard key={event.id} user={user} event={event} maxFlexBasis={maxColumnCount === 4 ? '24%' : ' 32%'} />
          ))}
        </DataList>
      </>
    );
  });

