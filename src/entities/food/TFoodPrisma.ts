import * as z from 'zod';

/**
 * Model for food returned by the database
 */

export const FoodSchemaDatabase = z.object({
  name: z.string(),
  calories: z.number().positive(),
  protein: z.number().positive(),
  carbo: z.number().positive(),
  fat: z.number().positive(),
  quantity: z.number().positive(),
  id: z.string(),
  group: z.string(),
});

export type TFoodDatabase = z.infer<typeof FoodSchemaDatabase>;
