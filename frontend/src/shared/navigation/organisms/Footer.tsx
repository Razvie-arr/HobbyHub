import { Box, Container, Text } from '@chakra-ui/react';

export const Footer = () => (
  <Box p={8}>
    <Container maxWidth="8xl" mx="auto">
      <Text fontSize="xs" color="purple.400">
        &copy; HobbyHub, Inc. 2023. 4IT580 - Team 1
      </Text>
    </Container>
  </Box>
);

