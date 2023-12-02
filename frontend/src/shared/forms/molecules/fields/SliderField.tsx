import { ReactNode } from 'react';
import { Slider, SliderFilledTrack, SliderProps, SliderThumb, SliderTrack } from '@chakra-ui/react';

import { FormField, type FormFieldBaseProps } from '../FormField';

export type SliderFieldProps = FormFieldBaseProps<SliderProps> & { sliderMarks: ReactNode };

export function SliderField({ id, name, label, sliderMarks, ...sliderProps }: SliderFieldProps) {
  return (
    <FormField id={id} name={name} label={label} isRequired={sliderProps.isRequired}>
      {(field) => (
        <Slider {...sliderProps} {...field} aria-label="slider">
          {sliderMarks}
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      )}
    </FormField>
  );
}

