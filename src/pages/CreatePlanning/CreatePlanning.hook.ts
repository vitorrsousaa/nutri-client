import { useCallback, useMemo } from 'react';

import { useFindPatientById } from '@godiet-hooks/patients';
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

  const { patient, isFetchingPatient } = useFindPatientById(id);

  const { createPlanningMeal } = useCreatePlanningMeal();

  const methods = useForm<CreatePlanningMealDTO>({
    resolver: zodResolver(CreatePlanningMealSchema),
  });

  const {
    handleSubmit: hookFormSubmit,
    formState: { errors, isValid: formIsValid },
    control,
  } = methods;

  const {
    append: appendMeals,
    remove: removeMeal,
    fields: fieldMeals,
  } = useFieldArray({
    control,
    name: 'meals',
  });

  const watchMeals = useWatch({
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
        watchMeals.every((meal) => {
          return (
            meal.foods.length > 0 &&
            meal.foods.every((food) => food.quantity > 0)
          );
        })
    );
  }, [formIsValid, watchMeals]);

  const hasMeals = useMemo(() => fieldMeals.length > 0, [fieldMeals]);

  return {
    isFetchingPatient,
    patient,
    methods,
    meals: fieldMeals,
    isValid,
    errors,
    control,
    hasMeals,
    handleSubmit,
    handleRemoveMeal,
    handleAddNewMeal,
  };
}
