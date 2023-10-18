import { forwardRef } from 'react';
import {
  Input as ChakraInput,
  InputProps as ChakraInputProps,
} from '@chakra-ui/react';

export interface InputProps extends ChakraInputProps {}

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return (
    <>
      <ChakraInput {...props} ref={ref} />
    </>
  );
});

Input.displayName = 'Input';

export default Input;
