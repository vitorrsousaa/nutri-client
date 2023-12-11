import { useCallback, useMemo } from 'react';

import { useFindByIdPatient } from '@godiet-hooks/patients';
import { useCreatePlanningMeal } from '@godiet-hooks/planningMeal';

import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm, useWatch } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import {
  CreatePlanningMealDTO,
  CreatePlanningMealSchema,
} from '../../entities/planning/dtos/create-planning-meal-dto';

export function useCreatePlanning() {
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();

  const { patient, isFetchingPatient } = useFindByIdPatient(id);

  const { createPlanningMeal } = useCreatePlanningMeal();

  const methods = useForm<CreatePlanningMealDTO>({
    resolver: zodResolver(CreatePlanningMealSchema),
  });

  const {
    handleSubmit: hookFormSubmit,
    formState: { errors, isValid: formIsValid },
    control,
  } = methods;

  const { append: appendMeals, remove: removeMeal } = useFieldArray({
    control,
    name: 'meals',
  });

  const meals = useWatch({
    control,
    name: 'meals',
    defaultValue: [],
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
      await createPlanningMeal({
        createPlanningMeal: data,
        patientId: patient?.id as string,
      });

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

  const isValid = useMemo(() => {
    return Boolean(
      formIsValid &&
        meals.every((meal) => {
          return (
            meal.foods.length > 0 &&
            meal.foods.every((food) => food.quantity > 0)
          );
        })
    );
  }, [formIsValid, meals]);

  return {
    isFetchingPatient,
    patient,
    methods,
    meals,
    isValid,
    errors,
    control,
    handleSubmit,
    handleRemoveMeal,
    handleAddNewMeal,
  };
}
