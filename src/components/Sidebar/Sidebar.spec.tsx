import * as Authentication from '@godiet-hooks/useAuth';
import { act, fireEvent, render } from '@godiet-utils/test-render';
import {
  clearAllMocks,
  fn,
  SpyInstance,
  spyOn,
} from '@godiet-utils/test-utils';

import { Sidebar } from './Sidebar';

/**
 * @vitest-environment jsdom
 */

describe('Sidebar', () => {
  let spy = {
    useAuth: {} as SpyInstance<
      Partial<ReturnType<(typeof Authentication)['useAuth']>>
    >,
  };

  beforeEach(() => {
    spy = {
      useAuth: spyOn(Authentication, 'useAuth'),
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
      rendered?.unmount();
    });

    it('Should call signOut when clicks on Log out', () => {
      // Arrange
      const signOut = fn();
      spy.useAuth.mockReturnValue({ signOut });
      rendered = render(<Sidebar />);

      // Act
      act(() => {
        fireEvent.click(rendered.getByText('Log out'));
      });

      // Assert
      expect(signOut).toHaveBeenCalled();
    });
  });
});
