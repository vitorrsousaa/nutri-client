import * as z from 'zod';

/**
 * Model for anamnesis create send database
 */

export const AnamnesisCreateSchema = z.object({
  text: z.string(),
  title: z.string(),
});

export type TAnamnesisCreateDTO = z.infer<typeof AnamnesisCreateSchema>;
