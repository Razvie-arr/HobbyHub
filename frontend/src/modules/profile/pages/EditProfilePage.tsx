import { useMutation } from '@apollo/client';
import { Box, Button, Container, Divider, Flex, Spacer, Stack, Text, useToast, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from 'src/modules/auth';
import { EmailField, NameField } from 'src/modules/auth/components/fields';
import { NotAuthorized } from 'src/shared/design-system';
import {
  AddressFormFields,
  addressFormFieldsSchema,
  EventTypesSelectField,
  Form,
  FormSection,
  TextareaField,
  zod,
  zodResolver,
} from 'src/shared/forms';

import { route } from '../../../route';
import { EDIT_PROFILE } from '../mutations';

const schema = zod.object({
  email: zod.string().email().min(1),
  first_name: zod.string().min(1, { message: 'First name is required' }),
  last_name: zod.string().min(1, { message: 'Last name is required' }),
  description: zod.string(),
  eventTypes: zod.array(zod.number()).min(3, 'Specify at least three interests'),
  ...addressFormFieldsSchema,
});

export const EditProfilePage = () => {
  const { signIn, token, user } = useAuth();
  const [editProfilePageRequest, editProfilePageRequestState] = useMutation(EDIT_PROFILE);
  const navigate = useNavigate();
  const toast = useToast();

  if (!user) {
    return <NotAuthorized requireSignIn wrapInContentContainer />;
  }

  if (!user.location || user.event_types.length === 0) {
    // TODO: This needs be resolved declaratively
    navigate(route.onboarding());
    return null;
  }

  return (
    <Container maxW="3xl">
      <Form
        defaultValues={{
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          description: user.description ?? '',
          eventTypes: user.event_types.map(({ id }) => id),
          streetName: user.location?.street_name,
          streetNumber: user.location?.street_number,
          city: user.location?.city,
          country: user.location?.country,
        }}
        resolver={zodResolver(schema)}
        onSubmit={async (values) => {
          const result = await editProfilePageRequest({
            variables: {
              user: {
                first_name: values.first_name,
                last_name: values.last_name,
                email: values.email,
                description: values.description,
                event_type_ids: values.eventTypes,
                id: user.id,
                verified: user.verified,
                location_id: user.location_id,
              },
              location: {
                city: values.city,
                country: values.country,
                street_name: values.streetName,
                street_number: values.streetNumber,
              },
            },
          });
          if (result.data?.editUser) {
            toast({
              variant: 'left-accent',
              status: 'success',
              position: 'top-right',
              title: 'Profile updated successfully!',
              isClosable: true,
            });
            signIn({ token, user: { ...user, ...values, event_types: result.data.editUser.event_types } });
            navigate(route.currentProfile());
          }
        }}
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
              <Button colorScheme="purple" flex={1} type="submit" isLoading={editProfilePageRequestState.loading}>
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
    </Container>
  );
};

