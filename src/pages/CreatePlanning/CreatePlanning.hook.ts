import { useCallback } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import * as z from 'zod';

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
    })
  ),
});

const createPlanningFormSchema = z.object({
  description: z.string(),
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
    formState: { errors, isValid },
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

  return {
    isFetchingPatient,
    patient,
    methods,
    meals,
    isValid,
    errors,
    returnPage,
    handleSubmit,
    handleRemoveMeal,
    handleAddNewMeal,
  };
}
