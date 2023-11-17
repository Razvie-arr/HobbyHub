import { ReactNode } from 'react';
import { Button, HStack } from '@chakra-ui/react';
import { Option, pipe, ReadonlyArray } from 'effect';

import { EventType, GroupSortType } from '../../../gql/graphql';
import { GroupFilterRenderProps } from '../../../shared/filters';
import { useFilterSearchParams } from '../../../shared/filters/hooks';
import { WithAuthUser } from '../../../shared/types';

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

export const GroupsFilterPresetTabs = ({
  getFilterValues,
  handleFilterSubmit,
  reset,
  user,
}: GroupFilterRenderProps & WithAuthUser) => {
  const { params } = useFilterSearchParams();

  const handleNearbyGroups = async () => {
    const values = {
      filterPreset: 'nearby' as const,
      address: getFilterValues().address,
      distance: '20',
      sports: [],
      games: [],
      other: [],
      sortBy: GroupSortType.Distance,
    };
    await handleFilterSubmit(values);
    reset(values);
  };

  const handleInterestingGroups = async () => {
    const values = {
      filterPreset: 'recommended' as const,
      address: getFilterValues().address,
      distance: '20',
      sports: getEventTypeIds('Sports', user.event_types),
      games: getEventTypeIds('Games', user.event_types),
      other: getEventTypeIds('Other', user.event_types),
      sortBy: GroupSortType.Distance,
    };
    await handleFilterSubmit(values);
    reset(values);
  };

  return (
    <HStack>
      <TabButton
        active={params.filterPreset === 'nearby'}
        label="Nearby"
        handleClick={async () => {
          await handleNearbyGroups();
        }}
      />
      <TabButton
        active={params.filterPreset === 'recommended'}
        label="Recommended"
        handleClick={async () => {
          await handleInterestingGroups();
        }}
      />
    </HStack>
  );
};
