import * as z from 'zod';

/**
 * Model for food returned by the taco table
 */

export const FoodSchemaTaco = z.object({
  name: z.string(),
  id: z.string(),
  baseQty: z.number().positive(),
  baseUnit: z.string(),
  categoryName: z.string(),
  attributes: z.array(
    z.object({
      qty: z.number().positive().or(z.string()),
      name: z.string(),
      unit: z.string(),
    })
  ),
});

export type TFoodTaco = z.infer<typeof FoodSchemaTaco>;
