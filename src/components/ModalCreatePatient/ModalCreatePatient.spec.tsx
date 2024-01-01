import { render } from '@godiet-utils/test-render';
import { clearAllMocks, fn } from '@godiet-utils/test-utils';

import ModalCreatePatient from '.';
/**
 * @vitest-environment jsdom
 */
describe('Modal Create Patient', () => {
  describe('Component', () => {
    let rendered: ReturnType<typeof render>;

    beforeEach(() => {
      clearAllMocks();
    });

    afterEach(() => {
      rendered?.unmount();
    });

    it('Should render correctly label to name of patient', () => {
      // Arrange

      // Act
      rendered = render(<ModalCreatePatient isOpen onClose={fn()} />);

      // Assert
      expect(rendered.getByText('Insira o nome do paciente'));
    });
  });
});
