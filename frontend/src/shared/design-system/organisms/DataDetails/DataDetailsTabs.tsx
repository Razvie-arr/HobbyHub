import { Box, Flex, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react';
import { pipe, ReadonlyArray } from 'effect';
import { match } from 'ts-pattern';

import { MemberItem } from './MemberItem';
import { EventDataDetails, GroupDataDetails, WithAdditionalTabs } from './types';

export const DataDetailsTabs = ({
  user,
  additionalTabs,
  ...other
}: (EventDataDetails | GroupDataDetails) & WithAdditionalTabs) => (
  <Tabs w="100%" colorScheme="purple">
    <TabList>
      {other.data.description ? (
        <Tab>
          <Text as="b">Description</Text>
        </Tab>
      ) : null}
      {user ? (
        <Tab>
          <Text as="b">
            {match(other)
              .with({ type: 'event' }, () => 'Participants')
              .with({ type: 'group' }, () => 'Members')
              .exhaustive()}
          </Text>
        </Tab>
      ) : null}
      {additionalTabs
        ? additionalTabs.map(({ title }, index) => (
            <Tab key={index}>
              <Text as="b">{title}</Text>
            </Tab>
          ))
        : null}
    </TabList>
    <TabPanels>
      {other.data.description ? (
        <TabPanel px="0">
          <Box p={4} boxShadow="sm" bgColor="white">
            <Text whiteSpace="pre-line">{other.data.description}</Text>
          </Box>
        </TabPanel>
      ) : null}
      {user ? (
        <TabPanel px="0">
          <Flex justifyContent="space-between" flexWrap="wrap">
            {pipe(
              match(other)
                .with({ type: 'event' }, ({ data }) => data.participants)
                .with({ type: 'group' }, ({ data }) => data.members)
                .exhaustive(),
              ReadonlyArray.map((member) => (
                <MemberItem
                  key={member.id}
                  name={`${member.first_name} ${member.last_name}`}
                  primaryButtonText="MESSAGE"
                />
              )),
            )}
          </Flex>
        </TabPanel>
      ) : null}
      {additionalTabs
        ? additionalTabs.map(({ content }, index) => (
            <TabPanel key={index} px="0">
              {content}
            </TabPanel>
          ))
        : null}
    </TabPanels>
  </Tabs>
);
