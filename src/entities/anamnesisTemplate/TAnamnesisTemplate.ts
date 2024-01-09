import * as z from 'zod';

/**
 * Model for anamnesis template used by domain
 */

export const AnamnesisTemplateSchema = z.object({
  userId: z.string(),
  id: z.string(),
  createdAt: z.date(),
  text: z.string(),
  title: z.string(),
});

export type TAnamnesisTemplate = z.infer<typeof AnamnesisTemplateSchema>;
