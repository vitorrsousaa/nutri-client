import {
  Spinner as ChakraSpinner,
  SpinnerProps as ChakraSpinnerProps,
} from '@chakra-ui/spinner';

interface SpinnerProps extends ChakraSpinnerProps {
  size: ChakraSpinnerProps['size'];
}

type DefaultProps = Pick<SpinnerProps, 'size' | 'thickness'>;

const defaultProps: DefaultProps = {
  size: 'xl',
  thickness: '4px',
};

type Props = SpinnerProps & DefaultProps;

export function Spinner(props: Props) {
  return (
    <ChakraSpinner
      speed="0.65s"
      emptyColor="gray.200"
      color="#59bd5a"
      thickness="4px"
      {...props}
    />
  );
}

Spinner.defaultProps = defaultProps;
