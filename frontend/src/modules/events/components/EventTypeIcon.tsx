import { Icon } from '@chakra-ui/react';
import { FaDice, FaGamepad, FaPersonRunning } from 'react-icons/fa6';
import { MdSportsBaseball, MdSportsGolf, MdSportsSoccer, MdSportsTennis, MdSportsVolleyball } from 'react-icons/md';

import { EventTypeName } from '../types';

interface EventTypeIconProps {
  eventTypeName: EventTypeName;
}

export const EventTypeIcon = ({ eventTypeName }: EventTypeIconProps) => {
  switch (eventTypeName) {
    case 'Football':
      return <Icon as={MdSportsSoccer} />;
    case 'Games':
      return <Icon as={MdSportsVolleyball} />;
    case 'Basketball':
      return <Icon as={MdSportsBaseball} />;
    case 'Volleyball':
      return <Icon as={MdSportsVolleyball} />;
    case 'Tennis':
      return <Icon as={MdSportsTennis} />;
    case 'Running':
      return <Icon as={FaPersonRunning} />;
    case 'Golf':
      return <Icon as={MdSportsGolf} />;
    case 'Playstation':
      return <Icon as={FaGamepad} />;
    case 'Board games':
      return <Icon as={FaDice} />;
  }
};

