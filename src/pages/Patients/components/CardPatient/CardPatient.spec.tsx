import {
  render,
  renderHook,
  RenderHookResult,
} from '../../../../utils/test-utils';

import { useCardPatientHook } from './CardPatient.hook';
import CardPatient from '.';

describe('Card Patient Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Component', () => {
    let rendered: ReturnType<typeof render>;

    beforeEach(() => {
      jest.clearAllMocks();
    });

    afterEach(() => {
      rendered.unmount();
    });

    it('Should render name of tab', () => {
      // Arrange

      // Act
      rendered = render(
        <CardPatient
          patient={{
            birthDate: new Date(),
            email: 'any_email',
            gender: 'MASC',
            height: 1.8,
            id: 'any_id',
            name: 'any_name',
            weight: 80,
            planningMeal: [],
          }}
        />
      );

      // Assert
      expect(rendered.getByText('any_name'));
    });
  });

  describe('Hook', () => {
    let rendered: RenderHookResult<
      ReturnType<typeof useCardPatientHook>,
      unknown
    >;

    beforeEach(() => {
      jest.clearAllMocks();
    });

    afterEach(() => {
      rendered.unmount();
    });

    it('Should return correctly formatDate', () => {
      // Arrange
      const date = new Date('2021-09-01T06:06:00.000Z');

      // Act
      rendered = renderHook(() =>
        useCardPatientHook({
          patient: {
            birthDate: date,
            email: 'any_email',
            gender: 'MASC',
            height: 1.8,
            id: 'any_id',
            name: 'any_name',
            weight: 80,
            planningMeal: [],
          },
        })
      );

      // Assert
      expect(rendered.result.current.formatedBirthDate).toEqual(
        '01/09/2021, 2 anos'
      );
    });
  });
});
