import { Tag, TagProps, Text } from '@chakra-ui/react';

interface EventStatusTagProps extends TagProps {
  hasWaitlist: boolean;
  hasExpired: boolean;
  isCancelled: boolean;
  isFullCapacity: boolean;
}

export const EventStatusTag = ({
  hasExpired,
  hasWaitlist,
  isCancelled,
  isFullCapacity,
  ...tagProps
}: EventStatusTagProps) => {
  const commonProps = {
    size: 'md',
    borderRadius: 'full',
    lineHeight: '2.4',
    ...tagProps,
  } as const;
  if (isCancelled) {
    return (
      <Tag {...commonProps} colorScheme="purple">
        <Text as="b">CANCELLED</Text>
      </Tag>
    );
  }
  if (!hasExpired && isFullCapacity && hasWaitlist) {
    return (
      <Tag {...commonProps} colorScheme="purple">
        <Text as="b">QUEUE</Text>
      </Tag>
    );
  }
  if (hasExpired || isFullCapacity) {
    return (
      <Tag {...commonProps} bg="purple.500" color="white">
        <Text as="b">CLOSED</Text>
      </Tag>
    );
  }
  return (
    <Tag {...commonProps} colorScheme="purple" variant="outline" backgroundColor="white">
      <Text as="b">OPEN</Text>
    </Tag>
  );
};

