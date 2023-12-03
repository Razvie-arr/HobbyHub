import { Button, ButtonProps } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import { route } from '../../../../route';

interface EditEventButtonProps extends ButtonProps {
  eventId: number;
}

export const EditEventButton = ({ eventId, ...buttonProps }: EditEventButtonProps) => (
  <Button as={Link} to={route.editEvent(eventId)} {...buttonProps}>
    Edit
  </Button>
);

