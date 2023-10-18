import { forwardRef } from 'react';
import {
  Box,
  Button,
  RadioProps as ChakraRadioProps,
  Stack,
  useRadio,
  useRadioGroup,
} from '@chakra-ui/react';
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
          colorScheme={state.isChecked ? 'red' : 'gray'}
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
