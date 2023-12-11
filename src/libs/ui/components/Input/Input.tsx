import { forwardRef } from 'react';

import {
  Input as ChakraInput,
  InputProps as ChakraInputProps,
} from '@chakra-ui/react';

export interface InputProps extends ChakraInputProps {}

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return (
    <>
      <ChakraInput
        {...props}
        ref={ref}
        _placeholder={{
          color: '#999',
          fontSize: '14px',
          fontWeight: 400,
        }}
        _focus={{
          borderColor: '#59bd5a',
        }}
      />
    </>
  );
});

Input.displayName = 'Input';

export default Input;
