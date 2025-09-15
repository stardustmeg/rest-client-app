import { v } from 'convex/values';

export const historySchema = {
  ok: v.boolean(),
  userId: v.id('users'),
  requestDuration: v.number(),
  responseStatusCode: v.number(),
  requestTimestamp: v.number(),
  requestMethod: v.string(),
  requestHeaders: v.array(
    v.object({
      key: v.string(),
      value: v.string(),
    }),
  ),
  requestSize: v.number(),
  responseSize: v.number(),
  errorDetails: v.union(v.string(), v.null()),
  endpoint: v.string(),
  requestBody: v.object({
    value: v.optional(v.string()),
    type: v.optional(v.string()),
  }),
};
