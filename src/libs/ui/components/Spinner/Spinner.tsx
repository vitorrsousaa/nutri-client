import {
  Spinner as ChakraSpinner,
  SpinnerProps as ChakraSpinnerProps,
} from '@chakra-ui/spinner';

interface SpinnerProps {
  size: ChakraSpinnerProps['size'];
}

type DefaultProps = Pick<SpinnerProps, 'size'>;

const defaultProps: DefaultProps = {
  size: 'xl',
};

type Props = SpinnerProps & DefaultProps;

export function Spinner(props: Props) {
  return (
    <ChakraSpinner
      thickness="4px"
      speed="0.65s"
      emptyColor="gray.200"
      color="#59bd5a"
      {...props}
    />
  );
}

Spinner.defaultProps = defaultProps;
