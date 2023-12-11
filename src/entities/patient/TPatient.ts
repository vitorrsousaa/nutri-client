import { StatusEnum } from '@godiet-entities/status';

import * as z from 'zod';

import { GenderEnum } from '../gender';

export const PatientSchema = z.object({
  email: z.string(),
  name: z.string(),
  id: z.string().uuid(),
  height: z.number().positive().optional(),
  weight: z.number().positive().optional(),
  birthDate: z
    .string()
    .pipe(z.coerce.date())
    .refine((date) => date <= new Date(), {
      message: 'Birth date cannot be in the future',
    })
    .optional(),
  gender: GenderEnum.optional(),
  status: StatusEnum.optional(),
});

export type TPatient = z.infer<typeof PatientSchema>;
