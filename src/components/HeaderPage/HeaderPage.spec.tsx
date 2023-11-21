import { render } from '../../utils/test-utils';

import HeaderPage from './HeaderPage';

describe('HeaderPage Component', () => {
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

    it('Should render correctly username', () => {
      // Arrange
      const username = 'John Doe';

      // Act
      rendered = render(<HeaderPage username={username} title="title" />);

      // Assert
      expect(rendered.getByText(/John Doe/));
    });

    it('Should render correctly title', () => {
      // Arrange

      // Act
      rendered = render(<HeaderPage title="title" />);

      // Assert
      expect(rendered.getByText(/title/));
    });

    it('Should render children when is loading is false', () => {
      // Arrange

      // Act
      rendered = render(
        <HeaderPage isLoading={false} title="title">
          <div> children</div>
        </HeaderPage>
      );

      // Assert
      expect(rendered.getByText(/children/));
    });

    it('Should not render children when is loading is true', () => {
      // Arrange

      // Act
      rendered = render(
        <HeaderPage isLoading={true} title="title">
          <div> children</div>
        </HeaderPage>
      );

      // Assert
      expect(rendered.queryByText(/children/)).toBeNull();
    });
  });
});
