import { Checkbox, CheckboxGroup, Text, VStack } from '@chakra-ui/react';
import { Controller } from 'react-hook-form';

import { eventTypes } from 'src/shared/constants';

import { eventTypeToSelectOption } from '../../utils';

const { sports, games, other } = eventTypes;

const options = [
  { label: 'Sports', options: sports.map(eventTypeToSelectOption) },
  { label: 'Games', options: games.map(eventTypeToSelectOption) },
  { label: 'Other', options: other.map(eventTypeToSelectOption) },
];

export const EventTypesSelectField = ({ name }: { name: string }) => (
  <Controller
    name={name}
    render={({ field, fieldState }) => (
      <>
        {fieldState.error?.message ? <Text color="red.500">{fieldState.error?.message}</Text> : null}
        <CheckboxGroup colorScheme="purple">
          <VStack spacing={6} overflowY="scroll" h="400px">
            {options.map((section) => (
              <VStack key={section.label} align="start" w="90%">
                <Text fontWeight="bold">{section.label}</Text>
                {section.options.map((option) => (
                  <Checkbox
                    key={option.value}
                    w="100%"
                    bg="purple.50"
                    boxShadow="xs"
                    p={2}
                    borderColor="purple.500"
                    isChecked={field.value.some((id: number) => id === option.value)}
                    onChange={(event) => {
                      field.onChange(
                        event.target.checked
                          ? [option.value, ...field.value]
                          : field.value.filter((id: number) => id !== option.value),
                      );
                    }}
                  >
                    {option.label}
                  </Checkbox>
                ))}
              </VStack>
            ))}
          </VStack>
        </CheckboxGroup>
      </>
    )}
  />
);

