import * as z from 'zod';

/**
 * Model for anamnesis template returned by the server
 */

export const AnamnesisTemplatePersistanceSchema = z.object({
  userId: z.string(),
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  text: z.string(),
  title: z.string(),
});

export type TAnamnesisTemplatePersistance = z.infer<
  typeof AnamnesisTemplatePersistanceSchema
>;
