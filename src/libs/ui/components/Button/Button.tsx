import {
  Button as ChakraButton,
  ButtonProps as ChakraButtonProps,
} from '@chakra-ui/react';

interface ButtonProps extends ChakraButtonProps {}

export function Button(props: ButtonProps) {
  return <ChakraButton {...props} />;
}
