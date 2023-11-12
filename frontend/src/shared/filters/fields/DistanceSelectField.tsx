import { SelectField } from '../../forms';

const inputProps = {
  bg: 'white',
  borderRadius: 'full',
};

export const DistanceSelectField = () => (
  <SelectField name="distance" formControlProps={{ flexBasis: '11%' }} {...inputProps}>
    <option value="5">Within 5 km</option>
    <option value="10">Within 10 km</option>
    <option value="20">Within 20 km</option>
    <option value="50">Within 50 km</option>
    <option value="100">Within 100 km</option>
    <option value="200">Within 200 km</option>
    <option value="500">Within 500 km</option>
  </SelectField>
);

