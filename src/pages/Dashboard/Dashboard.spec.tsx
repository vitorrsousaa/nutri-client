import * as PatientService from '../../hooks/patients';
import * as Authentication from '../../hooks/useAuth';
import {
  act,
  render,
  renderHook,
  RenderHookResult,
} from '../../utils/test-utils';

import { Dashboard } from './Dashboard';
import { useDashboardHook } from './Dashboard.hook';

describe('Dashboard Page', () => {
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
      rendered?.unmount();
    });

    it('Should render correctly number of patients', () => {
      // Arrange
      spy.useAuth.mockReturnValue({
        name: 'any_name',
      });
      spy.useGetAllPatients.mockReturnValue({
        patients: [
          {
            birthDate: new Date(),
            email: 'any_email',
            gender: 'MASC',
            height: 1.8,
            id: 'any_id',
            name: 'any_name',
            weight: 80,
            planningMeal: [],
          },
        ],
      });

      // Act

      rendered = render(<Dashboard />);

      // Assert
      expect(rendered.getByText('1 pacientes cadastrados'));
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
