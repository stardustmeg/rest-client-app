import { convexTest } from 'convex-test';
import { describe, expect, it } from 'vitest';
import { api } from '../_generated/api';
import type { Id } from '../_generated/dataModel';
import schema from '../schema';

const mockItem1 = {
  requestBody: { type: 'jeson', value: '' },
  requestDuration: 200,
  requestHeaders: [],
  requestMethod: 'GET',
  requestSize: 200,
  requestTimestamp: 200,
  responseSize: 200,
  responseStatusCode: 200,
  errorDetails: null,
  endpoint: '',
};

const mockItem2 = {
  requestBody: { type: 'jeson', value: '' },
  requestDuration: 100,
  requestHeaders: [],
  requestMethod: 'POST',
  requestSize: 100,
  requestTimestamp: 100,
  responseSize: 100,
  responseStatusCode: 100,
  errorDetails: null,
  endpoint: '',
};

describe('getUserHistory', () => {
  let testUserId: Id<'users'>;

  it('returns correct history items', async () => {
    const t = convexTest(schema);

    await t.run(async (ctx) => {
      testUserId = await ctx.db.insert('users', { username: 'a', email: 'a' });

      await ctx.db.insert('history', { ...mockItem1, userId: testUserId });
    });

    await t.run(async (ctx) => {
      await ctx.db.insert('history', { ...mockItem2, userId: testUserId });
    });

    const asTestUser = t.withIdentity({ subject: testUserId });

    const h = await asTestUser.query(api.history.getUserHistory);

    expect(h).toHaveLength(2);

    expect(h[0]).toEqual(expect.objectContaining(mockItem2));
    expect(h[1]).toEqual(expect.objectContaining(mockItem1));
  });

  it('returns empty array if user has no history', async () => {
    const t = convexTest(schema);

    const userId = await t.run(async (ctx) => {
      return await ctx.db.insert('users', { username: 'b', email: 'b' });
    });

    const asTestUser = t.withIdentity({ subject: userId });
    const h = await asTestUser.query(api.history.getUserHistory);

    expect(h).toEqual([]);
  });

  it('throws if user is not authenticated', async () => {
    const t = convexTest(schema);

    await expect(t.query(api.history.getUserHistory)).rejects.toThrowError(
      'User not authenticated',
    );
  });

  it('does not return history of other users', async () => {
    const t = convexTest(schema);

    const [userA, userB] = await t.run(async (ctx) => {
      const a = await ctx.db.insert('users', { username: 'a', email: 'a' });
      const b = await ctx.db.insert('users', { username: 'b', email: 'b' });
      await ctx.db.insert('history', { ...mockItem1, userId: a });
      await ctx.db.insert('history', { ...mockItem2, userId: b });
      return [a, b];
    });

    const asUserA = t.withIdentity({ subject: userA });
    const hA = await asUserA.query(api.history.getUserHistory);

    expect(hA).toHaveLength(1);
    expect(hA[0]).toEqual(expect.objectContaining(mockItem1));

    const asUserB = t.withIdentity({ subject: userB });
    const hB = await asUserB.query(api.history.getUserHistory);

    expect(hB).toHaveLength(1);
    expect(hB[0]).toEqual(expect.objectContaining(mockItem2));
  });
});

describe('createHistoryItem', () => {
  it('successfully creates a history item', async () => {
    const t = convexTest(schema);

    const userId = await t.run(async (ctx) => {
      return await ctx.db.insert('users', { username: 'test', email: 'test' });
    });

    const historyItemId = await t.mutation(api.history.createHistoryItem, { ...mockItem1, userId });

    const created = await t.run(async (ctx) => {
      return await ctx.db.get(historyItemId);
    });

    expect(created).toMatchObject(mockItem1);
  });
});
