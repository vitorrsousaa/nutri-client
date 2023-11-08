import * as patient from '../../hooks/patients';
import {
  act,
  render,
  renderHook,
  RenderHookResult,
} from '../../utils/test-utils';

import { Patient } from './Patient';
import { usePatientHook } from './Patient.hook';

describe('Patient Page', () => {
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

      // Act
      rendered = render(<Patient />);

      // Assert
      expect(rendered.getByText('isLoading'));
    });

    it('Should render correctly', () => {
      // Arrange
      jest.spyOn(patient, 'useFindByIdPatient').mockReturnValue({
        isFetchingPatient: false,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        patient: {} as any,
        removePatient: jest.fn(),
      });

      // Act
      rendered = render(<Patient />);

      // Assert
      expect(rendered.getByText('patient'));
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
