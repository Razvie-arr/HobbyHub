import { Slider, SliderFilledTrack, SliderProps, SliderThumb, SliderTrack } from '@chakra-ui/react';

import { FormField, type FormFieldBaseProps } from '../FormField';

export type SliderFieldProps = FormFieldBaseProps<SliderProps>;

export function SliderField({ id, name, label, ...sliderProps }: SliderFieldProps) {
  return (
    <FormField id={id} name={name} label={label} isRequired={sliderProps.isRequired}>
      {(field) => (
        <Slider {...sliderProps} {...field} aria-label="slider">
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      )}
    </FormField>
  );
}

