import { TPatient } from '@godiet-entities/patient/TPatient';
import * as PatientService from '@godiet-hooks/patients';
import * as Authentication from '@godiet-hooks/useAuth';
import { render } from '@godiet-utils/test-render';
import { clearAllMocks, SpyInstance, spyOn } from '@godiet-utils/test-utils';

import { useNavigate, useParams } from 'react-router-dom';

import AnamnesePage from '.';
const ReactRouter = { useParams, useNavigate };

/**
 * @vitest-environment jsdom
 */
const patientMock: TPatient = {
  email: 'any_email@mail.com',
  id: 'any_id',
  name: 'any_patient_name',
  planningMeal: {
    id: 'any_id_planning_meal',
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
            protein: 0,
            origin: 'TACO',
            quantity: 0,
          },
        ],
      },
    ],
  },
};
describe('Anamnese page', () => {
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
  };

  beforeEach(() => {
    spy = {
      useFindPatientById: spyOn(PatientService, 'useFindPatientById'),
      useNavigate: spyOn(ReactRouter, 'useNavigate'),
      useParams: spyOn(ReactRouter, 'useParams'),
      useAuth: spyOn(Authentication, 'useAuth'),
    };

    spy.useAuth.mockReturnValue({
      name: 'any_name',
    });

    spy.useParams.mockReturnValue({ id: 'any_patient_id' });
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
      });

      // Act
      rendered = render(<AnamnesePage />);

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
      rendered = render(<AnamnesePage />);

      // Assert
      expect(rendered.getByText(/Por favor, tente novamente!/));
    });

    it('Should render header patient when patient is found', () => {
      // Arrange
      spy.useFindPatientById.mockReturnValue({
        patient: patientMock,
      });

      // Act
      rendered = render(<AnamnesePage />);

      // assert
      expect(rendered.getByText(patientMock.name, { selector: 'span' }));
    });
  });
});
