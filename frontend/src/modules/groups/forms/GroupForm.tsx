import { ReactNode, useState } from 'react';
import { useMutation } from '@apollo/client';
import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
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
  InputField,
  MultiSelectField,
  TextareaField,
  zod,
  zodResolver,
} from 'src/shared/forms';

import { DEFAULT_IMAGE_PATH, eventTypes } from '../../../shared/constants';
import { Field } from '../../../shared/design-system';
import { FormSection } from '../../../shared/forms/molecules/FormSection';
import { eventTypeToSelectOption } from '../../../shared/forms/utils';
import { UPLOAD_GROUP_IMAGE } from '../../groups/mutations';

const { sports, games, other } = eventTypes;

const options = [
  { label: 'Sports', options: sports.map(eventTypeToSelectOption) },
  { label: 'Games', options: games.map(eventTypeToSelectOption) },
  { label: 'Other', options: other.map(eventTypeToSelectOption) },
];

const groupFormSchema = zod.object({
  name: zod.string().min(1, 'Group name is required').max(100, 'Name cannot be more than 100 characters long'),
  summary: zod.string().min(1, 'Group summary is required').max(300, 'Summary cannot be more than 300 characters long'),
  eventTypes: zod
    .array(zod.object({ value: zod.number(), label: zod.string() }))
    .nonempty('You must specify at least one group type'),
  ...addressFormFieldsSchema,
  groupImagePath: zod.string().nullish(),
  description: zod.string().nullish(),
});

type FormValues = zod.infer<typeof groupFormSchema>;

interface GroupFormProps {
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

export const GroupForm = ({
  additionalButton,
  defaultImagePath,
  defaultValues,
  formTitle,
  formDescription,
  handleCancel,
  handleSubmit,
  isLoading,
  submitButtonLabel,
}: GroupFormProps) => {
  const [imageFilePath, setImageFilePath] = useState(defaultImagePath ?? DEFAULT_IMAGE_PATH);
  const [uploadGroupImageRequest, uploadGroupImageRequestState] = useMutation(UPLOAD_GROUP_IMAGE);
  return (
    <Container maxW="3xl">
      <Form onSubmit={handleSubmit} defaultValues={defaultValues} resolver={zodResolver(groupFormSchema)} noValidate>
        <Box position="sticky" top={{ base: '57px', md: '67px' }} width="100%" zIndex={2} bg="gray.100" pt="6">
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
          <FormSection title="Basic information">
            <InputField name="name" label="Group name" placeholder="Enter a short and clear name" isRequired />
            <MultiSelectField
              name="eventTypes"
              label="Group types"
              options={options}
              placeholder="Select your group type"
              isMulti
            />
            <InputField name="summary" label="Summary" placeholder="Tell people what is the group about" isRequired />
          </FormSection>

          <FormSection title="Time and place">
            <AddressFormFields />
          </FormSection>

          <FormSection title="Group information">
            <Controller
              name="groupImagePath"
              render={({ field: { onChange, ...field }, fieldState }) => (
                <Field label="Group image" error={fieldState.error?.message}>
                  <InputGroup>
                    <Input
                      {...field}
                      isDisabled={uploadGroupImageRequestState.loading}
                      accept="image/*"
                      p="4px"
                      type="file"
                      value=""
                      onChange={async (group) => {
                        const result = await uploadGroupImageRequest({
                          variables: { groupImage: group.target.files?.[0] ?? null },
                        });
                        const path = result.data?.uploadGroupImage;
                        if (path) {
                          setImageFilePath(path);
                          onChange(path);
                        }
                      }}
                    />
                    {uploadGroupImageRequestState.loading ? <InputRightAddon children={<Spinner />} /> : null}
                  </InputGroup>
                </Field>
              )}
            />
            <Image aspectRatio="16/9" objectFit="cover" alt="Group Image" src={imageFilePath ?? DEFAULT_IMAGE_PATH} />
            <TextareaField
              name="description"
              label="Description"
              placeholder="Everything about the group"
              resize="vertical"
              rows={20}
            />
          </FormSection>
        </Stack>
      </Form>
    </Container>
  );
};
