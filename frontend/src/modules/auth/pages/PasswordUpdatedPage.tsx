import { Box, Heading, Icon, Text, VStack } from '@chakra-ui/react';
import { FaCircleCheck } from 'react-icons/fa6';

import { ContentContainer } from '../../../shared/layout';

export const PasswordUpdatedPage = () => (
  <ContentContainer>
    <Box p={8}>
      <VStack spacing={8}>
        <Heading as="h1">Your password has been successfully updated!</Heading>
        <Icon as={FaCircleCheck} boxSize={32} color="purple.500" />
        <VStack spacing="0.5">
          <Text as="b" color="purple.500" fontSize="xl">
            Your account is now accessible!
          </Text>
          <Text fontSize="xl">Sign in to your account with the new credentials.</Text>
        </VStack>
      </VStack>
    </Box>
  </ContentContainer>
);
