import { OriginFoodEnum } from '@godiet-entities/food/origin/TOrigin';

import * as z from 'zod';

export const MealFoodSchema = z.object({
  name: z.string(),
  quantity: z.number(),
  baseUnit: z.string(),
  foodId: z.string(),
  origin: OriginFoodEnum,
  energy: z.number().min(0),
  protein: z.number().min(0),
  carbohydrate: z.number().min(0),
  lipid: z.number().min(0),
  id: z.string().uuid(),
});

const MealSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, 'O nome da refeição é obrigatório'),
  time: z.string().refine((value) => /^([01]\d|2[0-3]):[0-5]\d$/.test(value), {
    message: 'Insira um formato de hora válido (HH:mm).',
  }),
  mealFoods: z.array(MealFoodSchema),
});

export const PlanningMealSchema = z.object({
  description: z.string().or(z.null()),
  meals: z.array(MealSchema).min(1, 'É necessário pelo menos uma refeição'),
  id: z.string().uuid(),
});

export type TPlanningMeal = z.infer<typeof PlanningMealSchema>;

export type TMeal = z.infer<typeof MealSchema>;

export type TMealFood = z.infer<typeof MealFoodSchema>;
