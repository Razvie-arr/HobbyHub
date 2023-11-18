import { useEffect, useMemo } from 'react';
import { Avatar, Button, Divider, HStack, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react';
import { FaBars, FaChevronDown, FaMagnifyingGlass, FaRegComment, FaXmark } from 'react-icons/fa6';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

import { AuthModalButtons, useAuth } from 'src/modules/auth';
import { route } from 'src/route';
import { Box, Flex, IconButton, Image, Stack, useDisclosure } from 'src/shared/design-system';

import { LOGO_PATH } from '../../constants';
import { ContentContainer } from '../../layout';
import { RouterNavLink } from '../atoms';

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
    <Box bg="white" position="sticky" top={0} width="100%" zIndex={3} borderBottomWidth="1px" borderColor="purple.100">
      <ContentContainer>
        <HStack py={{ base: 1 }} align="center" justifyContent="space-between">
          <HStack>
            <Image boxSize={{ base: '40px', md: '50px' }} src={LOGO_PATH} alt="logo" borderRadius="base" />
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

            <HStack display={{ base: 'none', md: 'flex' }} spacing="4">
              {menuLinks.map(({ to, title }) => (
                <RouterNavLink to={to} key={to} fontWeight="medium">
                  {title}
                </RouterNavLink>
              ))}
            </HStack>
          </HStack>
          {user ? (
            <>
              <HStack>
                <Menu>
                  <MenuButton
                    as={Button}
                    colorScheme="purple"
                    _hover={{ bg: 'purple.600' }}
                    _expanded={{ bg: 'purple.600' }}
                    rightIcon={<FaChevronDown />}
                  >
                    Create
                  </MenuButton>
                  <MenuList>
                    <MenuItem as={NavLink} to={route.createEvent()}>
                      Event
                    </MenuItem>
                    <MenuItem as={NavLink} to={route.createGroup()}>
                      Group
                    </MenuItem>
                  </MenuList>
                </Menu>
                <IconButton
                  as={NavLink}
                  to={route.search()}
                  color="purple.600"
                  _hover={{ bg: 'purple.50' }}
                  _active={{ bg: 'purple.50' }}
                  alignSelf="center"
                  aria-label="Search"
                  variant="ghost"
                  fontSize="xl"
                  icon={<FaMagnifyingGlass />}
                />
                <IconButton
                  as={NavLink}
                  to={route.messages()}
                  color="purple.600"
                  _hover={{ bg: 'purple.50' }}
                  _active={{ bg: 'purple.50' }}
                  alignSelf="center"
                  aria-label="Open chats"
                  variant="ghost"
                  fontSize="xl"
                  icon={<FaRegComment />}
                />
                <Menu>
                  <MenuButton ml="2">
                    <Flex align="center" gap="2">
                      <Avatar size="sm" name={user?.first_name} src="" bg="purple.300" />
                      <Text display={{ base: 'none', md: 'flex' }} as="b">
                        {user?.first_name}
                      </Text>
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
      </ContentContainer>
    </Box>
  );
}

