import { StatusEnum } from '@godiet-entities/status';

import * as z from 'zod';

import { GenderEnum } from '../../gender';

export const UpdatePatientSchema = z.object({
  email: z.string().email({ message: 'Invalid e-mail format' }),
  name: z.string(),
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
  id: z.string().uuid(),
});

export type TUpdatePatientDTO = z.infer<typeof UpdatePatientSchema>;
