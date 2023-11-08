import { act } from 'react-dom/test-utils';

import { render, renderHook, RenderHookResult } from '../../utils/test-utils';

import { Dashboard } from './Dashboard';
import { useDashboardHook } from './Dashboard.hook';

jest.mock('../../hooks/useAuth', () => {
  const originalModule = jest.requireActual('../../hooks/useAuth');

  return {
    ...originalModule,
    useAuth: jest.fn().mockReturnValue({
      signedIn: false,
      signIn: jest.fn(),
      signOut: jest.fn(),
    }),
  };
});

describe('Dashboard Page', () => {
  describe('Page', () => {
    let rendered: ReturnType<typeof render>;

    beforeEach(() => {
      jest.clearAllMocks();
    });

    afterEach(() => {
      rendered.unmount();
    });

    it('Should render correctly', () => {
      // Arrange

      // Act
      rendered = render(<Dashboard />);

      // Assert
      expect(rendered.getByText('Dashboard'));
    });
  });

  describe('Hook', () => {
    let rendered: RenderHookResult<
      ReturnType<typeof useDashboardHook>,
      unknown
    >;

    beforeEach(() => {
      jest.clearAllMocks();
    });

    afterEach(() => {
      rendered.unmount();
    });

    it('Should change modal state when call toggle', () => {
      // Arrange
      rendered = renderHook(() => useDashboardHook());

      // Act
      act(() => {
        rendered.result.current.toggleModalCreatePatient();
      });

      // Assert
      expect(rendered.result.current.modalCreatePatientIsOpen).toBeTruthy();
    });
  });
});
