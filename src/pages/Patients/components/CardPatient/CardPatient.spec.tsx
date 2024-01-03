import patient from '@godiet-utils/mocks/patientDomain';
import {
  render,
  renderHook,
  RenderHookResult,
} from '@godiet-utils/test-render';
import { clearAllMocks } from '@godiet-utils/test-utils';

import { useCardPatientHook } from './CardPatient.hook';
import CardPatient from '.';

/**
 * @vitest-environment jsdom
 */
describe('Card Patient Component', () => {
  afterEach(() => {
    clearAllMocks();
  });

  describe('Component', () => {
    let rendered: ReturnType<typeof render>;

    beforeEach(() => {
      clearAllMocks();
    });

    afterEach(() => {
      rendered.unmount();
    });

    it('Should render name of tab', () => {
      // Arrange

      // Act
      rendered = render(<CardPatient patient={patient} />);

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
      clearAllMocks();
    });

    afterEach(() => {
      rendered?.unmount();
    });

    it('Should return correctly formatDate', () => {
      // Arrange
      const date = new Date('2021-09-01T06:06:00.000Z');

      // Act
      rendered = renderHook(() =>
        useCardPatientHook({
          patient: {
            ...patient,
            birthDate: date,
          },
        })
      );

      // Assert
      expect(rendered.result.current.formatedBirthDate).toEqual(
        '01/09/2021, 3 anos'
      );
    });
  });
});
