import { Box, Center, Heading, HStack, Icon, Spinner, Text, VStack } from '@chakra-ui/react';
import { GiPartyPopper } from 'react-icons/gi';

import { ContentContainer } from '../../../shared/layout';
import { useTokenVerification } from '../hooks';

export const VerifyUserPage = () => {
  const { isVerified, verifyUserState } = useTokenVerification();

  return (
    <ContentContainer>
      <Box p={8}>
        {verifyUserState.loading ? (
          <Center>
            <HStack spacing="4">
              <Spinner size="lg" />
              <Text fontSize="2xl">Verifying user...</Text>
            </HStack>
          </Center>
        ) : isVerified ? (
          <VStack spacing={8}>
            <Heading as="h1">Email is successfully verified!</Heading>
            <Icon as={GiPartyPopper} boxSize={32} color="purple.500" />
            <VStack spacing="0.5">
              <Text as="b" color="purple.500" fontSize="xl">
                Unlock a Personalized Experience!
              </Text>
              <Text fontSize="xl">Sign in now to complete your profile and enhance your journey with us.</Text>
            </VStack>
          </VStack>
        ) : (
          <Center>
            <Text fontSize="xl">We were unable to verify you, please request a new verification link.</Text>
          </Center>
        )}
      </Box>
    </ContentContainer>
  );
};
