import { render } from '@godiet-utils/test-utils';

import ModalCreatePatient from '.';

describe('Modal Create Patient', () => {
  describe('Component', () => {
    let rendered: ReturnType<typeof render>;

    beforeEach(() => {
      jest.clearAllMocks();
    });

    afterEach(() => {
      rendered?.unmount();
    });

    it('Should render correctly label to name of patient', () => {
      // Arrange

      // Act
      rendered = render(<ModalCreatePatient isOpen onClose={jest.fn()} />);

      // Assert
      expect(rendered.getByText('Insira o nome do paciente'));
    });
  });
});
