import { authTables } from '@convex-dev/auth/server';
import { defineSchema, defineTable } from 'convex/server';
import { historySchema } from './schemas/historySchema';
import { userSchema } from './schemas/usersSchema';

const schema = defineSchema({
  ...authTables,
  users: defineTable(userSchema).index('email', ['email']),
  history: defineTable(historySchema).index('userId', ['userId']),
});

export default schema;
