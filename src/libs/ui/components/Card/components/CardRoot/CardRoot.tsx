import {
  Card as ChakraUICard,
  CardProps as ChakraUICardProps,
} from '@chakra-ui/card';

interface CardRootProps extends ChakraUICardProps {}

export function CardRoot(props: CardRootProps) {
  const { children, ...cardRootProps } = props;

  return (
    <ChakraUICard {...cardRootProps} backgroundColor={'#f8f8f8'}>
      {children}
    </ChakraUICard>
  );
}
