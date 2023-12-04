import { Button, ButtonProps } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { match } from 'ts-pattern';

import { route } from '../../../../route';

interface EditEventButtonProps extends ButtonProps {
  eventId: number;
  as?: 'button' | 'link';
}

export const EditEventButton = ({ eventId, as = 'button', ...buttonProps }: EditEventButtonProps) => {
  const navigate = useNavigate();
  return match(as)
    .with('button', () => (
      <Button
        {...buttonProps}
        onClick={() => {
          navigate(route.editEvent(eventId));
        }}
      >
        Edit
      </Button>
    ))
    .with('link', () => (
      <Button as={Link} to={route.editEvent(eventId)} {...buttonProps}>
        Edit
      </Button>
    ))
    .exhaustive();
};

