import { PropsWithChildren } from 'react';
import { HStack, Link, Text } from '@chakra-ui/react';

import { Alert, AlertIcon, Box, Flex } from 'src/shared/design-system';
import { Footer, ReactRouterLink, TopNavigation } from 'src/shared/navigation';

import { useAuth } from '../../modules/auth';
import { route } from '../../route';

import { ContentContainer } from './ContentContainer';

export const Layout = ({ children }: PropsWithChildren) => {
  const { user } = useAuth();
  return (
    <Flex direction="column" minHeight="100vh">
      {user && (user.event_types.length === 0 || !user.location) ? (
        <Alert status="warning">
          <ContentContainer>
            <HStack justifyContent="center" alignItems="center">
              <AlertIcon />
              <Text>
                Click{' '}
                <Link as={ReactRouterLink} to={route.onboarding()} color="purple.500">
                  here{' '}
                </Link>
                to finish your onboarding and unlock a personalized experience on HobbyHub!
              </Text>
            </HStack>
          </ContentContainer>
        </Alert>
      ) : null}
      <TopNavigation />
      <Box bg="gray.50" flexGrow={1}>
        {children}
      </Box>
      <Footer />
    </Flex>
  );
};

