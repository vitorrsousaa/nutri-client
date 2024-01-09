import * as z from 'zod';

/**
 * Model for anamnesis returned by the server
 */

export const AnamnesisPersistanceSchema = z.object({
  userId: z.string(),
  patientId: z.string(),
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  text: z.string(),
  title: z.string(),
});

export type TAnamnesisPersistance = z.infer<typeof AnamnesisPersistanceSchema>;
