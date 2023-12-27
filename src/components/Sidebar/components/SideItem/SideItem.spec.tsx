import * as ReactRouter from 'react-router';

import {
  render,
  renderHook,
  RenderHookResult,
} from '../../../../utils/test-utils';

import { SideItem } from './SideItem';
import { useSideItemHook } from './SideItem.hook';

describe('Side Item', () => {
  let spy = {
    useLocation: {} as jest.SpyInstance,
  };

  beforeEach(() => {
    spy = {
      useLocation: jest.spyOn(ReactRouter, 'useLocation'),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Component', () => {
    let rendered: ReturnType<typeof render>;

    beforeEach(() => {
      jest.clearAllMocks();
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
      jest.clearAllMocks();
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
