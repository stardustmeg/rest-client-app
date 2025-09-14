import { getAuthUserId } from '@convex-dev/auth/server';
import { v } from 'convex/values';
import { mutation, query } from './_generated/server';
import { historySchema } from './schemas/historySchema';

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query('history').collect();
  },
});

export const getByUserId = query({
  args: { userId: v.id('users') },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('history')
      .withIndex('userId', (q) => q.eq('userId', args.userId))
      .collect();
  },
});

export const getUserHistory = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);

    if (!userId) {
      throw new Error('User not authenticated');
    }

    return await ctx.db
      .query('history')
      .withIndex('userId', (q) => q.eq('userId', userId))
      .order('desc')
      .collect();
  },
});

export const createHistoryItem = mutation({
  args: historySchema,
  handler: async (ctx, args) => {
    const historyItemId = await ctx.db.insert('history', args);
    return historyItemId;
  },
});
