import * as ReactQuery from '@tanstack/react-query';

import { render, renderHook, RenderHookResult } from '../../utils/test-utils';

import { SignUp } from './SignUp';
import { useSignUpHook } from './SignUp.hook';

jest.mock('../../hooks/useAuth', () => {
  const originalModule = jest.requireActual('../../hooks/useAuth');

  return {
    ...originalModule,
    useAuth: jest.fn().mockReturnValue({
      signedIn: false,
      signIn: jest.fn(),
    }),
  };
});

describe('Sign Up', () => {
  let spy = {
    mutation: {} as jest.SpyInstance,
  };

  beforeEach(() => {
    spy = {
      mutation: jest.spyOn(ReactQuery, 'useMutation'),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

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
      spy.mutation.mockReturnValue({ isLoading: false });

      // Act
      rendered = render(<SignUp />);

      // Assert
      expect(rendered.getByText('sign up'));
    });
  });

  describe('Hook', () => {
    let rendered: RenderHookResult<ReturnType<typeof useSignUpHook>, unknown>;

    beforeEach(() => {
      jest.clearAllMocks();
    });

    afterEach(() => {
      rendered.unmount();
    });

    it('Should render correctly', () => {
      // Arrange
      spy.mutation.mockReturnValue({ isLoading: false });

      // Act
      rendered = renderHook(() => useSignUpHook());

      // Assert
      expect(rendered.result.current.isLoading).toBeFalsy();
    });
  });
});
