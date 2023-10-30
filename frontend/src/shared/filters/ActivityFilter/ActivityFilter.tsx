import { useState } from 'react';
import { Flex, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, VStack } from '@chakra-ui/react';
import { Controller } from 'react-hook-form';

import { EventType } from '../../../gql/graphql';

import { ActivityCheckbox } from './ActivityCheckbox';
import { ActivityFilterTrigger } from './ActivityFilterTrigger';
import { FilterEventTypes } from './FilterEventTypes';

interface ActivityFilterProps {
  label: string;
  fieldName: string;
  eventTypes: Array<Omit<EventType, 'category'>>;
}

export const ActivityFilter = ({ eventTypes, fieldName, label }: ActivityFilterProps) => {
  const [filteredEventTypes, setFilteredEventTypes] = useState(eventTypes);
  return (
    <Controller
      name={fieldName}
      render={({ field }) => (
        <Popover>
          <ActivityFilterTrigger label={label} selectedEventTypes={field.value} />
          <PopoverContent w={{ base: 'xs', md: 'sm', lg: '3xl' }}>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverBody py="8" px="6">
              <VStack>
                <FilterEventTypes eventTypes={eventTypes} setFilteredEventTypes={setFilteredEventTypes} />
                <Flex flexWrap="wrap" columnGap="4" width="100%">
                  {filteredEventTypes.map((eventType) => (
                    <ActivityCheckbox
                      key={eventType.id}
                      eventType={eventType}
                      isChecked={field.value.some((id: number) => id === eventType.id)}
                      handleChange={(event) => {
                        field.onChange(
                          event.target.checked
                            ? [eventType.id, ...field.value]
                            : field.value.filter((id: number) => id !== eventType.id),
                        );
                      }}
                    />
                  ))}
                </Flex>
              </VStack>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      )}
    />
  );
};

