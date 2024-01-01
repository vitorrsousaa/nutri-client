import { renderWithHookForm } from '@godiet-utils/test-render';

import FoodForm from '.';

/**
 * @vitest-environment jsdom
 */
describe('Food Form Component', () => {
  describe('Food form view', () => {
    it('Should render correctly with props', () => {
      const rendered = renderWithHookForm(<FoodForm mealIndex={0} />);

      expect(rendered.getByText('Adicionar alimento'));
    });
  });
});
