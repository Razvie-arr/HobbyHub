import { useEffect, useMemo } from 'react';
import { Avatar, Container, Divider, HStack, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react';
import { FaBars, FaRegBell, FaRegComment, FaXmark } from 'react-icons/fa6';
import { useLocation, useNavigate } from 'react-router-dom';

import logoImageUrl from 'src/assets/icon/logo.png';
import { AuthModalButtons, useAuth } from 'src/modules/auth';
import { route } from 'src/route';
import { Box, Flex, IconButton, Image, Spacer, Stack, useDisclosure } from 'src/shared/design-system';

import { RouterNavLink } from '../atoms';

export function TopNavigation() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const mobileNav = useDisclosure();
  const location = useLocation();

  const menuLinks = useMemo(
    () => [
      { to: route.home(), title: 'Events' },
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
    <Box
      bg="purple.50"
      position="sticky"
      top={0}
      width="100%"
      zIndex="1"
      borderBottomWidth="1px"
      borderColor="purple.100"
    >
      <Container maxWidth="8xl" mx="auto">
        <HStack py={{ base: 2 }} align="center" spacing="4">
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
          <Text as="b" mr={5} fontSize={{ base: 'md', md: 'lg' }} fontFamily="heading" color="blackAlpha.900">
            HobbyHub
          </Text>

          <HStack display={{ base: 'none', md: 'flex' }} spacing="4">
            {menuLinks.map(({ to, title }) => (
              <RouterNavLink to={to} key={to} fontWeight="medium">
                {title}
              </RouterNavLink>
            ))}
          </HStack>

          <Spacer />

          {user ? (
            <>
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
                      {user?.name}
                    </Text>
                    <Avatar size="sm" name={user?.name} src="" bg="purple.300" />
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
                      window.location.reload();
                    }}
                  >
                    Sign out
                  </MenuItem>
                </MenuList>
              </Menu>
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

