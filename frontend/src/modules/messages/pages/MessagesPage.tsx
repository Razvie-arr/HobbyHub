import {
  Box,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  StackDivider,
  VStack,
} from '@chakra-ui/react';
import { MdSend } from 'react-icons/md';

import { ContentContainer } from '../../../shared/layout';

export const MessagesPage = () => (
  <ContentContainer>
    <Stack direction="row" py="8">
      <Card flexGrow={1} shadow="sm" height="800px">
        <CardHeader shadow="sm">List of message threads</CardHeader>
        <VStack spacing="4" divider={<StackDivider />} overflowY="auto" maxH="100%" py="4">
          <Box w="20" minH="20" bg="green.200" />
          <Box w="20" minH="20" bg="green.300" />
          <Box w="20" minH="20" bg="green.400" />
          <Box w="20" minH="20" bg="green.500" />
          <Box w="20" minH="20" bg="green.600" />
          <Box w="20" minH="20" bg="green.200" />
          <Box w="20" minH="20" bg="green.300" />
          <Box w="20" minH="20" bg="green.400" />
          <Box w="20" minH="20" bg="green.500" />
          <Box w="20" minH="20" bg="green.600" />
          <Box w="20" minH="20" bg="green.200" />
          <Box w="20" minH="20" bg="green.300" />
          <Box w="20" minH="20" bg="green.400" />
          <Box w="20" minH="20" bg="green.500" />
          <Box w="20" minH="20" bg="green.600" />
          <Box w="20" minH="20" bg="green.200" />
          <Box w="20" minH="20" bg="green.300" />
          <Box w="20" minH="20" bg="green.400" />
          <Box w="20" minH="20" bg="green.500" />
          <Box w="20" minH="20" bg="green.600" />
        </VStack>
      </Card>
      <Card flexGrow={3} shadow="sm">
        <CardHeader>Selected message thread</CardHeader>
        <CardBody>Hi</CardBody>
        <CardFooter>
          <InputGroup>
            <Input placeholder="Write a reply..." />
            <InputRightElement width="3rem">
              <IconButton
                colorScheme="purple"
                aria-label="Send message"
                h="1.75rem"
                size="sm"
                icon={<Icon as={MdSend} />}
              />
            </InputRightElement>
          </InputGroup>
        </CardFooter>
      </Card>
    </Stack>
  </ContentContainer>
);

