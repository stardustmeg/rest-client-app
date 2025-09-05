import { authTables } from '@convex-dev/auth/server';
import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

const schema = defineSchema({
  ...authTables,
  users: defineTable({
    username: v.optional(v.string()),
    email: v.optional(v.string()),
  }).index('email', ['email']),
});

export default schema;
