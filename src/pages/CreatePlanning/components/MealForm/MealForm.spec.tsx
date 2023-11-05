import {
  act,
  fireEvent,
  renderWithHookForm,
} from '../../../../utils/test-utils';

import MealForm from '.';

describe('Meal Form', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should render correctly input to set name of meal', () => {
    const rendered = renderWithHookForm(
      <MealForm mealIndex={0} onRemoveMeal={jest.fn()} />
    );

    expect(rendered.getByText('Nome da refeição'));
  });

  it('Should render correctly input to set description of meal', () => {
    const rendered = renderWithHookForm(
      <MealForm mealIndex={0} onRemoveMeal={jest.fn()} />
    );

    expect(rendered.getByText('Descrição da refeição'));
  });

  it('Should render correctly input to set time of meal', () => {
    const rendered = renderWithHookForm(
      <MealForm mealIndex={0} onRemoveMeal={jest.fn()} />
    );

    expect(rendered.getByText('Horário da refeição'));
  });

  it('Should call onRemoveMeal correctly with mealIndex', () => {
    const onRemoveMeal = jest.fn();

    const rendered = renderWithHookForm(
      <MealForm mealIndex={0} onRemoveMeal={onRemoveMeal} />
    );

    act(() => {
      fireEvent.click(rendered.getByText('Remover refeição'));
    });

    expect(onRemoveMeal).toHaveBeenCalledWith(0);
  });
});
