import { InputField } from 'src/shared/forms';

interface PasswordFieldProps {
  confirmPassword?: boolean;
}

export const PasswordField = ({ confirmPassword }: PasswordFieldProps) => (
  <>
    <InputField
      name="password"
      label="Password"
      type="password"
      isRequired
      autoComplete="off"
      autoCorrect="off"
      autoCapitalize="off"
    />
    {confirmPassword ? (
      <InputField
        name="passwordConfirmation"
        label="Password Confirmation"
        type="password"
        isRequired
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
      />
    ) : null}
  </>
);
