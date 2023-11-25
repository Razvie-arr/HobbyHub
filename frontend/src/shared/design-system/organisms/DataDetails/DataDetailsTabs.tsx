import { Box, Flex, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react';
import { ReadonlyArray } from 'effect';

import { NoData } from '../../molecules';

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
      {user && other.type === 'event' ? (
        <Tab>
          <Text as="b">Participants</Text>
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
      {user && other.type === 'event' ? (
        <TabPanel px="0">
          <Flex justifyContent="space-between" flexWrap="wrap">
            {ReadonlyArray.isNonEmptyArray(other.data.participants) ? (
              ReadonlyArray.map(other.data.participants, (member) => (
                <MemberItem key={member.id} user={user} member={member} />
              ))
            ) : (
              <NoData description={`There are no participants for ${other.data.name} yet`} />
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

