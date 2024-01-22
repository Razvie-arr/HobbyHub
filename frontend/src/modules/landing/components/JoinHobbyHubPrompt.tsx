import { ReactNode } from 'react';
import { Heading, HStack, Image, Text, useBreakpoint, VStack } from '@chakra-ui/react';

interface JoinHobbyHubPromptProps {
  signUpFormModalButton: ReactNode;
}

export const JoinHobbyHubPrompt = ({ signUpFormModalButton }: JoinHobbyHubPromptProps) => {
  const breakpoint = useBreakpoint();
  return (
    <HStack spacing={4} w="100%">
      <VStack alignItems="start" spacing={8}>
        <Heading as="h1" fontSize={{ base: '2xl', md: '5xl' }} lineHeight={1.5}>
          Join HobbyHub
        </Heading>
        <Text fontSize="xl">
          Discover a world of diverse activities, from sports and board games to thrilling adventures, all in one place
          on our website!
        </Text>
        {signUpFormModalButton}
      </VStack>
      {['base', 'sm', 'md', 'lg'].includes(breakpoint) ? null : (
        <Image
          width={{ md: '45%' }}
          objectFit="cover"
          src="/assets/girl_design.png"
          alt="Girl designing"
          transform="rotateY(180deg)"
        />
      )}
    </HStack>
  );
};

