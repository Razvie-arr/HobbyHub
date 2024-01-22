import { useMutation } from '@apollo/client';
import { Box, Button, Divider, Flex, Spacer, Stack, Text, useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import { route } from 'src/route';
import { Form, FormSection, PasswordField, zod, zodResolver } from 'src/shared/forms';
import { WithAuthUser } from 'src/shared/types';

import { CHANGE_PASSWORD } from '../../mutations';

const schema = zod
  .object({
    password: zod.string().min(1, { message: 'Password is required' }),
    passwordConfirmation: zod.string().min(1, { message: 'Password confirmation is required' }),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'Passwords must match',
    path: ['passwordConfirmation'],
  });

export const ChangePasswordForm = ({ user }: WithAuthUser) => {
  const navigate = useNavigate();
  const toast = useToast();

  const [editAuthProfileRequest, editAuthProfileRequestState] = useMutation(CHANGE_PASSWORD, {
    onCompleted: () => {
      toast({
        variant: 'left-accent',
        status: 'success',
        position: 'top-right',
        title: 'Password changed successfully!',
        isClosable: true,
      });
    },
  });

  return (
    <Form
      defaultValues={{
        password: '',
        passwordConfirmation: '',
      }}
      resolver={zodResolver(schema)}
      onSubmit={async (values) =>
        editAuthProfileRequest({
          variables: {
            id: user.id,
            password: values.password,
          },
        })
      }
      noValidate
    >
      <Box position="sticky" top={{ base: '49px', md: '59px' }} width="100%" zIndex={2} bg="gray.100" pt="6">
        <Flex direction={{ base: 'column', md: 'row' }}>
          <Flex direction="column">
            <Text fontSize="3xl" fontWeight="bold" color="purple.500">
              Change password
            </Text>
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
            <Button colorScheme="purple" flex={1} type="submit" isLoading={editAuthProfileRequestState.loading}>
              Change
            </Button>
          </Flex>
        </Flex>
        <Divider borderColor="purple.500" my={5} />
      </Box>
      <Stack spacing={8} pb="8">
        <FormSection>
          <PasswordField label="New Password" confirmationLabel="New Password Confirmation" confirmPassword />
        </FormSection>
      </Stack>
    </Form>
  );
};

