import { Icon, Stack, Text, TypographyProps } from '@chakra-ui/react';
import { FaCalendar } from 'react-icons/fa6';

const localeTimeStringOptions = {
  hourCycle: 'h24',
  hour: '2-digit',
  minute: '2-digit',
} as const;

interface EventDateTimeProps {
  noIcon?: boolean;
  fontSize?: TypographyProps['fontSize'];
  startDateTime: string;
  endDateTime: string;
}

export const EventDateTime = ({ noIcon, fontSize = 'sm', startDateTime, endDateTime }: EventDateTimeProps) => {
  const { locale } = Intl.DateTimeFormat().resolvedOptions();
  const eventStartDate = new Date(startDateTime);
  const eventEndDate = new Date(endDateTime);
  return (
    <Stack direction="row">
      {noIcon ? null : <Icon as={FaCalendar} color="purple.500" />}
      <Text fontSize={fontSize} fontWeight="medium">
        {eventStartDate.toLocaleString(locale, { day: '2-digit', month: 'long', weekday: 'short' }).toLocaleUpperCase()}{' '}
        {' • '}
        {eventStartDate.toLocaleTimeString(locale, localeTimeStringOptions)}
        {' - '}
        {eventEndDate.toLocaleTimeString(locale, localeTimeStringOptions)}
      </Text>
    </Stack>
  );
};
