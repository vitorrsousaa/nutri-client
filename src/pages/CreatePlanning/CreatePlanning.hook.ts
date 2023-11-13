import { useCallback, useMemo } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import * as z from 'zod';

import { OriginFoodEnum } from '../../entities/food/origin/TOrigin';
import { useFindByIdPatient } from '../../hooks/patients';

const createMealFormSchema = z.object({
  name: z.string().min(1, 'O nome da refeição é obrigatório'),
  time: z.string().refine((value) => /^([01]\d|2[0-3]):[0-5]\d$/.test(value), {
    message: 'Insira um formato de hora válido (HH:mm).',
  }),
  food: z.array(
    z.object({
      name: z.string(),
      quantity: z
        .string()
        .pipe(z.coerce.number())
        .refine((number) => number > 1, {
          message: 'Deve ser maior do que 1 g',
        }),
      baseUnit: z.string(),
      foodId: z.string(),
      origin: OriginFoodEnum,
      energy: z.number().positive(),
      protein: z.number().positive(),
      carbohydrate: z.number().positive(),
      lipid: z.number().positive(),
    })
  ),
});

const createPlanningFormSchema = z.object({
  description: z.string().optional(),
  meals: z
    .array(createMealFormSchema)
    .min(1, 'É necessário pelo menos uma refeição'),
});

type CreatePlanningFormSchema = z.infer<typeof createPlanningFormSchema>;

export function useCreatePlanning() {
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();

  const { patient, isFetchingPatient } = useFindByIdPatient(id);

  const methods = useForm<CreatePlanningFormSchema>({
    resolver: zodResolver(createPlanningFormSchema),
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
    console.log(data);
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
      food: [],
      time: '',
    });
  }, [appendMeals]);

  const returnPage = useCallback(() => {
    navigate(-1);
  }, []);

  const isValid = useMemo(() => {
    const foods = meals.map((meal) => meal.food);

    console.log(foods);

    return Boolean(formIsValid && meals.length > 0);
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
