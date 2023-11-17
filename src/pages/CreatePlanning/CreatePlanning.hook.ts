import { useCallback, useMemo } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import {
  CreatePlanningMealDTO,
  CreatePlanningMealSchema,
} from '../../entities/planning/dtos/create-planning-meal-dto';
import { useFindByIdPatient } from '../../hooks/patients';
import PlanningMealService from '../../service/Planning';

export function useCreatePlanning() {
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();

  const { patient, isFetchingPatient } = useFindByIdPatient(id);

  const methods = useForm<CreatePlanningMealDTO>({
    resolver: zodResolver(CreatePlanningMealSchema),
  });

  const {
    handleSubmit: hookFormSubmit,
    formState: { errors, isValid: formIsValid },
    control,
  } = methods;

  const {
    fields: meals,
    append: appendMeals,
    remove: removeMeal,
  } = useFieldArray({
    control,
    name: 'meals',
  });

  const handleSubmit = hookFormSubmit(async (data) => {
    const isValid = data.meals.every((meal) => {
      return (
        meal.foods.length > 0 && meal.foods.every((food) => food.quantity > 0)
      );
    });

    if (!isValid) {
      return;
    }

    try {
      await PlanningMealService.create(data, patient?.id as string);
      toast.success('Planejamento criado com sucesso');
    } catch {
      toast.error('Erro ao criar o planejamento');
    } finally {
      navigate(-1);
    }
  });

  const handleRemoveMeal = useCallback(
    (index: number) => {
      removeMeal(index);
    },
    [removeMeal]
  );

  const handleAddNewMeal = useCallback(() => {
    appendMeals({
      name: '',
      foods: [],
      time: '',
    });
  }, [appendMeals]);

  const returnPage = useCallback(() => {
    navigate(-1);
  }, []);

  const isValid = useMemo(() => {
    return Boolean(formIsValid);
  }, [formIsValid, meals]);

  return {
    isFetchingPatient,
    patient,
    methods,
    meals,
    isValid,
    errors,
    control,
    returnPage,
    handleSubmit,
    handleRemoveMeal,
    handleAddNewMeal,
  };
}
