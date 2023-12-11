import { render } from '../../../../utils/test-utils';

import { PanelPatients } from './PanelPatients';

describe('PanelPatients Component', () => {
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
      const tabs = [
        'Ativos',
        //  'Inativos',
        // 'Todos'
      ];

      // Act
      rendered = render(<PanelPatients />);

      // Assert
      tabs.forEach((tab) => {
        expect(rendered.getByText(tab));
      });
    });
  });
});
