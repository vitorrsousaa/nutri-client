import { render } from '@godiet-utils/test-render';
import { clearAllMocks } from '@godiet-utils/test-utils';

/**
 * @vitest-environment jsdom
 */
import { PanelPatients } from './PanelPatients';
describe('PanelPatients Component', () => {
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
