import { forwardRef } from 'react';
import { Input, InputProps } from '@chakra-ui/react';
import ReactDatePicker, { ReactDatePickerProps } from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

const DateInput = forwardRef((props: InputProps, ref: unknown) => <Input ref={ref} {...props} />);

export interface DatePickerProps<
  CustomModifierNames extends string = never,
  WithRange extends boolean | undefined = undefined,
> {
  datePickerProps: ReactDatePickerProps<CustomModifierNames, WithRange>;
  inputProps: InputProps;
}

export const DatePicker = <
  CustomModifierNames extends string = never,
  WithRange extends boolean | undefined = undefined,
>({
  datePickerProps,
  inputProps,
}: DatePickerProps<CustomModifierNames, WithRange>) => (
  <ReactDatePicker {...datePickerProps} customInput={<DateInput {...inputProps} />} />
);

