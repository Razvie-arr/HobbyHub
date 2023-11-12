import { InputField } from 'src/shared/forms';

export const EmailField = () => (
  <InputField
    name="email"
    label="Email"
    type="email"
    isRequired
    autoComplete="on"
    autoCorrect="off"
    autoCapitalize="off"
  />
);
