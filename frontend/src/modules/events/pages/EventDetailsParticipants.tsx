import { Box, Button, HStack, IconButton, Text } from '@chakra-ui/react';
import { MdAccountCircle } from 'react-icons/md';

interface EventDetailsProps {
  name: string;
  primaryButtonText: string;
}

export const EventDetailsParticipants = ({ name, primaryButtonText }: EventDetailsProps) => (
  <HStack justifyContent="space-between" bgColor="white" p={3} flexBasis="45%" borderRadius={10} mb={4}>
    <HStack>
      <IconButton
        isRound={true}
        color="purple.500"
        bgColor="white"
        alignSelf="center"
        aria-label="Profile"
        icon={<MdAccountCircle />}
        fontSize="40"
      />
      <Text>{name}</Text>
    </HStack>
    <Box>
      <Button borderRadius={5} size="sm" colorScheme="purple">
        {primaryButtonText}
      </Button>
    </Box>
  </HStack>
);
