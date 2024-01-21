import { InputField } from 'src/shared/forms';

export interface NameFieldProps {
  label: string;
  name: string;
  autoFocus?: boolean;
}

export const NameField = (props: NameFieldProps) => (
  <InputField {...props} type="text" isRequired autoComplete="on" autoCorrect="off" autoCapitalize="off" />
);

