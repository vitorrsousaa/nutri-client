import * as FoodService from '../../../../hooks/food';
import {
  act,
  fireEvent,
  render,
  renderHook,
  RenderHookResult,
  renderWithHookForm,
} from '../../../../utils/test-utils';

import ModalAddFood, { ModalAddFoodProps } from './ModalAddFood';
import { useModalAddFood } from './ModalAddFood.hook';

describe('Modal add food', () => {
  let spy = {
    useGetAllFoods: {} as jest.SpyInstance<
      Partial<ReturnType<(typeof FoodService)['useGetAllFoods']>>
    >,
  };

  beforeEach(() => {
    spy = {
      useGetAllFoods: jest.spyOn(FoodService, 'useGetAllFoods'),
    };
  });

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

    it('Should render correctly', () => {
      // Arrange
      const onClose = jest.fn();
      const props: ModalAddFoodProps = {
        isOpen: true,
        onClose,
        appendFood: jest.fn(),
        updateFood: jest.fn(),
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
      jest.clearAllMocks();
    });

    afterEach(() => {
      rendered.unmount();
    });

    it('Should return correctly foods', () => {
      // Arrange
      const props: ModalAddFoodProps = {
        isOpen: false,
        onClose: jest.fn(),
        appendFood: jest.fn(),
        updateFood: jest.fn(),
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
        onClose: jest.fn(),
        appendFood: jest.fn(),
        updateFood: jest.fn(),
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
      const onClose = jest.fn();
      const props: ModalAddFoodProps = {
        isOpen: false,
        onClose,
        appendFood: jest.fn(),
        updateFood: jest.fn(),
      };
      rendered = renderHook(() => useModalAddFood(props));

      // Act
      rendered.result.current.handleCloseModal();

      // Assert
      expect(onClose).toHaveBeenCalled();
    });
  });
});
