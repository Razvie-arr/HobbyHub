import { DatePickerField } from '../../forms';

const inputProps = {
  bg: 'white',
  borderRadius: 'full',
  size: { base: 'sm', md: 'md' },
};

export const DateRangeField = () => (
  <DatePickerField
    name="dates"
    formControlProps={{ flexBasis: { base: 'none', lg: '18%' } }}
    datePickerProps={{
      selectsRange: true,
      isClearable: true,
      placeholderText: 'Select dates',
      monthsShown: 2,
      todayButton: 'Today',
      dateFormat: 'mmm d',
    }}
    inputProps={inputProps}
  />
);

