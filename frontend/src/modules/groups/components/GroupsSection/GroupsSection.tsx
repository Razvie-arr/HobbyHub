import { ReactNode } from 'react';
import { Button, Divider, Flex, Heading, Stack } from '@chakra-ui/react';
import { ReadonlyArray } from 'effect';

import { Box } from 'src/shared/design-system';

import { Group } from '../../types';

import { NoGroups } from './NoGroups';

interface GroupsSectionProps {
  groups: Array<Group>;
  title?: ReactNode;
  handleSeeAllGroups?: () => void;
  maxColumnCount?: 4 | 3;
}

export const GroupsSection = ({ groups, title, handleSeeAllGroups }: GroupsSectionProps) => (
  <Box>
    <Stack spacing="4">
      <Stack
        justifyContent="space-between"
        direction={{ base: 'column', lg: 'row' }}
        alignItems={{ base: 'start', lg: 'center' }}
      >
        {title ? <Heading as="h2">{title}</Heading> : null}{' '}
        {handleSeeAllGroups ? (
          <Button size="md" variant="link" colorScheme="purple" onClick={handleSeeAllGroups}>
            See all groups
          </Button>
        ) : null}
      </Stack>
      {title ? <Divider borderColor="purple.200" /> : null}
      {ReadonlyArray.isNonEmptyArray(groups) ? (
        <Flex flexWrap="wrap" columnGap="4">
          {groups.map((value) => value.name)}
        </Flex>
      ) : (
        <NoGroups />
      )}
    </Stack>
  </Box>
);
