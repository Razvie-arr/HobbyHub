import { useEffect, useMemo } from 'react';
import {
  Avatar,
  Container,
  Divider,
  HStack,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import { FaBars, FaPlus, FaRegBell, FaRegComment, FaXmark } from 'react-icons/fa6';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

import logoImageUrl from 'src/assets/icon/logo.png';
import { AuthModalButtons, useAuth } from 'src/modules/auth';
import { route } from 'src/route';
import { Box, Flex, IconButton, Image, Stack, useDisclosure } from 'src/shared/design-system';

import { RouterNavLink } from '../atoms';

import { SearchEventBar } from './SearchEventBar';

export function TopNavigation() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const mobileNav = useDisclosure();
  const location = useLocation();

  const menuLinks = useMemo(
    () => [
      { to: route.events(), title: 'Events' },
      { to: route.groups(), title: 'Groups' },
    ],
    [],
  );

  const closeHamburgerMenu = mobileNav.onClose;
  useEffect(
    function closeHamburgerMenuOnLocationChange() {
      closeHamburgerMenu();
    },
    [location, closeHamburgerMenu],
  );

  return (
    <Box bg="white" position="sticky" top={0} width="100%" zIndex={2} borderBottomWidth="1px" borderColor="purple.100">
      <Container maxWidth="8xl" mx="auto">
        <HStack py={{ base: 2 }} align="center" justifyContent="space-between">
          <HStack display={{ base: 'none', md: 'flex' }} spacing="4">
            <IconButton
              color="purple.600"
              _hover={{ bg: 'purple.50' }}
              _active={{ bg: 'purple.50' }}
              display={{ base: 'flex', md: 'none' }}
              alignSelf="center"
              aria-label="Open menu"
              variant="ghost"
              fontSize="lg"
              icon={mobileNav.isOpen ? <FaXmark /> : <FaBars />}
              onClick={mobileNav.onToggle}
            />

            <Image boxSize={{ base: '40px', md: '50px' }} src={logoImageUrl} alt="logo" borderRadius="base" />
            <NavLink to={route.home()}>
              <Text as="b" mr={5} fontSize={{ base: 'md', md: 'lg' }} fontFamily="heading" color="blackAlpha.900">
                HobbyHub
              </Text>
            </NavLink>

            {menuLinks.map(({ to, title }) => (
              <RouterNavLink to={to} key={to} fontWeight="medium">
                {title}
              </RouterNavLink>
            ))}
          </HStack>

          {user ? (
            <>
              <HStack>
                <SearchEventBar />
                <Tooltip label="Create event">
                  <IconButton
                    aria-label="Create event"
                    as={NavLink}
                    to={route.createEvent()}
                    colorScheme="purple"
                    fontSize="xl"
                    size="sm"
                    icon={<Icon as={FaPlus} />}
                  />
                </Tooltip>
                <IconButton
                  color="purple.600"
                  _hover={{ bg: 'purple.50' }}
                  _active={{ bg: 'purple.50' }}
                  alignSelf="center"
                  aria-label="Open notifications"
                  variant="ghost"
                  fontSize="xl"
                  icon={<FaRegComment />}
                />

                <IconButton
                  color="purple.600"
                  _hover={{ bg: 'purple.50' }}
                  _active={{ bg: 'purple.50' }}
                  alignSelf="center"
                  aria-label="Open chats"
                  variant="ghost"
                  fontSize="xl"
                  icon={<FaRegBell />}
                />
                <Menu>
                  <MenuButton ml="2">
                    <Flex align="center" gap="2">
                      <Text display={{ base: 'none', md: 'flex' }} as="b">
                        {user?.first_name}
                      </Text>
                      <Avatar size="sm" name={user?.first_name} src="" bg="purple.300" />
                    </Flex>
                  </MenuButton>
                  <MenuList>
                    <MenuItem>Profile</MenuItem>
                    <MenuItem>Settings</MenuItem>
                    <Divider />
                    <MenuItem
                      onClick={() => {
                        signOut();
                        navigate(route.home());
                      }}
                    >
                      Sign out
                    </MenuItem>
                  </MenuList>
                </Menu>
              </HStack>
            </>
          ) : (
            <AuthModalButtons />
          )}
        </HStack>

        <Box
          display={{ base: mobileNav.isOpen ? 'flex' : 'none', md: 'none' }}
          borderBottom={1}
          borderStyle="solid"
          borderColor="blackAlpha.300"
          bg="white"
          boxShadow="md"
        >
          <Flex width="100%" m="4" gap={2} flexDirection="column">
            <Stack spacing="2" p="2">
              {menuLinks.map(({ to, title }) => (
                <RouterNavLink to={to} key={to} fontWeight="medium" color="purple.600">
                  {title}
                </RouterNavLink>
              ))}
            </Stack>
          </Flex>
        </Box>
      </Container>
    </Box>
  );
}

