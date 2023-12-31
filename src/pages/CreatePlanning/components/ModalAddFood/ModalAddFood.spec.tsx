import * as FoodService from '@godiet-hooks/food';
import {
  act,
  fireEvent,
  render,
  renderHook,
  RenderHookResult,
  renderWithHookForm,
} from '@godiet-utils/test-render';
import {
  clearAllMocks,
  fn,
  SpyInstance,
  spyOn,
} from '@godiet-utils/test-utils';

import ModalAddFood, { ModalAddFoodProps } from './ModalAddFood';
import { useModalAddFood } from './ModalAddFood.hook';

const foodsMock = [
  {
    id: 'any_id_1',
    name: 'any_name_1',
    categoryName: 'any_category',
    baseUnit: 'any_base',
    baseQty: 100,
    attributes: [
      {
        name: 'carbohydrate',
        unit: 'any_unit',
        qty: 100,
      },
      {
        name: 'energy',
        unit: 'any_unit',
        qty: 100,
      },
      {
        name: 'protein',
        unit: 'any_unit',
        qty: 100,
      },
      {
        name: 'lipid',
        unit: 'any_unit',
        qty: 100,
      },
    ],
  },
  {
    id: 'any_id',
    name: 'any_name',
    categoryName: 'any_category',
    baseUnit: 'any_base',
    baseQty: 100,
    attributes: [
      {
        name: 'carbohydrate',
        unit: 'any_unit',
        qty: 100,
      },
      {
        name: 'energy',
        unit: 'any_unit',
        qty: 100,
      },
      {
        name: 'protein',
        unit: 'any_unit',
        qty: 100,
      },
      {
        name: 'lipid',
        unit: 'any_unit',
        qty: 100,
      },
    ],
  },
];

/**
 * @vitest-environment jsdom
 */
describe('Modal add food', () => {
  let spy = {
    useGetAllFoods: {} as SpyInstance<
      Partial<ReturnType<(typeof FoodService)['useGetAllFoods']>>
    >,
  };

  beforeEach(() => {
    spy = {
      useGetAllFoods: spyOn(FoodService, 'useGetAllFoods'),
    };

    spy.useGetAllFoods.mockReturnValue({
      foods: foodsMock,
    });
  });

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

    it('Should render correctly', () => {
      // Arrange
      const onClose = fn();
      const props: ModalAddFoodProps = {
        isOpen: true,
        onClose,
        appendFood: fn(),
        updateFood: fn(),
      };

      rendered = renderWithHookForm(<ModalAddFood {...props} />);

      // Act
      act(() => {
        fireEvent.click(rendered.getByLabelText('Close'));
      });

      // Assert
      expect(onClose).toHaveBeenCalled();
    });
  });

  describe('Hook', () => {
    let rendered: RenderHookResult<ReturnType<typeof useModalAddFood>, unknown>;

    beforeEach(() => {
      clearAllMocks();
    });

    afterEach(() => {
      rendered.unmount();
    });

    it('Should return correctly foods', () => {
      // Arrange
      const props: ModalAddFoodProps = {
        isOpen: false,
        onClose: fn(),
        appendFood: fn(),
        updateFood: fn(),
      };
      const foodMock = [
        {
          attributes: [
            {
              name: 'attribute_name',
              qty: 1,
              unit: 'unit',
            },
          ],
          baseQty: 1,
          baseUnit: 'unit',
          categoryName: 'category_name',
          id: 'id',
          name: 'name',
        },
      ];
      spy.useGetAllFoods.mockReturnValue({
        foods: foodMock,
      });

      // Act
      rendered = renderHook(() => useModalAddFood(props));

      // Assert
      expect(rendered.result.current.foods).toEqual(foodMock);
    });

    it('Should return correctly foods options', () => {
      // Arrange
      const props: ModalAddFoodProps = {
        isOpen: false,
        onClose: fn(),
        appendFood: fn(),
        updateFood: fn(),
      };
      const foodMock = [
        {
          attributes: [
            {
              name: 'attribute_name',
              qty: 1,
              unit: 'unit',
            },
          ],
          baseQty: 1,
          baseUnit: 'unit',
          categoryName: 'category_name',
          id: 'id',
          name: 'name',
        },
      ];
      spy.useGetAllFoods.mockReturnValue({
        foods: foodMock,
      });

      // Act
      rendered = renderHook(() => useModalAddFood(props));

      // Assert
      expect(rendered.result.current.foodOptions).toEqual([
        { label: 'Selecione um alimento', value: '' },
        { label: 'name', value: 'id' },
      ]);
    });

    it('Should call onClose when call handleCloseModal', () => {
      // Arrange
      const onClose = fn();
      const props: ModalAddFoodProps = {
        isOpen: false,
        onClose,
        appendFood: fn(),
        updateFood: fn(),
      };
      rendered = renderHook(() => useModalAddFood(props));

      // Act
      rendered.result.current.handleCloseModal();

      // Assert
      expect(onClose).toHaveBeenCalled();
    });
  });
});
