import { z } from 'zod';

export const OriginFoodEnum = z.enum(['DATABASE', 'CUSTOM']);

export type TOriginFoodEnum = z.infer<typeof OriginFoodEnum>;
