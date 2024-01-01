import { TPatient } from '@godiet-entities/patient/TPatient';
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
      const patient: TPatient = {
        name: 'John Doe',
        birthDate: new Date('1999-01-01'),
        email: 'any_email@email.com',
        gender: 'MASC',
        height: 1.8,
        id: 'any_id',
        weight: 80,
        planningMeal: [],
      };

      // Act
      rendered = render(<HeaderPatient patient={patient} />);

      // Assert
      expect(rendered.getByText(/JD/));
    });

    it('Should render correctly username', () => {
      // Arrange
      const patient: TPatient = {
        name: 'John Doe',
        birthDate: new Date('1999-01-01'),
        email: 'any_email@email.com',
        gender: 'MASC',
        height: 1.8,
        id: 'any_id',
        weight: 80,
        planningMeal: [],
      };

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
      const patient: TPatient = {
        name: 'John Doe',
        birthDate: new Date('2021-09-01T06:06:00.000Z'),
        email: 'any_email@email.com',
        gender: 'MASC',
        height: 1.8,
        id: 'any_id',
        weight: 80,
        planningMeal: [],
      };

      const props: HeaderPatientProps = {
        patient,
      };

      // Act
      rendered = renderHook(() => useHeaderPatientHook(props));

      // Assert
      expect(rendered.result.current.formatedBirthDate).toBe(
        '1 de setembro de 2021 (2 anos)'
      );
    });
  });
});
