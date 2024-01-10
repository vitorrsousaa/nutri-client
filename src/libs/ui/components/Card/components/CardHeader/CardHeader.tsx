import React from 'react';

import Text from '@godiet-ui/Text';

import {
  CardHeader as ChakraUICardHeader,
  CardHeaderProps as ChakraUICardHeaderProps,
} from '@chakra-ui/card';

interface CardHeader extends ChakraUICardHeaderProps {
  children: string;
  extra?: React.ReactNode;
}

export function CardHeader(props: CardHeader) {
  const { children, extra, ...cardHeaderProps } = props;

  return (
    <ChakraUICardHeader
      {...cardHeaderProps}
      justifyContent={'space-between'}
      flexDirection={'row'}
      display={'flex'}
    >
      <Text fontWeight={600} fontSize={'18px'}>
        {children}
      </Text>
      {extra && extra}
    </ChakraUICardHeader>
  );
}
