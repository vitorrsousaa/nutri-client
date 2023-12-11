import { Text } from '@chakra-ui/layout';
import { Link as ReactRouterLink } from 'react-router-dom';

import { useSideItemHook } from './SideItem.hook';
import * as styled from './SideItem.styles';

export interface SideItemProps {
  children: string;
  href?: string;
  disabled?: boolean;
}

export function SideItem(props: SideItemProps) {
  const { children, href, disabled } = props;

  const { isActive } = useSideItemHook(props);

  return (
    <styled.SideItemContainer
      className={`${isActive && 'active'} ${disabled && 'disabled'} `}
    >
      <Text
        as={ReactRouterLink}
        textDecoration={'none'}
        fontSize={'16px'}
        fontWeight={600}
        color={isActive ? '#59BD5A' : '#555'}
        to={disabled ? '' : href}
        cursor={disabled ? 'not-allowed' : 'pointer'}
      >
        {children}
      </Text>
    </styled.SideItemContainer>
  );
}
