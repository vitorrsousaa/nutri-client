import * as ReactQuery from '@tanstack/react-query';

import { render, renderHook, RenderHookResult } from '../../utils/test-utils';

import { SignIn } from './SignIn';
import { useSignInHook } from './SignIn.hook';

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

describe('Sign In', () => {
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
      rendered = render(<SignIn />);

      // Assert
      expect(rendered.getByText('Acessar sua conta'));
    });
  });

  describe('Hook', () => {
    let rendered: RenderHookResult<ReturnType<typeof useSignInHook>, unknown>;

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
      rendered = renderHook(() => useSignInHook());

      // Assert
      expect(rendered.result.current.isLoading).toBeFalsy();
    });
  });
});
