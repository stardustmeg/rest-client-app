import { v } from 'convex/values';

export const historySchema = {
  userId: v.id('users'),
  requestDuration: v.number(),
  responseStatusCode: v.number(),
  requestTimestamp: v.number(),
  requestMethod: v.string(),
  requestSize: v.number(),
  responseSize: v.number(),
  errorDetails: v.optional(v.string()),
  endpoint: v.string(),
  body: v.optional(
    v.object({
      value: v.optional(v.string()),
      type: v.optional(v.string()),
    }),
  ),
};
