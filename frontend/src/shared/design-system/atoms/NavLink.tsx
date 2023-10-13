import { Link as ChakraLink, type LinkProps as ChakraLinkProps } from '@chakra-ui/react';

export type NavLinkProps = ChakraLinkProps;

export function NavLink(props: NavLinkProps) {
  return (
    <ChakraLink
      p="3"
      _hover={{
        bg: 'blackAlpha.400',
      }}
      _activeLink={{
        bg: 'blackAlpha.300',
        _hover: {
          bg: 'blackAlpha.400',
        },
      }}
      {...props}
    />
  );
}
