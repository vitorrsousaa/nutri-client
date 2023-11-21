import * as PatientService from '../../hooks/patients';
import * as Authentication from '../../hooks/useAuth';
import { render } from '../../utils/test-utils';

import { Patients } from './Patients';

describe('Patients Page', () => {
  let spy = {
    useAuth: {} as jest.SpyInstance<
      Partial<ReturnType<(typeof Authentication)['useAuth']>>
    >,
    useGetAllPatients: {} as jest.SpyInstance<
      Partial<ReturnType<typeof PatientService.useGetAllPatients>>
    >,
  };

  beforeEach(() => {
    spy = {
      useAuth: jest.spyOn(Authentication, 'useAuth'),
      useGetAllPatients: jest.spyOn(PatientService, 'useGetAllPatients'),
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

    it('Should render correctly name of user', () => {
      // Arrange
      spy.useAuth.mockReturnValue({ name: 'John Doe' });
      spy.useGetAllPatients.mockReturnValue({
        isFetchingPatients: false,
        patients: [],
      });

      // Act
      rendered = render(<Patients />);

      // Assert
      expect(rendered.getByText('John Doe'));
    });

    it('Should render input when has patients', () => {
      // Arrange
      spy.useGetAllPatients.mockReturnValue({
        patients: [
          {
            birthDate: new Date(),
            email: 'string',
            id: 'string',
            gender: 'MASC',
            name: 'string',
            height: 1,
            weight: 1,
          },
        ],
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
        patients: [
          {
            birthDate: new Date(),
            email: 'string',
            gender: 'MASC',
            height: 1,
            id: 'string',
            name: 'string',
            weight: 1,
          },
        ],
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