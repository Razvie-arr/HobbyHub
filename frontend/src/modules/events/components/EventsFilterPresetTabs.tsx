import { HStack } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

import { SortType } from 'src/gql/graphql';
import { WithAuthUser } from 'src/shared/types';

import { TabButton } from '../../../shared/design-system';
import { EventFilterPreset, EventFiltersValues } from '../../../shared/filters';
import { getEventTypeIds } from '../../../utils/events';

interface EventsFilterPresetTabsProps extends WithAuthUser {
  currentFilterPreset: EventFilterPreset;
  handleFilterSubmit: (values: EventFiltersValues) => Promise<void>;
}

export const EventsFilterPresetTabs = ({
  user,
  currentFilterPreset,
  handleFilterSubmit,
}: EventsFilterPresetTabsProps) => {
  const methods = useFormContext<EventFiltersValues>();

  return (
    <HStack>
      <TabButton
        active={currentFilterPreset === 'today'}
        label="Today"
        handleClick={methods.handleSubmit(async ({ address }) => {
          const startDate = new Date();
          startDate.setHours(0, 0, 0, 0);
          const endDate = new Date();
          endDate.setDate(endDate.getDate() + 1);
          endDate.setHours(0, 0, 0, 0);

          const values = {
            filterPreset: 'today' as const,
            address,
            dates: [startDate, endDate] as const,
            distance: '20',
            sports: [],
            games: [],
            other: [],
            sortBy: SortType.DateStart,
          };

          methods.reset(values);
          await handleFilterSubmit(values);
        })}
      />
      <TabButton
        active={currentFilterPreset === 'recommended'}
        label="Recommended"
        handleClick={methods.handleSubmit(async ({ address }) => {
          const values = {
            filterPreset: 'recommended' as const,
            address,
            dates: [null, null] as const,
            distance: '20',
            sports: getEventTypeIds('Sports', user.event_types),
            games: getEventTypeIds('Games', user.event_types),
            other: getEventTypeIds('Other', user.event_types),
            sortBy: SortType.DateStart,
          };

          methods.reset(values);
          await handleFilterSubmit(values);
        })}
      />
      <TabButton
        active={currentFilterPreset === 'newlyAdded'}
        label="Newly added"
        handleClick={methods.handleSubmit(async ({ address }) => {
          const values = {
            filterPreset: 'newlyAdded' as const,
            address,
            dates: [null, null] as const,
            distance: '20',
            sports: [],
            games: [],
            other: [],
            sortBy: SortType.DateCreated,
          };

          methods.reset(values);
          await handleFilterSubmit(values);
        })}
      />
    </HStack>
  );
};

