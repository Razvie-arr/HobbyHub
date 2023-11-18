import { Fragment, ReactNode } from 'react';
import { Alert, AlertDescription, AlertIcon, AlertTitle } from '@chakra-ui/react';

import { Box } from 'src/shared/design-system';

import { ContentContainer } from '../../layout';

interface NotAuthorizedProps {
  requireSignIn?: boolean;
  description?: ReactNode;
  wrapInContentContainer?: boolean;
}

export const NotAuthorized = ({ requireSignIn, description, wrapInContentContainer }: NotAuthorizedProps) => {
  const Wrapper = wrapInContentContainer ? ContentContainer : Fragment;
  return (
    <Wrapper mt="8">
      <Alert status="error">
        <AlertIcon />
        <Box>
          <AlertTitle>Not authorized!</AlertTitle>
          {requireSignIn ? <AlertDescription>Sign in to access the action</AlertDescription> : null}
          {description ? <AlertDescription>{description}</AlertDescription> : null}
        </Box>
      </Alert>
    </Wrapper>
  );
};

