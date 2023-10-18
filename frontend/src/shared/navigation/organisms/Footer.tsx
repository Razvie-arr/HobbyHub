import { Box, Divider, Flex, IconButton, Image, Link, Spacer, Text, VStack } from '@chakra-ui/react';
import { FaDiscord, FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa6';

export function Footer() {
  return (
    <Box p={8}>
      <Flex alignItems="center" direction={{ base: 'column', md: 'row' }}>
        <Flex
          align="center"
          gap={1}
          alignSelf={{ base: 'center', md: 'flex-end' }}
          marginBottom={{ base: '4', md: '0' }}
        >
          <Image borderRadius="full" boxSize="35px" src="src/assets/icon/logo.png" alt="logo" />
          <Text as="b" mr={5} fontSize="lg" fontFamily="heading" color="blackAlpha.900">
            HobbyHub
          </Text>
        </Flex>
        <Spacer />
        <Flex gap={10}>
          <VStack spacing={0} align="start">
            <Text mb={1} as="b" fontSize="sm">
              Mobile App
            </Text>
            <Link color="purple.500" fontSize="sm">
              Features
            </Link>
            <Link color="purple.500" fontSize="sm">
              Teams
            </Link>
            <Link color="purple.500" fontSize="sm">
              Communities
            </Link>
          </VStack>
          <VStack spacing={0} align="start">
            <Text mb={1} as="b" fontSize="sm">
              Community
            </Text>
            <Link color="purple.500" fontSize="sm">
              Cooperations
            </Link>
            <Link color="purple.500" fontSize="sm">
              Activities
            </Link>
            <Link color="purple.500" fontSize="sm">
              Social groups
            </Link>
          </VStack>
          <VStack spacing={0} align="start">
            <Text mb={1} as="b" fontSize="sm">
              Team
            </Text>
            <Link color="purple.500" fontSize="sm">
              About us
            </Link>
            <Link color="purple.500" fontSize="sm">
              Contact us
            </Link>
            <Link color="purple.500" fontSize="sm">
              History
            </Link>
          </VStack>
        </Flex>
      </Flex>

      <Divider borderColor="purple.400" my={5} />

      <Flex alignItems="center" direction={{ base: 'column', md: 'row' }} gap={1}>
        <Text fontSize="xs" color="purple.400">
          &copy; HobbyHub, Inc. 2023. 4IT580 - Team 1
        </Text>
        <Spacer />
        <Flex alignItems="center">
          <Text color="purple.400" fontSize="sm">
            Follow us:
          </Text>
          <IconButton
            color="purple.500"
            alignSelf="center"
            aria-label="Facebook"
            variant="ghost"
            fontSize="2xl"
            icon={<FaFacebook />}
          />
          <IconButton
            color="purple.500"
            alignSelf="center"
            aria-label="Facebook"
            variant="ghost"
            fontSize="2xl"
            icon={<FaInstagram />}
          />
          <IconButton
            color="purple.500"
            alignSelf="center"
            aria-label="Facebook"
            variant="ghost"
            fontSize="2xl"
            icon={<FaTwitter />}
          />
          <IconButton
            color="purple.500"
            alignSelf="center"
            aria-label="Facebook"
            variant="ghost"
            fontSize="2xl"
            icon={<FaDiscord />}
          />
        </Flex>
      </Flex>
    </Box>
  );
}

