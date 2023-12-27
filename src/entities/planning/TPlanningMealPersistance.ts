import { OriginFoodEnum } from '@godiet-entities/food/origin/TOrigin';

import * as z from 'zod';

export const MealFoodPersistanceSchema = z.object({
  name: z.string(),
  quantity: z.number(),
  baseUnit: z.string(),
  foodId: z.string(),
  calories: z.number().min(0),
  protein: z.number().min(0),
  carb: z.number().min(0),
  fat: z.number().min(0),
  foodOrigin: OriginFoodEnum,
  id: z.string().uuid(),
  mealId: z.string().uuid(),
});

const MealPersistanceSchema = z.object({
  id: z.string().uuid(),
  planningMealId: z.string().uuid(),
  name: z.string().min(1, 'O nome da refeição é obrigatório'),
  time: z.string().refine((value) => /^([01]\d|2[0-3]):[0-5]\d$/.test(value), {
    message: 'Insira um formato de hora válido (HH:mm).',
  }),
  mealFoods: z.array(MealFoodPersistanceSchema),
});

export const PlanningMealPersistanceSchema = z.object({
  description: z.string().or(z.null()),
  meals: z
    .array(MealPersistanceSchema)
    .min(1, 'É necessário pelo menos uma refeição'),
  id: z.string().uuid(),
  patientId: z.string().uuid(),
  userId: z.string().uuid(),
  createdAt: z.date(),
});

export type TPlanningMealPersistance = z.infer<
  typeof PlanningMealPersistanceSchema
>;

export type TMealPersistance = z.infer<typeof MealPersistanceSchema>;

export type TMealFoodPersistance = z.infer<typeof MealFoodPersistanceSchema>;
