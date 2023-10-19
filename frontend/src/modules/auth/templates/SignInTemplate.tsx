import { route } from 'src/route';
import { Box } from 'src/shared/design-system';
import { Layout } from 'src/shared/layout';
import { RouterLink } from 'src/shared/navigation';

import { SignInForm } from '../organisms/SignInForm';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type SignInTemplateProps = {
  isLoading: boolean;
  error?: Error;
  onSubmit: (data: { email: string; password: string }) => void;
};

export function SignInTemplate({
  isLoading,
  error,
  onSubmit,
}: SignInTemplateProps) {
  return (
    <>
      <Layout>
        {/* <Heading pb="4">Sign In</Heading> */}

        <SignInForm
          isLoading={isLoading}
          errorMessage={error && error.message}
          onSubmit={onSubmit}
        >
          <Box>
            or <RouterLink to={route.signUp()}>Sign Up</RouterLink>
          </Box>
        </SignInForm>
      </Layout>
    </>
  );
}
