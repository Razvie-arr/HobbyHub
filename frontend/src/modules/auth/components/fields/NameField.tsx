import { InputField } from 'src/shared/forms';

export const NameField = () => (
  <InputField
    name="name"
    label="Name"
    type="text"
    isRequired
    autoFocus
    autoComplete="on"
    autoCorrect="off"
    autoCapitalize="off"
  />
);

