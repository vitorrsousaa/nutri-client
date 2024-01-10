import {
  ModalCloseButton as ChakraModalCloseButton,
  ModalCloseButtonProps as ChakraModalCloseButtonProps,
} from '@chakra-ui/modal';

export interface ModalCloseButtonProps
  extends Omit<ChakraModalCloseButtonProps, 'disabled' | 'onClick'> {
  isDisabled?: boolean;
}

export function ModalCloseButton(props: ModalCloseButtonProps) {
  const { isDisabled, ...modalCloseButtonProps } = props;
  return (
    <ChakraModalCloseButton
      position="initial"
      {...modalCloseButtonProps}
      disabled={isDisabled}
    />
  );
}
