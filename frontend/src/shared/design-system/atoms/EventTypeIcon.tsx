import { Icon } from '@chakra-ui/react';
import { FaDice, FaDog, FaGamepad, FaPersonRunning, FaPersonWalking, FaUmbrellaBeach } from 'react-icons/fa6';
import { GiCliffCrossing, GiMeshBall, GiPokerHand, GiShuttlecock, GiTennisRacket } from 'react-icons/gi';
import { GrYoga } from 'react-icons/gr';
import {
  MdEmojiPeople,
  MdNordicWalking,
  MdOutlineDirectionsBike,
  MdOutlineSportsHockey,
  MdSportsBaseball,
  MdSportsGolf,
  MdSportsSoccer,
  MdSportsTennis,
  MdSportsVolleyball,
  MdStroller,
} from 'react-icons/md';

import { EventTypeName } from '../../types';

interface EventTypeIconProps {
  eventTypeName: EventTypeName;
}

export const EventTypeIcon = ({ eventTypeName }: EventTypeIconProps) => {
  switch (eventTypeName) {
    case 'Football':
      return <Icon as={MdSportsSoccer} />;
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
    case 'Beach volleyball':
      return <Icon as={FaUmbrellaBeach} />;
    case 'Badminton':
      return <Icon as={GiShuttlecock} />;
    case 'Biking':
      return <Icon as={MdOutlineDirectionsBike} />;
    case 'Floorball':
      return <Icon as={GiMeshBall} />;
    case 'Squash':
      return <Icon as={GiTennisRacket} />;
    case 'Yoga':
      return <Icon as={GrYoga} />;
    case 'Hockey':
      return <Icon as={MdOutlineSportsHockey} />;
    case 'Poker':
      return <Icon as={GiPokerHand} />;
    case 'eGaming':
      return <Icon as={FaGamepad} />;
    case 'Board games':
      return <Icon as={FaDice} />;
    case 'Walking':
      return <Icon as={FaPersonWalking} />;
    case 'Meet new people':
      return <Icon as={MdEmojiPeople} />;
    case 'Hiking':
      return <Icon as={MdNordicWalking} />;
    case 'Ferata':
      return <Icon as={GiCliffCrossing} />;
    case 'Walking the dog':
      return <Icon as={FaDog} />;
    case 'Strollering':
      return <Icon as={MdStroller} />;
  }
};

