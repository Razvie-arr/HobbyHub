import { Icon, Stack, Text } from '@chakra-ui/react';
import { FaCalendar } from 'react-icons/fa6';

const localeTimeStringOptions = {
  hourCycle: 'h24',
  hour: '2-digit',
  minute: '2-digit',
} as const;

interface EventDateTimeProps {
  startDateTime: string;
  endDateTime: string;
}

export const EventDateTime = ({ startDateTime, endDateTime }: EventDateTimeProps) => {
  const { locale } = Intl.DateTimeFormat().resolvedOptions();
  const eventStartDate = new Date(startDateTime);
  const eventEndDate = new Date(endDateTime);
  return (
    <Stack direction="row">
      <Icon as={FaCalendar} color="purple.500" />
      <Text fontSize="sm" fontWeight="medium">
        {eventStartDate.toLocaleString(locale, { day: '2-digit' })}{' '}
        {eventStartDate.toLocaleString(locale, { month: 'long' })}
        {' • '}
        {eventStartDate.toLocaleTimeString(locale, localeTimeStringOptions)}
        {' - '}
        {eventEndDate.toLocaleTimeString(locale, localeTimeStringOptions)}
      </Text>
    </Stack>
  );
};

