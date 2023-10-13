import * as z from 'zod';

import { GenderEnum } from '../../gender';

export const CreatePatientSchema = z.object({
  email: z.string().email({ message: 'Invalid e-mail format' }),
  name: z.string(),
  height: z.number().positive(),
  weight: z.number().positive(),
  birthDate: z
    .string()
    .pipe(z.coerce.date())
    .refine((date) => date <= new Date(), {
      message: 'Birth date cannot be in the future',
    }),
  gender: GenderEnum,
});

export type createPatientDTO = z.infer<typeof CreatePatientSchema>;
