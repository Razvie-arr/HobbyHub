import { useQuery } from '@apollo/client';
import { Button, IconButton } from '@chakra-ui/react';
import { FaRegComment } from 'react-icons/fa6';
import { NavLink } from 'react-router-dom';

import { route } from '../../../route';
import { getThreadFragmentData, WithAuthUser } from '../../../shared/types';
import { THREADS } from '../queries';

const commonProps = {
  as: NavLink,
  to: route.messages(),
  color: 'purple.600',
  _hover: { bg: 'purple.50' },
  _active: { bg: 'purple.50' },
  alignSelf: 'center',
  'aria-label': 'Open chats',
  variant: 'ghost',
  fontSize: 'xl',
  size: { base: 'sm', md: 'md' },
};

export const MessageNavButton = ({ user }: WithAuthUser) => {
  const threadQueryResult = useQuery(THREADS, { variables: { userId: user.id } });
  const threads = threadQueryResult.data?.threads ? threadQueryResult.data.threads.map(getThreadFragmentData) : [];
  const unreadThreadsCount = threads.filter(({ thread_read }) => !thread_read).length;

  return unreadThreadsCount > 0 ? (
    <Button {...commonProps} leftIcon={<FaRegComment />}>
      {unreadThreadsCount}
    </Button>
  ) : (
    <IconButton {...commonProps} icon={<FaRegComment />} />
  );
};

