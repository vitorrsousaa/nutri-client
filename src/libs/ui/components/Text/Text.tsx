import {
  Text as ChakraText,
  TextProps as ChakraTextProps,
} from '@chakra-ui/layout';

interface TextProps extends ChakraTextProps {}

export function Text(props: TextProps) {
  return <ChakraText {...props} />;
}
