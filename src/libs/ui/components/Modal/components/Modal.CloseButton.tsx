import {
  ModalCloseButton as ChakraModalCloseButton,
  ModalCloseButtonProps,
} from '@chakra-ui/react';

export interface IModalCloseButton extends ModalCloseButtonProps {}

export function ModalCloseButton(props: IModalCloseButton) {
  return <ChakraModalCloseButton position="initial" {...props} />;
}
