import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  FormLabel,
  Image,
  Spacer,
  Stack,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { FaFile } from 'react-icons/fa6';
import { NavLink } from 'react-router-dom';

import { AddressFormFields, Form, InputField, MultiSelectField } from 'src/shared/forms';

import { route } from '../../../route';

import { FormStack } from './FormStack';

const activityOptions = [
  { value: 'volleyball', label: 'Volleyball', color: '#0052CC' },
  { value: 'basketball', label: 'Basketball', color: '#5243AA' },
  { value: 'athletics', label: 'Athletics', color: '#FF5630' },
  { value: 'e-sports', label: 'E-sports', color: '#FF8B00' },
  { value: 'swimming', label: 'Swimming', color: '#FFC400' },
  { value: 'yoga', label: 'Yoga', color: '#36B37E' },
];

export const EventForm = () => (
  <Container maxW="3xl">
    <Box position="sticky" top="67px" width="100%" zIndex={1} bg="purple.50" pt="6">
      <Flex direction={{ base: 'column', md: 'row' }}>
        <Flex direction="column">
          <Text fontSize="3xl" fontWeight="bold" color="purple.500">
            Create event
          </Text>
          <Text>Efficiently coordinate your events or gatherings.</Text>
        </Flex>
        <Spacer />
        <Flex gap={2} mt={3} align="end">
          <Button as={NavLink} to={route.home()} colorScheme="purple" variant="outline" bg="white" flex={1}>
            Cancel
          </Button>
          <Button colorScheme="purple" flex={1}>
            Create
          </Button>
        </Flex>
      </Flex>
      <Divider borderColor="purple.500" my={5} />
    </Box>

    <Form onSubmit={() => {}}>
      <Stack spacing={8} pb="8">
        <FormStack title="Basic information">
          <FormLabel>Event cover image</FormLabel>
          <Flex direction={{ base: 'column', md: 'row' }} align="end">
            <Image src="image.png" borderRadius={5} fallbackSrc="https://via.placeholder.com/400x300" />
            <Spacer />
            <Button mt={3} colorScheme="purple" variant="outline" leftIcon={<FaFile />}>
              Select from files
            </Button>
          </Flex>
          <InputField name="eventName" label="Event name" placeholder="Enter a short and clear name"></InputField>
          <MultiSelectField
            name="colors"
            label="Event type"
            options={activityOptions}
            placeholder="Select your event type"
            isMulti
          />
          <InputField name="summary" label="Summary" placeholder="Tell people what is the event about"></InputField>
          <InputField
            name="eventCapacity"
            label="Event capacity"
            type="number"
            placeholder="How many people can join the event?"
          ></InputField>
        </FormStack>

        <FormStack title="Time and place">
          <Flex gap={2} direction={{ base: 'column', md: 'row' }}>
            <InputField name="eventStartDate" label="Event start date" type="date"></InputField>
            <InputField name="eventEndDate" label="Event end date" type="date"></InputField>
          </Flex>
          <Flex gap={2} direction={{ base: 'column', md: 'row' }}>
            <InputField name="timeFrom" label="Start time" type="time"></InputField>
            <InputField name="timeTo opening hours" label="End time" type="time"></InputField>
          </Flex>
          <AddressFormFields />
        </FormStack>

        <FormStack title="Event information">
          <Flex direction="column">
            <FormLabel>Description</FormLabel>
            <Textarea placeholder="Everything about the event"></Textarea>
          </Flex>
          <InputField name="url" label="Website / Tickets" placeholder="Enter web address"></InputField>
        </FormStack>
      </Stack>
    </Form>
  </Container>
);

