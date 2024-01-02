import { renderWithHookForm } from '@godiet-utils/test-render';
import { clearAllMocks, fn } from '@godiet-utils/test-utils';

import MealForm from '.';

/**
 * @vitest-environment jsdom
 */
describe('Meal Form', () => {
  afterEach(() => {
    clearAllMocks();
  });

  it('Should render correctly input to set name of meal', () => {
    const rendered = renderWithHookForm(
      <MealForm mealIndex={0} onRemoveMeal={fn()} />
    );

    expect(rendered.getByText('Nome da refeição'));
  });

  it('Should render correctly input to set time of meal', () => {
    const rendered = renderWithHookForm(
      <MealForm mealIndex={0} onRemoveMeal={fn()} />
    );

    expect(rendered.getByText('Horário da refeição'));
  });

  // it('Should call onRemoveMeal correctly with mealIndex', () => {
  //   const onRemoveMeal = jest.fn();

  //   const rendered = renderWithHookForm(
  //     <MealForm mealIndex={0} onRemoveMeal={onRemoveMeal} />
  //   );

  //   act(() => {
  //     fireEvent.click(rendered.getByText('Remover refeição'));
  //   });

  //   // expect(onRemoveMeal).toHaveBeenCalled();
  //   expect(true).toBeTruthy();
  // });
});
