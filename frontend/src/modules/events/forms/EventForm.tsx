import { ReactNode } from 'react';
import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  FormLabel,
  Image,
  Spacer,
  Stack,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { FaFile } from 'react-icons/fa6';
import { NavLink } from 'react-router-dom';

import {
  AddressFormFields,
  Form,
  InlineCheckboxField,
  InputField,
  MultiSelectField,
  zod,
  zodResolver,
} from 'src/shared/forms';

import { route } from '../../../route';
import { eventTypes } from '../../../shared/constants';
import { getCurrentDateTime } from '../../../utils/form';
import { FormStack } from '../components/FormStack';

import { eventTypeToSelectOption } from './utils';

const { sports, games, other } = eventTypes;

const options = [
  { label: 'Sports', options: sports.map(eventTypeToSelectOption) },
  { label: 'Games', options: games.map(eventTypeToSelectOption) },
  { label: 'Other', options: other.map(eventTypeToSelectOption) },
];

const addressFormFieldsSchema = {
  streetName: zod.string().min(1, 'You must specify the street name'),
  streetNumber: zod.string().min(1, 'You must specify the street number'),
  city: zod.string().min(1, 'You must specify the city'),
  country: zod.string().min(1, 'You must specify the country'),
};

const eventFormSchema = zod
  .object({
    name: zod.string().min(1, 'Event name is required').max(100, 'Name cannot be more than 100 characters long'),
    summary: zod
      .string()
      .min(1, 'Event summary is required')
      .max(300, 'Summary cannot be more than 300 characters long'),
    eventTypes: zod.array(zod.object({ value: zod.string(), label: zod.string() })),
    capacity: zod.coerce
      .number()
      .int('Fractional people will not be able to come to your event, please input integer numbers')
      .min(2, 'Capacity must be at least 2'),
    allowWaitlist: zod.boolean(),
    startDatetime: zod.string().min(1, 'Start time is required'),
    endDatetime: zod.string().min(1, 'End time is required'),
    ...addressFormFieldsSchema,
    description: zod.string().nullish(),
  })
  .refine(
    ({ startDatetime }) => {
      const currentDateTime = getCurrentDateTime();
      return startDatetime > currentDateTime;
    },
    {
      message: 'Event cannot start in the past',
      path: ['startDatetime'],
    },
  )
  .refine(({ startDatetime, endDatetime }) => endDatetime > startDatetime, {
    message: 'End time cannot be earlier than start time',
    path: ['endDatetime'],
  });

type FormValues = zod.infer<typeof eventFormSchema>;

interface EventFormProps {
  defaultValues: FormValues;
  formTitle: ReactNode;
  formDescription: ReactNode;
  handleSubmit: (values: FormValues) => Promise<unknown>;
  isLoading: boolean;
  submitButtonLabel: ReactNode;
}

export const EventForm = ({
  defaultValues,
  formTitle,
  formDescription,
  handleSubmit,
  isLoading,
  submitButtonLabel,
}: EventFormProps) => (
  <Container maxW="3xl">
    <Form onSubmit={handleSubmit} defaultValues={defaultValues} resolver={zodResolver(eventFormSchema)} noValidate>
      <Box position="sticky" top="67px" width="100%" zIndex={1} bg="purple.50" pt="6">
        <Flex direction={{ base: 'column', md: 'row' }}>
          <Flex direction="column">
            <Text fontSize="3xl" fontWeight="bold" color="purple.500">
              {formTitle}
            </Text>
            <Text>{formDescription}</Text>
          </Flex>
          <Spacer />
          <Flex gap={2} mt={3} align="end">
            <Button as={NavLink} to={route.home()} colorScheme="purple" variant="outline" bg="white" flex={1}>
              Cancel
            </Button>
            <Button colorScheme="purple" flex={1} type="submit" isLoading={isLoading}>
              {submitButtonLabel}
            </Button>
          </Flex>
        </Flex>
        <Divider borderColor="purple.500" my={5} />
      </Box>
      <Stack spacing={8} pb="8">
        <FormStack title="Basic information">
          <FormLabel>Event cover image</FormLabel>
          <Flex direction={{ base: 'column', md: 'row' }} align="end">
            <Image src="image.png" borderRadius={5} fallbackSrc="https://via.placeholder.com/400x300" />
            <Spacer />
            <Button mt={3} colorScheme="purple" variant="outline" leftIcon={<FaFile />}>
              Select from files
            </Button>
          </Flex>
          <InputField name="name" label="Event name" placeholder="Enter a short and clear name" isRequired />
          <MultiSelectField
            name="eventTypes"
            label="Event types"
            options={options}
            placeholder="Select your event type"
            isMulti
          />
          <InputField name="summary" label="Summary" placeholder="Tell people what is the event about" isRequired />
          <InputField
            name="capacity"
            label="Event capacity"
            type="number"
            min={0}
            placeholder="How many people can join the event?"
            isRequired
          />
          <InlineCheckboxField name="allowWaitlist" label="Allow waitlist" />
        </FormStack>

        <FormStack title="Time and place">
          <Flex gap={2} direction={{ base: 'column', md: 'row' }}>
            <InputField name="startDatetime" label="Start time" type="datetime-local" isRequired />
            <InputField name="endDatetime" label="End time" type="datetime-local" isRequired />
          </Flex>
          <AddressFormFields />
        </FormStack>

        <FormStack title="Event information">
          <Flex direction="column">
            <FormLabel>Description</FormLabel>
            <Textarea placeholder="Everything about the event"></Textarea>
          </Flex>
        </FormStack>
      </Stack>
    </Form>
  </Container>
);

