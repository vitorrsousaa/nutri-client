import {
  Button as ChakraButton,
  ButtonProps as ChakraButtonProps,
} from '@chakra-ui/button';

interface ButtonProps
  extends Omit<
    ChakraButtonProps,
    'disabled' | '_disabled' | 'variant' | '_loading'
  > {
  variant?: 'solid' | 'danger' | 'ghost' | 'secondary';
}

type DefaultProps = Pick<ButtonProps, 'variant'>;

const defaultProps: DefaultProps = {
  variant: 'solid',
};

type Props = ButtonProps & DefaultProps;

export function Button(props: Props) {
  return <ChakraButton {...props} />;
}

Button.defaultProps = defaultProps;
