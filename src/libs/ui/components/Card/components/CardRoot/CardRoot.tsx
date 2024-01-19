import {
  Card as ChakraUICard,
  CardProps as ChakraUICardProps,
} from '@chakra-ui/card';

interface CardRootProps extends ChakraUICardProps {}

export function CardRoot(props: CardRootProps) {
  const { children, ...cardRootProps } = props;

  return (
    <ChakraUICard backgroundColor={'#f8f8f8'} {...cardRootProps}>
      {children}
    </ChakraUICard>
  );
}
