import { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { Button, Container, Flex, Heading, Stack, Text, useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import { gql } from 'src/gql';
import { route } from 'src/route';
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

import { WithAuthUser } from '../../../shared/types';
import { useAuth } from '..';

const onboardingFormSchema = zod.object({
  eventTypes: zod.array(zod.number()).min(3, 'Specify at least three interests'),
  description: zod.string(),
  ...addressFormFieldsSchema,
});

type FormValues = zod.infer<typeof onboardingFormSchema>;

const ONBOARD_USER = gql(`
  mutation OnboardUser($user: UserInput!, $location: LocationInputWithoutCoords!) {
    onboardUser(user: $user, location: $location) {
      id
      email
      first_name
      last_name
      verified
      location_id
      description
      location {
        id
        country
        city
        street_name
        street_number
        latitude
        longitude
      }
      event_types {
        id
        name
        category
      }
    }
  }
`);

export const OnboardingForm = ({ user }: WithAuthUser) => {
  const { token, signIn } = useAuth();
  const [onboardUserRequest, onboardUserRequestState] = useMutation(ONBOARD_USER);
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    if (user.location || user.event_types.length > 0) {
      // TODO: This needs be resolved declaratively
      navigate(route.editProfile());
    }
  });

  return (
    <Container maxW="3xl">
      <Stack spacing={8} py={8}>
        <Heading as="h1">Tell us more about yourself</Heading>
        <Text>
          Sharing a bit about yourself transforms our service into a personalized haven. Discover tailored
          recommendations and connect with like-minded individuals.
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
          onSubmit={async ({
            eventTypes: eventTypeValues,
            description,
            streetName,
            streetNumber,
            ...values
          }: FormValues) => {
            const { event_types, groups, location, __typename, ...rest } = user;
            const updatedUser = await onboardUserRequest({
              variables: {
                user: {
                  ...rest,
                  event_type_ids: eventTypeValues,
                  description: description,
                },
                location: {
                  street_name: streetName,
                  street_number: streetNumber,
                  ...values,
                },
              },
            });
            if (updatedUser.data) {
              toast({
                variant: 'left-accent',
                status: 'success',
                position: 'top-right',
                title: 'Onboarding completed!',
                description: 'Enjoy a personalized experience on HobbyHub!',
                isClosable: true,
              });
              signIn({ token, user: { ...updatedUser.data.onboardUser, groups: [] } });
              navigate(route.events());
            }
          }}
          noValidate
        >
          <Stack spacing={8}>
            <FormSection title="Select your interests">
              <EventTypesSelectField name="eventTypes" />
            </FormSection>

            <FormSection title="Select your location">
              <AddressFormFields />
            </FormSection>
            <FormSection title="Set your description">
              <TextareaField
                name="description"
                placeholder="Tell the world what you're passionate about. Mention activities that you like to do in your free time or your skills. You can change the description in profile settings later."
              ></TextareaField>
            </FormSection>
            <Flex justifyContent="end">
              <Button colorScheme="purple" type="submit" isLoading={onboardUserRequestState.loading}>
                Submit
              </Button>
            </Flex>
          </Stack>
        </Form>
      </Stack>
    </Container>
  );
};

