import { ParticipantState } from '../../gql/graphql';

export interface WithParticipant {
  participant: {
    user: {
      id: number;
      first_name: string;
      last_name: string;
      email: string;
    };
    state: ParticipantState;
    text?: string | null;
  };
}

