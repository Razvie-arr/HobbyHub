import { Link as ChakraLink, type LinkProps as ChakraLinkProps } from '@chakra-ui/react';

export type NavLinkProps = ChakraLinkProps;

export function NavLink(props: NavLinkProps) {
  return (
    <ChakraLink
      py="1"
      px="4"
      _hover={{
        bg: 'purple.50',
        color: 'purple.600',
      }}
      color="purple.300"
      _activeLink={{
        color: 'purple.600',
        borderBottom: 2,
        borderStyle: 'solid',
        borderColor: 'purple.500',
        _hover: {
          bg: 'purple.50',
        },
      }}
      {...props}
    />
  );
}
