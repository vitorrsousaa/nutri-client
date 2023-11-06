import { renderWithHookForm } from '../../../../utils/test-utils';

import FoodForm from '.';

describe('Food Form Component', () => {
  describe('Food form view', () => {
    it('Should render correctly with props', () => {
      const rendered = renderWithHookForm(<FoodForm mealIndex={0} />);

      expect(rendered.getByText('Adicionar alimento'));
    });
  });
});
