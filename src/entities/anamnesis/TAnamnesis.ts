import * as z from 'zod';

/**
 * Model for anamnesis used by domain
 */

export const AnamnesisSchema = z.object({
  userId: z.string(),
  updatedAt: z.date(),
  id: z.string(),
  createdAt: z.date(),
  text: z.string(),
  title: z.string(),
});

export type TAnamnesis = z.infer<typeof AnamnesisSchema>;
