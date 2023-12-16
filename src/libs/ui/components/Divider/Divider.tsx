import {
  Divider as ChakraDivider,
  DividerProps as ChakraDividerProps,
} from '@chakra-ui/layout';

interface DividerProps extends ChakraDividerProps {}

export function Divider(props: DividerProps) {
  return <ChakraDivider height={'2px'} {...props} backgroundColor={'#999'} />;
}
