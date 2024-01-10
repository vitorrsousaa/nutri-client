import * as z from 'zod';

/**
 * Model for anamnesis used by domain
 */

export const AnamnesisSchema = z.object({
  patientId: z.string(),
  updatedAt: z.date(),
  id: z.string(),
  createdAt: z.date().or(z.string()),
  text: z.string(),
  title: z.string(),
});

export type TAnamnesis = z.infer<typeof AnamnesisSchema>;
