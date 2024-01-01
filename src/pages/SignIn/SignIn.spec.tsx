import * as Authentication from '@godiet-hooks/useAuth';
import { render } from '@godiet-utils/test-render';
import { clearAllMocks, SpyInstance, spyOn } from '@godiet-utils/test-utils';

import { SignIn } from './SignIn';

/**
 * @vitest-environment jsdom
 */

describe('Sign In', () => {
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

  describe('Page', () => {
    let rendered: ReturnType<typeof render>;

    beforeEach(() => {
      clearAllMocks();

      spy.useAuth.mockReturnValue({
        signedIn: false,
      });
    });

    afterEach(() => {
      rendered?.unmount();
    });

    it('Should render correctly', () => {
      // Arrange

      // Act
      rendered = render(<SignIn />);

      // Assert
      expect(
        rendered.getByText('Para acessar o goDiet, realize o login abaixo:')
      );
    });
  });
});
