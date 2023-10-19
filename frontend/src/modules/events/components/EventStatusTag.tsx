import { Tag } from '@chakra-ui/react';

interface EventStatusTagProps {
  hasWaitlist: boolean;
  isFullCapacity: boolean;
}

export const EventStatusTag = ({ hasWaitlist, isFullCapacity }: EventStatusTagProps) => {
  const commonProps = {
    position: 'absolute',
    top: '4',
    left: '4',
    size: 'lg',
    borderRadius: 'full',
    lineHeight: '2.4',
    shadow: 'base',
  } as const;
  if (isFullCapacity && hasWaitlist) {
    return (
      <Tag {...commonProps} colorScheme="purple">
        QUEUE
      </Tag>
    );
  }
  if (isFullCapacity) {
    return <Tag {...commonProps}>CLOSED</Tag>;
  }
  return (
    <Tag {...commonProps} colorScheme="purple" variant="outline" backgroundColor="white">
      OPEN
    </Tag>
  );
};

