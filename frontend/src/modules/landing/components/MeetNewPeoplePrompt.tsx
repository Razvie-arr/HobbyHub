import { ReactNode } from 'react';
import {
  Button,
  Card,
  CardBody,
  Heading,
  HStack,
  Icon,
  Image,
  Stack,
  Text,
  useBreakpoint,
  VStack,
} from '@chakra-ui/react';
import { MdOutlinePersonAdd, MdSearch } from 'react-icons/md';

import { route } from '../../../route';
import { ReactRouterLink } from '../../../shared/navigation';

interface MeetNewPeoplePromptProps {
  signUpFormModalButton: ReactNode;
}
export const MeetNewPeoplePrompt = ({ signUpFormModalButton }: MeetNewPeoplePromptProps) => {
  const breakpoint = useBreakpoint();
  return (
    <HStack spacing={4} w="100%" alignItems="stretch">
      <Card>
        <CardBody>
          <VStack alignItems="start" spacing={8}>
            <Heading as="h1" fontSize={{ base: '2xl', md: '5xl' }} lineHeight={1.5}>
              Meet new people
            </Heading>
            <Text fontSize="xl">
              Creating a welcoming and inclusive space for group formation and event planning starts with engaging
              introductions and fun icebreakers. We encourage active listening and the discovery of shared interests to
              forge strong connections.
            </Text>
            <Text fontSize="xl">
              Embracing diversity, setting clear objectives, and maintaining open communication are key to fostering a
              collaborative atmosphere where everyone can contribute to our collective success.
            </Text>
            <Stack
              justifyContent={{ base: 'center' }}
              alignItems="center"
              w="100%"
              direction={{ base: 'column', md: 'row' }}
              spacing={8}
            >
              <VStack w="45%">
                <Text as="b" fontSize={{ base: 'xl', md: '3xl' }}>
                  Discover groups
                </Text>
                <Icon as={MdSearch} boxSize="28" color="purple.500" />
                <Button w="100%" as={ReactRouterLink} to={route.search()} colorScheme="purple">
                  Find a group
                </Button>
              </VStack>
              <VStack w="45%">
                <Text as="b" fontSize={{ base: 'xl', md: '3xl' }}>
                  Create groups
                </Text>
                <Icon as={MdOutlinePersonAdd} boxSize="28" color="purple.500" />
                {signUpFormModalButton}
              </VStack>
            </Stack>
          </VStack>
        </CardBody>
      </Card>
      {['base', 'sm', 'md', 'lg'].includes(breakpoint) ? null : (
        <Image width={{ md: '55%' }} objectFit="cover" src="/assets/people2.png" alt="People" />
      )}
    </HStack>
  );
};

