import { HStack, Text } from '@chakra-ui/layout';
import { Link as ReactRouterLink } from 'react-router-dom';

import { useSideItemHook } from './SideItem.hook';

export interface SideItemProps {
  children: string;
  href?: string;
}

export function SideItem(props: SideItemProps) {
  const { children, href } = props;

  const { isActive } = useSideItemHook(props);

  return (
    <HStack
      padding={'0 24px'}
      borderRight={isActive ? '3px solid #59bd5a' : undefined}
      width={'100%'}
    >
      <Text
        as={ReactRouterLink}
        textDecoration={'none'}
        fontSize={'16px'}
        fontWeight={600}
        color={isActive ? '#59BD5A' : '#555'}
        to={href}
      >
        {children}
      </Text>
    </HStack>
  );
}
