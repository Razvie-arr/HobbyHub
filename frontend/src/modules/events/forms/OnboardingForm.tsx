import { Button, Checkbox, CheckboxGroup, Container, Flex, Heading, Stack, Text, VStack } from '@chakra-ui/react';
import { Controller } from 'react-hook-form';

import { eventTypes } from 'src/shared/constants';
import { AddressFormFields, addressFormFieldsSchema, Form, TextareaField, zod, zodResolver } from 'src/shared/forms';

import { FormStack } from '../components/FormStack';

import { eventTypeToSelectOption } from './utils';

const { sports, games, other } = eventTypes;

const options = [
  { value: 'sports', label: 'Sports', options: sports.map(eventTypeToSelectOption) },
  { value: 'games', label: 'Games', options: games.map(eventTypeToSelectOption) },
  { value: 'other', label: 'Other', options: other.map(eventTypeToSelectOption) },
];

const onboardingFormSchema = zod.object({
  eventTypes: zod.array(zod.number()).min(3, 'Specify at least three interests'),
  description: zod.string(),
  ...addressFormFieldsSchema,
});

export const OnboardingForm = () => (
  <Container maxW="3xl">
    <Stack spacing={8} py={8}>
      <Heading as="h1">Tell us more about yourself</Heading>
      <Text>
        Sharing a bit about yourself transforms our service into a personalized haven. Discover tailored recommendations
        and connect with like-minded individuals.
      </Text>
      <Form
        defaultValues={{
          eventTypes: [],
          streetName: '',
          streetNumber: '',
          city: '',
          country: '',
          description: '',
        }}
        resolver={zodResolver(onboardingFormSchema)}
        onSubmit={() => {}}
        noValidate
      >
        <Stack spacing={8}>
          <Controller
            name="eventTypes"
            render={({ field, fieldState }) => (
              <FormStack title="Select your interests">
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
                            boxShadow="md"
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
              </FormStack>
            )}
          />

          <FormStack title="Select your location">
            <AddressFormFields />
          </FormStack>
          <FormStack title="Set your description">
            <TextareaField
              name="description"
              placeholder="Tell the world what you're passionate about. Mention activities that you like to do in your free time or your skills. You can change the description in profile settings later."
            ></TextareaField>
          </FormStack>
          <Flex justifyContent="end">
            <Button colorScheme="purple" type="submit">
              Submit
            </Button>
          </Flex>
        </Stack>
      </Form>
    </Stack>
  </Container>
);

