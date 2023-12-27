import * as z from 'zod';

/**
 * Model for food used in the application
 */

export const FoodSchema = z.object({
  name: z.string(),
  baseQty: z.number().positive(),
  baseUnit: z.string(),
  categoryName: z.string(),
  id: z.string(),
  attributes: z.array(
    z.object({
      qty: z.number().positive().or(z.string()),
      name: z.string(),
      unit: z.string(),
    })
  ),
});

export type TFood = z.infer<typeof FoodSchema>;
