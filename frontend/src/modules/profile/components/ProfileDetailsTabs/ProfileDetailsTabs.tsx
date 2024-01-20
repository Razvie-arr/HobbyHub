import { Box, Tab, TabList, TabPanels, Tabs, Text } from '@chakra-ui/react';

import { WithUserProfile } from '../../../../shared/types';

import { EventsTabPanel } from './EventsTabPanel';
import { GroupsTabPanel } from './GroupsTabPanel';
import { ReviewsTabPanel } from './ReviewsTabPanel';

export const ProfileDetailsTabs = ({ userProfile }: WithUserProfile) => (
  <Box mt="30px" w="100%">
    <Tabs isFitted w="100%" colorScheme="purple">
      <TabList>
        <Tab>
          <Text as="b">Events</Text>
        </Tab>
        <Tab>
          <Text as="b">Groups</Text>
        </Tab>
        <Tab>
          <Text as="b">Reviews</Text>
        </Tab>
      </TabList>
      <TabPanels>
        <EventsTabPanel userProfile={userProfile} />
        <GroupsTabPanel userProfile={userProfile} />
        <ReviewsTabPanel userProfile={userProfile} />
      </TabPanels>
    </Tabs>
  </Box>
);

