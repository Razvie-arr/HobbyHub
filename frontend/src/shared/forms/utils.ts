import { EventType } from '../../gql/graphql';

export const eventTypeToSelectOption = ({ id, name }: Omit<EventType, 'category'>) => ({ value: id, label: name });

