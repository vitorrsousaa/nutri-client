import { forwardRef } from 'react';

import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputProps as ChakraInputNumberProps,
  NumberInputStepper,
} from '@chakra-ui/react';

export interface InputNumberProps extends ChakraInputNumberProps {}

const InputNumber = forwardRef<HTMLInputElement, InputNumberProps>(
  (props, ref) => {
    const { placeholder, ...inputNumberProps } = props;
    return (
      <>
        <NumberInput {...inputNumberProps} ref={ref}>
          <NumberInputField placeholder={placeholder} />

          <NumberInputStepper>
            <NumberIncrementStepper />

            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </>
    );
  }
);

InputNumber.displayName = 'Input Number';

export default InputNumber;
