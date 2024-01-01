import { ReactNode } from 'react';

import {
  AccordionButton as ChakraAccordionButton,
  AccordionButtonProps as ChakraAccordionButtonProps,
  AccordionIcon as ChakraAccordionIcon,
  AccordionIconProps as ChakraAccordionIconProps,
} from '@chakra-ui/accordion';

interface HeaderProps {
  children: ReactNode;
  buttonProps?: ChakraAccordionButtonProps;
  iconProps?: ChakraAccordionIconProps;
}

export function Header(props: HeaderProps) {
  const { children, buttonProps, iconProps } = props;

  return (
    <h2>
      <ChakraAccordionButton {...buttonProps}>
        {children}
        <ChakraAccordionIcon {...iconProps} />
      </ChakraAccordionButton>
    </h2>
  );
}
