import { useMemo } from 'react';

import { useLocation } from 'react-router';

import { SideItemProps } from './SideItem';

export function useSideItemHook(props: SideItemProps) {
  const { href } = props;

  const { pathname } = useLocation();

  const isActive = useMemo(
    () => (href ? pathname.includes(href) : false),
    [pathname, href]
  );

  return {
    isActive,
  };
}
