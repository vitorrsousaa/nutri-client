import * as PatientService from '../../hooks/patients';
import * as Authentication from '../../hooks/useAuth';
import {
  act,
  render,
  renderHook,
  RenderHookResult,
} from '../../utils/test-utils';

import { Patient } from './Patient';
import { usePatientHook } from './Patient.hook';

describe('Patient Page', () => {
  let spy = {
    useFindByIdPatient: {} as jest.SpyInstance<
      Partial<ReturnType<typeof PatientService.useFindByIdPatient>>
    >,
    useAuth: {} as jest.SpyInstance<
      Partial<ReturnType<(typeof Authentication)['useAuth']>>
    >,
  };

  beforeEach(() => {
    spy = {
      useFindByIdPatient: jest.spyOn(PatientService, 'useFindByIdPatient'),
      useAuth: jest.spyOn(Authentication, 'useAuth'),
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

    it('Should render loading when isFetchingPatient is true', () => {
      // Arrange
      spy.useFindByIdPatient.mockReturnValue({
        isFetchingPatient: true,
      });

      // Act
      rendered = render(<Patient />);

      // Assert
      expect(rendered.getByText('Loading...'));
    });

    it('Should render correctly name of user', () => {
      // Arrange
      spy.useAuth.mockReturnValue({ name: 'John Doe' });

      // Act
      rendered = render(<Patient />);

      // Assert
      expect(rendered.getByText(/John Doe/));
    });
  });

  describe('Hook', () => {
    let rendered: RenderHookResult<ReturnType<typeof usePatientHook>, unknown>;

    beforeEach(() => {
      jest.clearAllMocks();
    });

    afterEach(() => {
      rendered.unmount();
    });

    it('Should change modal state when call toggle modal delete patient', () => {
      // Arrange
      rendered = renderHook(() => usePatientHook());

      // Act
      act(() => {
        rendered.result.current.toggleModalDeletePatient();
      });

      // Assert
      expect(rendered.result.current.modalDeleteIsOpen).toBeTruthy();
    });
  });
});
