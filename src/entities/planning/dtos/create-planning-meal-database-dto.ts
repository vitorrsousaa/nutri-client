import * as z from 'zod';

import { OriginFoodEnum } from '../../food/origin/TOrigin';

const CreateMealDatabaseSchema = z.object({
  name: z.string().min(1, 'O nome da refeição é obrigatório'),
  time: z.string().refine((value) => /^([01]\d|2[0-3]):[0-5]\d$/.test(value), {
    message: 'Insira um formato de hora válido (HH:mm).',
  }),
  foods: z.array(
    z.object({
      name: z.string(),
      quantity: z.number(),
      baseUnit: z.string(),
      id: z.string(),
      origin: OriginFoodEnum,
      calories: z.number().min(0),
      protein: z.number().min(0),
      carb: z.number().min(0),
      fat: z.number().min(0),
    })
  ),
});

export const CreatePlanningMealDatabaseSchema = z.object({
  description: z.string().optional(),
  meals: z
    .array(CreateMealDatabaseSchema)
    .min(1, 'É necessário pelo menos uma refeição'),
});

export type CreatePlanningMealDatabaseDTO = z.infer<
  typeof CreatePlanningMealDatabaseSchema
>;
