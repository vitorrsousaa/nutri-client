import * as Authentication from '@godiet-hooks/useAuth';
import { act, fireEvent, render } from '@godiet-utils/test-utils';

import AppProvider from '.';

const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => {
  const actualNav = jest.requireActual('react-router-dom');
  return {
    ...actualNav,
    useNavigate: () => mockedNavigate,
  };
});

describe('App provider', () => {
  let spy = {
    useAuth: {} as jest.SpyInstance<
      Partial<ReturnType<(typeof Authentication)['useAuth']>>
    >,
  };

  beforeEach(() => {
    spy = {
      useAuth: jest.spyOn(Authentication, 'useAuth'),
    };

    spy.useAuth.mockReturnValue({
      name: 'User01',
    });
  });

  describe('Component', () => {
    let rendered: ReturnType<typeof render>;

    beforeEach(() => {
      jest.clearAllMocks();
    });

    afterEach(() => {
      rendered?.unmount();
    });

    it('Should render correctly name of user', () => {
      // Arrange

      // Act
      rendered = render(
        <AppProvider title="title">
          <div>children</div>
        </AppProvider>
      );

      // Assert
      expect(rendered.getByText('User01'));
    });

    it('Should render correctly title', () => {
      // Arrange

      // Act
      rendered = render(
        <AppProvider title="title">
          <div>children</div>
        </AppProvider>
      );

      // Assert
      expect(rendered.getByText('title'));
    });

    it('Should render correctly extra header', () => {
      // Arrange

      // Act
      rendered = render(
        <AppProvider title="title" extraHeader={<div>extra</div>}>
          <div>children</div>
        </AppProvider>
      );

      // Assert
      expect(rendered.getByText('extra'));
    });

    it('Should render correctly back button when the proerty hasBackButton exists', () => {
      // Arrange

      // Act
      rendered = render(
        <AppProvider title="title" hasBackButton>
          <div>children</div>
        </AppProvider>
      );

      // Assert
      expect(rendered.getByText(/^Voltar$/i));
    });

    it('Should render correctly back button when the proerty hasBackButton exists', () => {
      // Arrange
      rendered = render(
        <AppProvider title="title" hasBackButton>
          <div>children</div>
        </AppProvider>
      );

      // Act
      act(() => {
        fireEvent.click(rendered.getByText(/^Voltar$/i));
      });

      // Assert
      expect(mockedNavigate).toHaveBeenCalledWith(-1);
    });

    it('Should render spinner when isLoading property is true', () => {
      // Arrange

      // Act
      rendered = render(
        <AppProvider title="title" hasBackButton isLoading>
          <div>children</div>
        </AppProvider>
      );

      // Assert
      expect(rendered.queryByText(/^children$/i)).toBeNull();
      expect(rendered.getByText(/^Loading...$/i));
    });

    it('Should render children when isLoading is false and hasError is false', () => {
      // Arrange

      // Act
      rendered = render(
        <AppProvider
          title="title"
          hasBackButton
          isLoading={false}
          hasError={false}
        >
          <div>children</div>
        </AppProvider>
      );

      // Assert
      expect(rendered.getByText(/^children$/i));
    });

    it('Should not render children when isLoading is false and hasERror is true', () => {
      // Arrange

      // Act
      rendered = render(
        <AppProvider
          title="title"
          hasBackButton
          isLoading={false}
          hasError={true}
        >
          <div>children</div>
        </AppProvider>
      );

      // Assert
      expect(rendered.queryByText(/^children$/i)).toBeNull();
    });

    it('Should render default error message when hasError is true and not exists error message', () => {
      // Arrange

      // Act
      rendered = render(
        <AppProvider
          title="title"
          hasBackButton
          isLoading={false}
          hasError={true}
        >
          <div>children</div>
        </AppProvider>
      );

      // Assert
      expect(rendered.getByText(/^Tivemos um erro!$/i));
    });

    it('Should render custom error message when hasError is true and  exists error message', () => {
      // Arrange

      // Act
      rendered = render(
        <AppProvider
          title="title"
          hasBackButton
          isLoading={false}
          hasError={true}
          errorMessage={<div>error</div>}
        >
          <div>children</div>
        </AppProvider>
      );

      // Assert
      expect(rendered.getByText(/^error$/i));
    });
  });
});
