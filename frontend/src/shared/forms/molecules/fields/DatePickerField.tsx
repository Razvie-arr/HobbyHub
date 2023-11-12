import { ReactDatePickerProps } from 'react-datepicker';

import { FormField, type FormFieldBaseProps } from '../FormField';
import { DatePicker, DatePickerProps } from '../inputs';

export type DatePickerFieldProps<
  CustomModifierNames extends string = never,
  WithRange extends boolean | undefined = undefined,
> = FormFieldBaseProps<
  Omit<DatePickerProps<CustomModifierNames, WithRange>, 'datePickerProps'> & {
    datePickerProps: Omit<ReactDatePickerProps<CustomModifierNames, WithRange>, 'onChange'>;
  }
>;

export const DatePickerField = <
  CustomModifierNames extends string = never,
  WithRange extends boolean | undefined = undefined,
>({
  id,
  name,
  label,
  formControlProps,
  ...rest
}: DatePickerFieldProps<CustomModifierNames, WithRange>) => (
  <FormField {...formControlProps} id={id} name={name} label={label} isRequired={rest.isRequired}>
    {(field) => (
      <DatePicker
        datePickerProps={{
          ...rest.datePickerProps,
          ...field,
          ...(rest.datePickerProps.selectsRange
            ? { startDate: field.value ? field.value[0] : null, endDate: field.value ? field.value[1] : null }
            : { selected: field.value }),
        }}
        inputProps={rest.inputProps}
      />
    )}
  </FormField>
);
