import * as z from 'zod';

/**
 * Model for food returned by the taco table
 */

export const AttributeFoodSchema = z.object({
  qty: z.number().positive().or(z.string()),
  name: z.string(),
  unit: z.string(),
});

export const FoodSchemaPersistance = z.object({
  name: z.string(),
  id: z.string(),
  baseQty: z.number().positive(),
  baseUnit: z.string(),
  categoryName: z.string(),
  attributes: z.array(AttributeFoodSchema),
});

export type TFoodPersistance = z.infer<typeof FoodSchemaPersistance>;

export type TFoodAttribute = z.infer<typeof AttributeFoodSchema>;
