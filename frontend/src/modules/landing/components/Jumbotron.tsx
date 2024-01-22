import { ReactNode } from 'react';
import { Card, CardBody, Heading, Image, Text, VStack } from '@chakra-ui/react';

interface JumbotronProps {
  signUpFormModalButton: ReactNode;
}

export const Jumbotron = ({ signUpFormModalButton }: JumbotronProps) => (
  <Card direction={{ base: 'column', md: 'row' }} w="100%" p="4">
    <CardBody>
      <VStack alignItems="start" spacing={8}>
        <Heading as="h1" fontSize={{ base: '2xl', md: '5xl' }} lineHeight={1.5}>
          Unleash the Power of Connection: Join Vibrant Events and Communities at{' '}
          <Text color="purple.500" display="inline">
            HobbyHub
          </Text>
        </Heading>
        <Text fontSize="xl">
          Provide us with your essential details, and we'll effortlessly match you into community with fellow
          enthusiasts who share your passion or create your own team.
        </Text>
        {signUpFormModalButton}
      </VStack>
    </CardBody>
    <Image width={{ md: '45%' }} objectFit="cover" src="/assets/chess2.gif" alt="Chess GIF" />
  </Card>
);

