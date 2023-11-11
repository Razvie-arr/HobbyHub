import { Tag, TagProps, Text } from '@chakra-ui/react';

interface EventStatusTagProps extends TagProps {
  hasWaitlist: boolean;
  isFullCapacity: boolean;
}

export const EventStatusTag = ({ hasWaitlist, isFullCapacity, ...tagProps }: EventStatusTagProps) => {
  const commonProps = {
    position: 'absolute',
    top: '4',
    left: '4',
    size: 'md',
    borderRadius: 'full',
    lineHeight: '2.4',
    shadow: 'base',
    ...tagProps,
  } as const;
  if (isFullCapacity && hasWaitlist) {
    return (
      <Tag {...commonProps} colorScheme="purple">
        <Text as="b">QUEUE</Text>
      </Tag>
    );
  }
  if (isFullCapacity) {
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

