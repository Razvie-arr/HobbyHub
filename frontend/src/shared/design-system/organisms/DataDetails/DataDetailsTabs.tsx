import { Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react';

import { WithTabsProps } from './types';

export const DataDetailsTabs = ({ tabsProps }: WithTabsProps) => (
  <Tabs w="100%" colorScheme="purple">
    <TabList>
      {tabsProps.map(({ title }, index) => (
        <Tab key={index}>
          <Text as="b">{title}</Text>
        </Tab>
      ))}
    </TabList>
    <TabPanels>
      {tabsProps.map(({ content }, index) => (
        <TabPanel key={index} px="0">
          {content}
        </TabPanel>
      ))}
    </TabPanels>
  </Tabs>
);

