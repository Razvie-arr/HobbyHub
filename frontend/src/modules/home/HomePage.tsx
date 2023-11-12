import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';

import { ContentContainer } from '../../shared/layout';
import { DefaultEventsPage } from '../events';
import { DefaultGroupsPage } from '../groups';

export const HomePage = () => (
  <ContentContainer>
    <Tabs variant="soft-rounded" colorScheme="purple" mt="8" size="lg">
      <TabList>
        <Tab>Events</Tab>
        <Tab>Groups</Tab>
      </TabList>

      <TabPanels>
        <TabPanel p="0">
          <DefaultEventsPage />
        </TabPanel>
        <TabPanel p="0">
          <DefaultGroupsPage />
        </TabPanel>
      </TabPanels>
    </Tabs>
  </ContentContainer>
);

