import { forwardRef } from 'react';

import Button from '@godiet-ui/Button';

import { Box, Stack } from '@chakra-ui/layout';
import {
  RadioProps as ChakraRadioProps,
  useRadio,
  useRadioGroup,
} from '@chakra-ui/radio';
import { useController } from 'react-hook-form';

interface RadioProps extends Omit<ChakraRadioProps, 'children'> {
  direction: 'row' | 'column';
  options: { label: string; value: string }[];
  name: string;
}

const CustomRadio = forwardRef<HTMLInputElement, ChakraRadioProps>(
  (props, ref) => {
    const { children, ...customRadioProps } = props;

    const { state, getInputProps, getRadioProps } = useRadio(customRadioProps);
    const input = getInputProps({ ref });
    const checkbox = getRadioProps();

    return (
      <Box as="label">
        <input {...input} />
        <Button
          as="div"
          {...checkbox}
          cursor="pointer"
          variant={state.isChecked ? 'solid' : 'secondary'}
        >
          {children}
        </Button>
      </Box>
    );
  }
);

CustomRadio.displayName = 'CustomRadio';

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ({ name, defaultValue, options, direction, ...props }, _ref) => {
    const { field } = useController({
      name,
      defaultValue,
    });

    const { getRootProps, getRadioProps } = useRadioGroup({
      ...field,
    });

    return (
      <Stack {...getRootProps()} direction={direction}>
        {options.map((option) => (
          <CustomRadio
            key={option.value}
            {...props}
            {...getRadioProps({ value: option.value })}
          >
            {option.label}
          </CustomRadio>
        ))}
      </Stack>
    );
  }
);

Radio.displayName = 'Radio';

export default Radio;
