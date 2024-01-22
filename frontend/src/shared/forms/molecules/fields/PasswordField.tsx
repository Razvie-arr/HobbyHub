import { ReactNode } from 'react';

import { InputField } from 'src/shared/forms';

export interface PasswordFieldProps {
  label?: ReactNode;
  confirmationLabel?: ReactNode;
  confirmPassword?: boolean;
}

export const PasswordField = ({ label, confirmationLabel, confirmPassword }: PasswordFieldProps) => (
  <>
    <InputField
      name="password"
      label={label ?? 'Password'}
      type="password"
      isRequired
      autoComplete="off"
      autoCorrect="off"
      autoCapitalize="off"
    />
    {confirmPassword ? (
      <InputField
        name="passwordConfirmation"
        label={confirmationLabel ?? 'Password Confirmation'}
        type="password"
        isRequired
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
      />
    ) : null}
  </>
);

