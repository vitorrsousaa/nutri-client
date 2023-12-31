import { PlanningMealPersistanceSchema } from '@godiet-entities/planning/TPlanningMealPersistance';

import * as z from 'zod';

import { GenderEnum } from '../gender';

export const PatientSchema = z.object({
  email: z.string(),
  name: z.string(),
  id: z.string(),
  height: z.number().positive(),
  weight: z.number().positive(),
  birthDate: z
    .string()
    .pipe(z.coerce.date())
    .refine((date) => date <= new Date(), {
      message: 'Birth date cannot be in the future',
    }),
  gender: GenderEnum,
  userId: z.string(),
  planningMeal: z.array(PlanningMealPersistanceSchema).optional(),
});

export type TPatientPersistance = z.infer<typeof PatientSchema>;
