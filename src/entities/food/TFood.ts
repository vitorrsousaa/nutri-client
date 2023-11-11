import * as z from 'zod';

/**
 * Model for food used in the application
 */

export const FoodSchema = z.object({
  name: z.string(),
  calories: z.number().positive(),
  protein: z.number().positive(),
  carbo: z.number().positive(),
  fat: z.number().positive(),
  quantity: z.number().positive(),
  id: z.string(),
});

export type TFood = z.infer<typeof FoodSchema>;
