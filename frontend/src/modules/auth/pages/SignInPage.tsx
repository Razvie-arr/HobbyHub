import { useCallback } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

import { gql } from 'src/gql';
import { useAuth } from 'src/modules/auth';

import { SignInTemplate } from '../templates';

const SIGNIN_MUTATION = gql(/* GraphQL */ `
  mutation SignIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      user {
        id
        name
        userName
        profileImageUrl
      }
      token
    }
  }
`);

export function SignInPage() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [signinRequest, signinRequestState] = useMutation(SIGNIN_MUTATION, {
    onCompleted: ({ signIn: { user, token } }) => {
      auth.signIn({ token, user });
      navigate('/');
    },
    onError: () => {},
  });

  const handleSignInFormSubmit = useCallback(
    (variables: { email: string; password: string }) => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      signinRequest({ variables });
    },
    [signinRequest],
  );

  return (
    <SignInTemplate
      isLoading={signinRequestState.loading}
      error={signinRequestState.error}
      onSubmit={handleSignInFormSubmit}
    />
  );
}

