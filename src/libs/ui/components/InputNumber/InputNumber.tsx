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
    return (
      <>
        <NumberInput {...props} ref={ref}>
          <NumberInputField />

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
