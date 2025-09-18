import { z } from 'zod';

const variablesErrorKeys = {
  nameRequired: 'variableNameRequired',
  valueRequired: 'variableValueRequired',
} as const;

export const variablesSchema = z.object({
  name: z.string().min(1, { error: variablesErrorKeys.nameRequired }),
  value: z.string().min(1, { error: variablesErrorKeys.valueRequired }),
});

export type Variable = z.infer<typeof variablesSchema>;
