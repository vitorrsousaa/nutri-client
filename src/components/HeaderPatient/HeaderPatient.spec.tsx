import patient from '@godiet-utils/mocks/patientDomain';
import {
  render,
  renderHook,
  RenderHookResult,
} from '@godiet-utils/test-render';
import { clearAllMocks } from '@godiet-utils/test-utils';

import HeaderPatient, { HeaderPatientProps } from './HeaderPatient';
import { useHeaderPatientHook } from './HeaderPatient.hook';

/**
 * @vitest-environment jsdom
 */

describe('Header - Patient page sub component', () => {
  describe('Component', () => {
    let rendered: ReturnType<typeof render>;

    beforeEach(() => {
      clearAllMocks();
    });

    afterEach(() => {
      rendered.unmount();
    });

    it('Should render avatar correctly', () => {
      // Arrange

      // Act
      rendered = render(<HeaderPatient patient={patient} />);

      // Assert
      expect(rendered.getByText(/JD/));
    });

    it('Should render correctly username', () => {
      // Arrange

      // Act
      rendered = render(<HeaderPatient patient={patient} />);

      // Assert
      expect(rendered.getByText(/John Doe/));
    });
  });

  describe('Hook', () => {
    let rendered: RenderHookResult<
      ReturnType<typeof useHeaderPatientHook>,
      unknown
    >;

    beforeEach(() => {
      clearAllMocks();
    });

    afterEach(() => {
      rendered.unmount();
    });

    it('Should formatted correctly date', () => {
      // Arrange
      const props: HeaderPatientProps = {
        patient,
      };

      // Act
      rendered = renderHook(() => useHeaderPatientHook(props));

      // Assert
      expect(rendered.result.current.formatedBirthDate).toBe(
        '1 de janeiro de 1990 (34 anos)'
      );
    });
  });
});
