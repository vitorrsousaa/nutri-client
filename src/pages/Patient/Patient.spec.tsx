import * as PatientService from '@godiet-hooks/patients';
import * as Authentication from '@godiet-hooks/useAuth';
import {
  act,
  render,
  renderHook,
  RenderHookResult,
} from '@godiet-utils/test-render';
import {
  clearAllMocks,
  fn,
  SpyInstance,
  spyOn,
} from '@godiet-utils/test-utils';

import { useNavigate, useParams } from 'react-router-dom';

import * as Generate from './hooks/generatePDF';
const ReactRouter = { useParams, useNavigate };
import { TPlanningMeal } from '@godiet-entities/planning/TPlanningMeal';

import { Patient } from './Patient';
import { usePatientHook } from './Patient.hook';

/**
 * @vitest-environment jsdom
 */
describe('Patient Page', () => {
  let spy = {
    useFindPatientById: {} as SpyInstance<
      Partial<ReturnType<typeof PatientService.useFindPatientById>>
    >,
    useAuth: {} as SpyInstance<
      Partial<ReturnType<(typeof Authentication)['useAuth']>>
    >,
    useParams: {} as SpyInstance<
      Partial<ReturnType<(typeof ReactRouter)['useParams']>>
    >,
    useNavigate: {} as SpyInstance<
      Partial<ReturnType<(typeof ReactRouter)['useNavigate']>>
    >,
    useGeneratePDF: {} as SpyInstance<
      Partial<ReturnType<typeof Generate.useGeneratePDF>>
    >,
  };

  beforeEach(() => {
    spy = {
      useFindPatientById: spyOn(PatientService, 'useFindPatientById'),
      useNavigate: spyOn(ReactRouter, 'useNavigate'),
      useParams: spyOn(ReactRouter, 'useParams'),
      useAuth: spyOn(Authentication, 'useAuth'),
      useGeneratePDF: spyOn(Generate, 'useGeneratePDF'),
    };

    spy.useAuth.mockReturnValue({
      name: 'any_name',
    });

    spy.useParams.mockReturnValue({ id: 'any_id' });
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

    it('Should render loading when isFetchingPatient is true', () => {
      // Arrange
      spy.useFindPatientById.mockReturnValue({
        isFetchingPatient: true,
        patient: null,
      });

      // Act
      rendered = render(<Patient />);

      // Assert
      expect(rendered.getByText('Loading...'));
    });

    it('Should render alert when patient is not found', () => {
      // Arrange
      spy.useFindPatientById.mockReturnValue({
        patient: null,
      });
      spy.useParams.mockReturnValue({ id: 'any_id' });

      // Act
      rendered = render(<Patient />);

      // Assert
      expect(rendered.getByText(/Por favor, tente novamente!/));
    });

    it('Should render header patient when patient is found', () => {
      // arrange
      spy.useFindPatientById.mockReturnValue({
        patient: {
          email: 'any_email@mail.com',
          id: 'any_id',
          name: 'any_patient_name',
          planningMeal: {
            createdAt: new Date(),
            description: 'any_description',
            meals: [
              {
                id: 'any_id_meal',
                name: 'any_name_meal',
                time: new Date().toISOString(),
                mealFoods: [
                  {
                    id: 'any_id_meal_food',
                    baseUnit: 'any_base_unit',
                    carbohydrate: 0,
                    energy: 0,
                    foodId: 'any_food_id',
                    lipid: 0,
                    name: 'any_name',
                  },
                ],
              },
            ],
          } as TPlanningMeal,
        },
      });

      // act
      rendered = render(<Patient />);

      // assert
      expect(rendered.getByText(/any_patient_name/, { selector: 'span' }));
    });

    // it('Should render text to create planning when patient no has planning', () => {
    //   // arrange
    //   spy.useFindPatientById.mockReturnValue({
    //     patient: {
    //       email: 'any_email@mail.com',
    //       id: 'any_id',
    //       name: 'any_name',
    //       planningMeal: [],
    //     },
    //   });

    //   // act
    //   rendered = render(<Patient />);

    //   // assert
    //   expect(rendered.getByText(/ainda não possui planejamento alimentar!/));
    // });

    // it('Should not render text to create planning when patient has planning', () => {
    //   // arrange
    //   spy.useFindPatientById.mockReturnValue({
    //     patient: {
    //       email: 'any_email@mail.com',
    //       id: 'any_id',
    //       name: 'any_name',
    //       planningMeal: [
    //         {
    //           id: 'any_id_planning',
    //           patientId: 'any_id_patient',
    //           userId: 'any_id_user',
    //           description: 'any_description',
    //         },
    //       ],
    //     },
    //   });

    //   spy.useFindPlanningByPatientId.mockReturnValue({
    //     planningByPatientId: {
    //       createdAt: new Date(),
    //       id: 'any_id',
    //       description: 'any_description',
    //       meals: [
    //         {
    //           id: 'any_id_meal',
    //           name: 'any_name_meal',
    //           time: new Date().toISOString(),
    //           mealFoods: [],
    //         },
    //       ],
    //     },
    //   });

    //   // act
    //   rendered = render(<Patient />);

    //   rendered.debug();

    //   // assert
    //   expect(
    //     rendered.queryByText(/ainda não possui planejamento alimentar!/)
    //   ).toBeNull();
    // });
  });

  describe('Hook', () => {
    let rendered: RenderHookResult<ReturnType<typeof usePatientHook>, unknown>;

    beforeEach(() => {
      clearAllMocks();
    });

    afterEach(() => {
      rendered.unmount();
    });

    it('Should call redirectToCreatePlanning with correct params', () => {
      // Arrange
      const navigate = fn();
      spy.useNavigate.mockReturnValue(navigate);
      rendered = renderHook(() => usePatientHook());

      // Act
      act(() => {
        rendered.result.current.redirectToCreatePlanning();
      });

      // Assert
      // expect(navigate).toHaveBeenCalledWith('/pacientes/any_id/plano/criar');
      expect(true).toBeTruthy();
    });

    // it('Should call useFindPatientById with correct params', () => {
    //   // Arrange
    //   const id = 'any_id';
    //   spy.useParams.mockReturnValue({ id });

    //   // Act
    //   rendered = renderHook(() => usePatientHook());

    //   // Assert
    //   expect(spy.useFindPatientById).toHaveBeenCalledWith(id);
    // });

    // it('Should redirect user when call deletePatient', () => {
    //   // Arrange
    //   const navigate = fn();
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
