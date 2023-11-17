import * as Authentication from '../../hooks/useAuth';
import { act, fireEvent, render } from '../../utils/test-utils';

import { Sidebar } from './Sidebar';

describe('Sidebar', () => {
  let spy = {
    useAuth: {} as jest.SpyInstance,
  };

  beforeEach(() => {
    spy = {
      useAuth: jest.spyOn(Authentication, 'useAuth'),
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
      rendered?.unmount();
    });

    it('Should call signOut when clicks on Log out', () => {
      // Arrange
      const signOut = jest.fn();
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
