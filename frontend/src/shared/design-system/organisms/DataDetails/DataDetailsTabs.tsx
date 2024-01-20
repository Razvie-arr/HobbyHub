import { Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react';

import { WithTabs } from './types';

export const DataDetailsTabs = ({ tabs }: WithTabs) => (
  <Tabs isFitted w="100%" colorScheme="purple">
    <TabList>
      {tabs.map(({ title }, index) => (
        <Tab key={index}>
          <Text as="b">{title}</Text>
        </Tab>
      ))}
    </TabList>
    <TabPanels>
      {tabs.map(({ content }, index) => (
        <TabPanel key={index} px="0">
          {content}
        </TabPanel>
      ))}
    </TabPanels>
  </Tabs>
);

