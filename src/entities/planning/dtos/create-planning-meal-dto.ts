import * as z from 'zod';

import { OriginFoodEnum } from '../../food/origin/TOrigin';

const CreateMealFormSchema = z.object({
  name: z.string().min(1, 'O nome da refeição é obrigatório'),
  time: z.string().refine((value) => /^([01]\d|2[0-3]):[0-5]\d$/.test(value), {
    message: 'Insira um formato de hora válido (HH:mm).',
  }),
  foods: z.array(
    z.object({
      name: z.string(),
      quantity: z.number(),
      baseUnit: z.string(),
      foodId: z.string(),
      origin: OriginFoodEnum,
      energy: z.number().min(0),
      protein: z.number().min(0),
      carbohydrate: z.number().min(0),
      lipid: z.number().min(0),
    })
  ),
});

export const CreatePlanningMealSchema = z.object({
  description: z.string().optional(),
  meals: z
    .array(CreateMealFormSchema)
    .min(1, 'É necessário pelo menos uma refeição'),
});

export type CreatePlanningMealDTO = z.infer<typeof CreatePlanningMealSchema>;
