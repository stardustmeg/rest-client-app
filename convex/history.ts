import { mutation, query } from './_generated/server';
import { historySchema } from './schemas/historySchema';

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query('history').collect();
  },
});

export const createHistoryItem = mutation({
  args: historySchema,
  handler: async (ctx, args) => {
    const historyItemId = await ctx.db.insert('history', args);
    return historyItemId;
  },
});
