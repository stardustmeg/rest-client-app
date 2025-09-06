import { z } from 'zod';

export const variablesSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  value: z.string().min(1, 'Name is required'),
});

export type Variable = z.infer<typeof variablesSchema> & {
  id: number;
};
