import { ReactNode } from 'react';
import { Button, HStack } from '@chakra-ui/react';
import { Option, pipe, ReadonlyArray } from 'effect';

import { EventType, SortType } from 'src/gql/graphql';
import { WithAuthUser } from 'src/shared/types';

import { EventFilterPreset, EventFilterRenderProps } from '../../../shared/filters';

const getEventTypeIds = (eventTypeCategory: string, eventTypes: Array<EventType>) =>
  pipe(
    eventTypes,
    ReadonlyArray.filterMap(({ category, id }) => (category === eventTypeCategory ? Option.some(id) : Option.none())),
  );

interface TabButtonProps {
  handleClick: () => void;
  active: boolean;
  label: ReactNode;
}

const TabButton = ({ handleClick, active, label }: TabButtonProps) => (
  <Button borderRadius="full" colorScheme="purple" variant={active ? 'solid' : 'ghost'} onClick={handleClick}>
    {label}
  </Button>
);

interface EventsFilterPresetTabsProps extends EventFilterRenderProps, WithAuthUser {
  currentFilterPreset: EventFilterPreset;
}

export const EventsFilterPresetTabs = ({
  getFilterValues,
  handleFilterSubmit,
  reset,
  user,
  currentFilterPreset,
}: EventsFilterPresetTabsProps) => {
  const handleTodaysEvents = async () => {
    const startDate = new Date();
    startDate.setHours(0, 0, 0, 0);
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 1);
    endDate.setHours(0, 0, 0, 0);
    const values = {
      filterPreset: 'today' as const,
      address: getFilterValues().address,
      dates: [startDate, endDate] as const,
      distance: '20',
      sports: [],
      games: [],
      other: [],
      sortBy: SortType.DateStart,
    };
    await handleFilterSubmit(values);
    reset(values);
  };

  const handleInterestingEvents = async () => {
    const values = {
      filterPreset: 'recommended' as const,
      address: getFilterValues().address,
      dates: [null, null] as const,
      distance: '20',
      sports: getEventTypeIds('Sports', user.event_types),
      games: getEventTypeIds('Games', user.event_types),
      other: getEventTypeIds('Other', user.event_types),
      sortBy: SortType.DateStart,
    };
    await handleFilterSubmit(values);
    reset(values);
  };

  const handleNewlyCreatedEvents = async () => {
    const values = {
      filterPreset: 'newlyAdded' as const,
      address: getFilterValues().address,
      dates: [null, null] as const,
      distance: '20',
      sports: [],
      games: [],
      other: [],
      sortBy: SortType.DateCreated,
    };
    await handleFilterSubmit(values);
    reset(values);
  };

  return (
    <HStack>
      <TabButton
        active={currentFilterPreset === 'today'}
        label="Today"
        handleClick={async () => {
          await handleTodaysEvents();
        }}
      />
      <TabButton
        active={currentFilterPreset === 'recommended'}
        label="Recommended"
        handleClick={async () => {
          await handleInterestingEvents();
        }}
      />
      <TabButton
        active={currentFilterPreset === 'newlyAdded'}
        label="Newly added"
        handleClick={async () => {
          await handleNewlyCreatedEvents();
        }}
      />
    </HStack>
  );
};

