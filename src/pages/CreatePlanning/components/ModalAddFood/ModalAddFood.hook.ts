import { useCallback, useMemo, useState } from 'react';

import {
  OriginFoodEnum,
  TOriginFoodEnum,
} from '../../../../entities/food/origin/TOrigin';
import { useGetAllFoods } from '../../../../hooks/food';
import { SelectOptionsType } from '../../../../libs/ui/components/Select';

import { getCalculateAttributes } from './funcs/calculateAttributes';
import { ModalAddFoodProps } from './ModalAddFood';

type CreateFoodSchema = {
  selectedFood: string;
  quantity: number;
};

export function useModalAddFood(props: ModalAddFoodProps) {
  const { onClose, appendFood, updateFood } = props;

  const [isEditingFood, setIsEditingFood] = useState(false);
  const [indexFood, setIndexFood] = useState<null | number>(null);
  const [newFood, setNewFood] = useState<CreateFoodSchema | null>(null);
  const [origin, setOrigin] = useState<TOriginFoodEnum>('TACO');

  const { foods, isFetchingFoods } = useGetAllFoods(origin);

  // const isFetchingFoods = false;

  // const foods = [
  //   {
  //     id: 'any_id_1',
  //     name: 'any_name_1',
  //     categoryName: 'any_category',
  //     baseUnit: 'any_base',
  //     baseQty: 100,
  //     attributes: [
  //       {
  //         name: 'carbohydrate',
  //         unit: 'any_unit',
  //         qty: 100,
  //       },
  //       {
  //         name: 'energy',
  //         unit: 'any_unit',
  //         qty: 100,
  //       },
  //       {
  //         name: 'protein',
  //         unit: 'any_unit',
  //         qty: 100,
  //       },
  //       {
  //         name: 'lipid',
  //         unit: 'any_unit',
  //         qty: 100,
  //       },
  //     ],
  //   },
  //   {
  //     id: 'any_id',
  //     name: 'any_name',
  //     categoryName: 'any_category',
  //     baseUnit: 'any_base',
  //     baseQty: 100,
  //     attributes: [
  //       {
  //         name: 'carbohydrate',
  //         unit: 'any_unit',
  //         qty: 100,
  //       },
  //       {
  //         name: 'energy',
  //         unit: 'any_unit',
  //         qty: 100,
  //       },
  //       {
  //         name: 'protein',
  //         unit: 'any_unit',
  //         qty: 100,
  //       },
  //       {
  //         name: 'lipid',
  //         unit: 'any_unit',
  //         qty: 100,
  //       },
  //     ],
  //   },
  // ];

  const selectedFood = useMemo(() => {
    const currentFood = foods.find((food) => food.id === newFood?.selectedFood);

    if (!currentFood) {
      return undefined;
    }

    if (!newFood) {
      return undefined;
    }

    return {
      name: currentFood?.name,
      quantity: newFood.quantity,
      baseUnit: currentFood?.baseUnit,
      foodId: currentFood?.id,
      origin,
      energy: getCalculateAttributes(newFood.quantity, currentFood, 'energy'),
      protein: getCalculateAttributes(newFood.quantity, currentFood, 'protein'),
      carbohydrate: getCalculateAttributes(
        newFood.quantity,
        currentFood,
        'carbohydrate'
      ),
      lipid: getCalculateAttributes(newFood.quantity, currentFood, 'lipid'),
    };
  }, [newFood, foods, origin]);

  const handleCloseModal = useCallback(() => {
    onClose();
    setNewFood(null);
  }, [onClose, setNewFood]);

  const handleAddNewFood = useCallback(() => {
    const currentFood = foods.find((food) => food.id === newFood?.selectedFood);

    if (!currentFood) {
      return;
    }

    if (!newFood) {
      return;
    }

    if (!isEditingFood) {
      appendFood(selectedFood);
    } else {
      updateFood(indexFood!, selectedFood);
    }

    handleCloseModal();
  }, [
    foods,
    newFood,
    isEditingFood,
    handleCloseModal,
    appendFood,
    selectedFood,
    updateFood,
    indexFood,
  ]);

  const handleChangeFieldFood = useCallback(
    <Field extends keyof CreateFoodSchema>(
      field: Field,
      newValue: CreateFoodSchema[Field]
    ) => {
      setNewFood((prevFood) => {
        if (prevFood === null) {
          const createObject: CreateFoodSchema = {
            selectedFood: '',
            quantity: 0,
          };
          return { ...createObject, [field]: newValue };
        }

        return {
          ...prevFood,

          [field]: newValue,
        };
      });
    },
    [setNewFood]
  );

  const handleChangeOrigin = useCallback(
    (origin: string) => {
      const parsedOrigin = OriginFoodEnum.parse(origin);
      setOrigin(parsedOrigin);
    },
    [setOrigin]
  );

  const foodOptions = useMemo<SelectOptionsType[]>(() => {
    const mappedFoods = foods.map((food) => ({
      label: food.name,
      value: food.id,
    }));
    mappedFoods.unshift({ label: 'Selecione um alimento', value: '' });

    return mappedFoods;
  }, [foods]);

  const isValid = useMemo(() => {
    return Boolean(
      newFood && newFood.quantity > 0 && newFood.selectedFood.length > 0
    );
  }, [newFood]);

  const dataChart = useMemo(() => {
    if (!selectedFood) {
      return [];
    }

    return [
      {
        x: 'Carboidratos (g)',
        y: selectedFood.carbohydrate,
      },
      {
        x: 'Proteínas (g)',
        y: selectedFood.protein,
      },
      {
        x: 'Lipídios (g)',
        y: selectedFood.lipid,
      },
      {
        x: 'Calorias (kcal)',
        y: selectedFood.energy,
      },
    ];
  }, [selectedFood]);

  return {
    foods,
    foodOptions,
    isFetchingFoods,
    isValid,
    selectedFood,
    dataChart,
    indexFood,
    handleAddNewFood,
    handleChangeOrigin,
    handleChangeFieldFood,
    handleCloseModal,
    setIsEditingFood,
    setIndexFood,
  };
}
