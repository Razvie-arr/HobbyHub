import { useMutation } from '@apollo/client';
import { Box, Button, Divider, Flex, Spacer, Stack, Text, useToast, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from 'src/modules/auth';
import { route } from 'src/route';
import {
  AddressFormFields,
  addressFormFieldsSchema,
  EmailField,
  EventTypesSelectField,
  Form,
  FormSection,
  NameField,
  TextareaField,
  zod,
  zodResolver,
} from 'src/shared/forms';
import { WithAuthUser, WithLocation } from 'src/shared/types';

import { EDIT_PROFILE } from '../../mutations';

const schema = zod.object({
  email: zod.string().email().min(1),
  first_name: zod.string().min(1, { message: 'First name is required' }),
  last_name: zod.string().min(1, { message: 'Last name is required' }),
  description: zod.string(),
  eventTypes: zod.array(zod.number()).min(3, 'Specify at least three interests'),
  ...addressFormFieldsSchema,
});

export const EditProfileForm = ({ user, location }: WithAuthUser & WithLocation) => {
  const navigate = useNavigate();
  const toast = useToast();

  const { signIn, token } = useAuth();

  const [editProfileRequest, editProfileRequestState] = useMutation(EDIT_PROFILE, {
    onCompleted: (data) => {
      toast({
        variant: 'left-accent',
        status: 'success',
        position: 'top-right',
        title: 'Profile updated successfully!',
        isClosable: true,
      });

      const { __typename, ...updatedValues } = data.editUser;
      signIn({ token, user: { ...user, ...updatedValues } });

      navigate(route.currentProfile());
    },
  });

  return (
    <Form
      defaultValues={{
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        description: user.description ?? '',
        eventTypes: user.event_types.map(({ id }) => id),
        streetName: location.street_name,
        streetNumber: location.street_number,
        city: location.city,
        country: location.country,
      }}
      resolver={zodResolver(schema)}
      onSubmit={async (values) =>
        editProfileRequest({
          variables: {
            user: {
              first_name: values.first_name,
              last_name: values.last_name,
              email: values.email,
              description: values.description,
              event_type_ids: values.eventTypes,
              id: user.id,
              verified: user.verified,
              location_id: location.id,
            },
            location: {
              city: values.city,
              country: values.country,
              street_name: values.streetName,
              street_number: values.streetNumber,
            },
          },
        })
      }
      noValidate
    >
      <Box position="sticky" top={{ base: '49px', md: '59px' }} width="100%" zIndex={2} bg="gray.100" pt="6">
        <Flex direction={{ base: 'column', md: 'row' }}>
          <Flex direction="column">
            <Text fontSize="3xl" fontWeight="bold" color="purple.500">
              Edit profile
            </Text>
            <Text>Personalize your profile today</Text>
          </Flex>
          <Spacer />
          <Flex gap={2} mt={3} align="end">
            <Button
              onClick={() => {
                navigate(route.currentProfile());
              }}
              colorScheme="purple"
              variant="outline"
              bg="white"
              flex={1}
            >
              Cancel
            </Button>
            <Button colorScheme="purple" flex={1} type="submit" isLoading={editProfileRequestState.loading}>
              Save
            </Button>
          </Flex>
        </Flex>
        <Divider borderColor="purple.500" my={5} />
      </Box>
      <Stack spacing={8} pb="8">
        <FormSection title="Basic information">
          <VStack gap={3}>
            <NameField name="first_name" label="First name" />
            <NameField name="last_name" label="Last name" />
            <EmailField />
            <TextareaField name="description" label="Description" />
          </VStack>
        </FormSection>

        <FormSection title="Interests">
          <EventTypesSelectField name="eventTypes" />
        </FormSection>

        <FormSection title="Location">
          <AddressFormFields />
        </FormSection>
      </Stack>
    </Form>
  );
};

