import { ReactNode, useState } from 'react';
import { useMutation } from '@apollo/client';
import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  FormLabel,
  Image,
  Input,
  InputGroup,
  InputRightAddon,
  Spacer,
  Spinner,
  Stack,
  Text,
} from '@chakra-ui/react';
import { Controller } from 'react-hook-form';

import {
  AddressFormFields,
  addressFormFieldsSchema,
  Form,
  InlineCheckboxField,
  InputField,
  MultiSelectField,
  TextareaField,
  zod,
  zodResolver,
} from 'src/shared/forms';

import { DEFAULT_EVENT_IMAGE_PATH, eventTypes } from '../../../shared/constants';
import { Field } from '../../../shared/design-system';
import { getCurrentDateTime } from '../../../utils/form';
import { UPLOAD_EVENT_IMAGE } from '../mutations';

import { FormStack } from './FormStack';
import { eventTypeToSelectOption } from './utils';

const { sports, games, other } = eventTypes;

const options = [
  { label: 'Sports', options: sports.map(eventTypeToSelectOption) },
  { label: 'Games', options: games.map(eventTypeToSelectOption) },
  { label: 'Other', options: other.map(eventTypeToSelectOption) },
];

const eventFormSchema = zod
  .object({
    author: zod.string().min(1, 'Event name is required').max(100, 'Name cannot be more than 100 characters long'),
    name: zod.string().min(1, 'Event name is required').max(100, 'Name cannot be more than 100 characters long'),
    summary: zod
      .string()
      .min(1, 'Event summary is required')
      .max(300, 'Summary cannot be more than 300 characters long'),
    eventTypes: zod
      .array(zod.object({ value: zod.number(), label: zod.string() }))
      .nonempty('You must specify at least one event type'),
    capacity: zod.coerce
      .number()
      .int('Fractional people will not be able to come to your event, please input integer numbers')
      .min(1, 'Capacity must be at least 1')
      .max(100, 'Capacity must be more than 100'),
    allowWaitlist: zod.boolean(),
    startDatetime: zod.string().min(1, 'Start time is required'),
    endDatetime: zod.string().min(1, 'End time is required'),
    ...addressFormFieldsSchema,
    eventImagePath: zod.string().nullish(),
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
    message: 'Event cannot end earlier than start time',
    path: ['endDatetime'],
  })
  .refine(
    ({ startDatetime, endDatetime }) => {
      const startDate = new Date(startDatetime);
      const endDate = new Date(endDatetime);
      return startDate.getDate() === endDate.getDate();
    },
    {
      message: 'Event cannot end on a different day',
      path: ['endDatetime'],
    },
  );

type FormValues = zod.infer<typeof eventFormSchema>;

interface EventFormProps {
  additionalButton?: ReactNode;
  defaultImagePath?: string | null;
  defaultValues: FormValues;
  formTitle: ReactNode;
  formDescription: ReactNode;
  handleCancel: () => void;
  handleSubmit: (values: FormValues) => Promise<unknown>;
  isLoading: boolean;
  submitButtonLabel: ReactNode;
}

export const EventForm = ({
  additionalButton,
  defaultImagePath,
  defaultValues,
  formTitle,
  formDescription,
  handleSubmit,
  handleCancel,
  isLoading,
  submitButtonLabel,
}: EventFormProps) => {
  const [imageFilePath, setImageFilePath] = useState(defaultImagePath ?? DEFAULT_EVENT_IMAGE_PATH);
  const [uploadEventImageRequest, uploadEventImageRequestState] = useMutation(UPLOAD_EVENT_IMAGE);
  return (
    <Container maxW="3xl">
      <Form onSubmit={handleSubmit} defaultValues={defaultValues} resolver={zodResolver(eventFormSchema)} noValidate>
        <Box position="sticky" top={{ base: '57px', md: '67px' }} width="100%" zIndex={2} bg="purple.50" pt="6">
          <Flex direction={{ base: 'column', md: 'row' }}>
            <Flex direction="column">
              <Text fontSize="3xl" fontWeight="bold" color="purple.500">
                {formTitle}
              </Text>
              <Text>{formDescription}</Text>
            </Flex>
            <Spacer />
            <Flex gap={2} mt={3} align="end">
              <Button onClick={handleCancel} colorScheme="purple" variant="outline" bg="white" flex={1}>
                Cancel
              </Button>
              <Button colorScheme="purple" flex={1} type="submit" isLoading={isLoading}>
                {submitButtonLabel}
              </Button>
              {additionalButton}
            </Flex>
          </Flex>
          <Divider borderColor="purple.500" my={5} />
        </Box>
        <Stack spacing={8} pb="8">
          <FormStack title="Basic information">
            <FormLabel>Event cover image</FormLabel>
            <InputField name="author" label="Author" isRequired isDisabled />
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
            <Controller
              name="eventImagePath"
              render={({ field: { onChange, ...field }, fieldState }) => (
                <Field label="Event image" error={fieldState.error?.message}>
                  <InputGroup>
                    <Input
                      {...field}
                      isDisabled={uploadEventImageRequestState.loading}
                      accept="image/*"
                      p="4px"
                      type="file"
                      value=""
                      onChange={async (event) => {
                        const result = await uploadEventImageRequest({
                          variables: { eventImage: event.target.files?.[0] ?? null },
                        });
                        const path = result.data?.uploadEventImage;
                        if (path) {
                          setImageFilePath(path);
                          onChange(path);
                        }
                      }}
                    />
                    {uploadEventImageRequestState.loading ? <InputRightAddon children={<Spinner />} /> : null}
                  </InputGroup>
                </Field>
              )}
            />
            <Image
              aspectRatio="16/9"
              objectFit="cover"
              alt="Event Image"
              src={imageFilePath ?? DEFAULT_EVENT_IMAGE_PATH}
            />
            <TextareaField
              name="description"
              label="Description"
              placeholder="Everything about the event"
              resize="vertical"
              rows={20}
            />
          </FormStack>
        </Stack>
      </Form>
    </Container>
  );
};

