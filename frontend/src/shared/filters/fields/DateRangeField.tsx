import { DatePickerField } from '../../forms';

const inputProps = {
  bg: 'white',
  borderRadius: 'full',
};

export const DateRangeField = () => (
  <DatePickerField
    name="dates"
    formControlProps={{ flexBasis: { base: 'none', lg: '17%' } }}
    datePickerProps={{
      selectsRange: true,
      isClearable: true,
      placeholderText: 'Select dates',
      monthsShown: 2,
      todayButton: 'Today',
    }}
    inputProps={inputProps}
  />
);
