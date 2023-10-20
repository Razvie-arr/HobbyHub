import { useMutation } from '@apollo/client';
import { FormControl, FormLabel, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import { gql } from 'src/gql';
import { useAuth } from 'src/modules/auth';
import { Box, Button, Flex, Input, Stack } from 'src/shared/design-system';

const SIGNUP_MUTATION = gql(/* GraphQL */ `
  mutation SignUp($email: String!, $name: String!, $password: String!) {
    signUp(email: $email, name: $name, password: $password) {
      user {
        id
        name
        email
      }
      token
    }
  }
`);

export function SignUpPage() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [signUpRequest, signUpRequestState] = useMutation(SIGNUP_MUTATION, {
    onCompleted: ({ signUp: { user, token } }) => {
      auth.signIn({ token, user });
      navigate('/');
    },
    onError: () => {},
  });

  return (
      <Flex
        minH='100vh'
        align='center'
        justify='center'
        bg='purple.50'>
        <Stack spacing={4} mx='auto' minW='lg' maxW='lg' py={12} px={6}>
        <Text mx='auto' fontSize='2xl' fontWeight='bold'>Create your account</Text>
          <Box
            rounded='lg'
            bg='white'
            boxShadow='lg'
            p={8}>
            <Stack spacing={4}>
              <FormControl id="firstName">
                <FormLabel>First name</FormLabel>
                <Input type="text" />
              </FormControl>
              <FormControl id="lastName">
                <FormLabel>Last name</FormLabel>
                <Input type="text" />
              </FormControl>
              <FormControl id="userName">
                <FormLabel>Username</FormLabel>
                <Input type="text" />
              </FormControl>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input type="email" />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input type="password" />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password confirmation</FormLabel>
                <Input type="password" />
              </FormControl>

              <Button
                colorScheme="purple"
                onClick={() => {
                  void signUpRequest({
                    variables: {
                      email: 'a@a.com',
                      name: 'John Doe',
                      password: 'pass',
                    },
                  });
                }}
                isLoading={signUpRequestState.loading}
                >
                Sign up
              </Button>
              {signUpRequestState.error ? <Box color="red">{signUpRequestState.error.message}</Box> : null}
            </Stack>
          </Box>
        </Stack>
      </Flex>
  );
}

