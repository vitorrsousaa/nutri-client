import * as PatientService from '@godiet-hooks/patients';
import * as Authentication from '@godiet-hooks/useAuth';
import patient from '@godiet-utils/mocks/patientDomain';
import { render } from '@godiet-utils/test-render';
import { clearAllMocks, SpyInstance, spyOn } from '@godiet-utils/test-utils';

import { Patients } from './Patients';

/**
 * @vitest-environment jsdom
 */
describe('Patients Page', () => {
  let spy = {
    useGetAllPatients: {} as SpyInstance<
      Partial<ReturnType<typeof PatientService.useGetAllPatients>>
    >,
    useAuth: {} as SpyInstance<
      Partial<ReturnType<(typeof Authentication)['useAuth']>>
    >,
  };

  beforeEach(() => {
    spy = {
      useGetAllPatients: spyOn(PatientService, 'useGetAllPatients'),
      useAuth: spyOn(Authentication, 'useAuth'),
    };

    spy.useAuth.mockReturnValue({
      name: 'any_name',
    });
  });

  afterEach(() => {
    clearAllMocks();
  });

  describe('Page', () => {
    let rendered: ReturnType<typeof render>;

    beforeEach(() => {
      clearAllMocks();
    });

    afterEach(() => {
      rendered.unmount();
    });

    it('Should render input when has patients', () => {
      // Arrange
      spy.useGetAllPatients.mockReturnValue({
        patients: [patient],
      });

      // Act
      rendered = render(<Patients />);

      // Assert
      expect(rendered.getByPlaceholderText('Procurar pacientes'));
    });

    it('Should render spinner when is fetching patients', () => {
      // Arrange
      spy.useGetAllPatients.mockReturnValue({
        isFetchingPatients: true,
        patients: [],
      });

      // Act
      rendered = render(<Patients />);

      // Assert
      expect(rendered.getByText('Loading...'));
    });

    it('Should render search input when is fetching patients is false and there patients', () => {
      // Arrange
      spy.useGetAllPatients.mockReturnValue({
        isFetchingPatients: false,
        patients: [patient],
      });

      // Act
      rendered = render(<Patients />);

      // Assert
      expect(rendered.getByPlaceholderText('Procurar pacientes'));
    });

    it('Should render correctly text when has no patients', () => {
      // Arrange
      spy.useGetAllPatients.mockReturnValue({
        isFetchingPatients: false,
        patients: [],
      });

      // Act
      rendered = render(<Patients />);

      // Assert
      expect(
        rendered.getByText('Você ainda não possui nenhum paciente cadastrado!')
      );
    });
  });
});
