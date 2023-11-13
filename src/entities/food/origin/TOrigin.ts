import { z } from 'zod';

export const OriginFoodEnum = z.enum(['TACO', 'CUSTOM']);

export type TOriginFoodEnum = z.infer<typeof OriginFoodEnum>;
