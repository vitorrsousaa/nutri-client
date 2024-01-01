import {
  render,
  renderHook,
  RenderHookResult,
} from '@godiet-utils/test-render';
import { clearAllMocks, SpyInstance, spyOn } from '@godiet-utils/test-utils';

import * as ReactRouter from 'react-router';

import { SideItem } from './SideItem';
import { useSideItemHook } from './SideItem.hook';

/**
 * @vitest-environment jsdom
 */

describe('Side Item', () => {
  let spy = {
    useLocation: {} as SpyInstance<
      Partial<ReturnType<(typeof ReactRouter)['useLocation']>>
    >,
  };

  beforeEach(() => {
    spy = {
      useLocation: spyOn(ReactRouter, 'useLocation'),
    };
  });

  afterEach(() => {
    clearAllMocks();
  });

  describe('Component', () => {
    let rendered: ReturnType<typeof render>;

    beforeEach(() => {
      clearAllMocks();
    });

    afterEach(() => {
      rendered.unmount();
    });

    it('Should render correctly with children', () => {
      // Arrange

      // Act
      rendered = render(<SideItem href="/dashboard">Dashboard</SideItem>);

      // Assert
      expect(rendered.getByText('Dashboard'));
    });
  });

  describe('Hook', () => {
    let rendered: RenderHookResult<ReturnType<typeof useSideItemHook>, unknown>;

    beforeEach(() => {
      clearAllMocks();
    });

    afterEach(() => {
      rendered.unmount();
    });

    it('Should return isActive as true when href is equal to currentPath', () => {
      // Arrange
      const props = {
        children: 'Dashboard',
        href: '/dashboard',
      };
      spy.useLocation.mockReturnValue({ pathname: '/dashboard' });

      // Act
      rendered = renderHook(() => useSideItemHook(props));

      // Assert
      expect(rendered.result.current.isActive).toBe(true);
    });

    it('Should return isActive as false when href is equal to currentPath', () => {
      // Arrange
      const props = {
        children: 'Dashboard',
        href: '/dashboard',
      };
      spy.useLocation.mockReturnValue({ pathname: '/' });

      // Act
      rendered = renderHook(() => useSideItemHook(props));

      // Assert
      expect(rendered.result.current.isActive).toBe(false);
    });
  });
});
