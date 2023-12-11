import { useNavigate, useParams } from 'react-router-dom';

import * as PatientService from '../../hooks/patients';
import * as Authentication from '../../hooks/useAuth';
import {
  act,
  render,
  renderHook,
  RenderHookResult,
} from '../../utils/test-utils';

const ReactRouter = { useParams, useNavigate };

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
    useParams: {} as jest.SpyInstance<
      Partial<ReturnType<(typeof ReactRouter)['useParams']>>
    >,
    useNavigate: {} as jest.SpyInstance<
      ReturnType<(typeof ReactRouter)['useNavigate']>
    >,
  };

  beforeEach(() => {
    spy = {
      useFindByIdPatient: jest.spyOn(PatientService, 'useFindByIdPatient'),
      useNavigate: jest.spyOn(ReactRouter, 'useNavigate'),
      useParams: jest.spyOn(ReactRouter, 'useParams'),
      useAuth: jest.spyOn(Authentication, 'useAuth'),
    };

    spy.useAuth.mockReturnValue({
      name: 'any_name',
    });

    spy.useParams.mockReturnValue({ id: 'any_id' });
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

    it('Should render alert when patient is not found', () => {
      // Arrange
      spy.useFindByIdPatient.mockReturnValue({
        patient: null,
      });
      spy.useParams.mockReturnValue({ id: 'any_id' });

      // Act
      rendered = render(<Patient />);

      // Assert
      expect(rendered.getByText(/Por favor, tente novamente!/));
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

    it('Should call redirectToCreatePlanning with correct params', () => {
      // Arrange
      const navigate = jest.fn();
      spy.useNavigate.mockReturnValue(navigate);
      rendered = renderHook(() => usePatientHook());

      // Act
      act(() => {
        rendered.result.current.redirectToCreatePlanning();
      });

      // Assert
      expect(navigate).toHaveBeenCalledWith('/pacientes/any_id/plano/criar');
    });

    // it('Should redirect user when call deletePatient', () => {
    //   // Arrange
    //   const navigate = jest.fn();
    //   spy.useNavigate.mockReturnValue(navigate);

    //   rendered = renderHook(() => usePatientHook());

    //   // Act
    //   act(() => {
    //     rendered.result.current.handleDeletePatient();
    //   });

    //   // Assert
    //   expect(navigate).toHaveBeenCalledWith('/dashboard');
    // });
  });
});
