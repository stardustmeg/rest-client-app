import { convexTest } from 'convex-test';
import { describe, expect, it } from 'vitest';
import { api } from '../_generated/api';
import type { Id } from '../_generated/dataModel';
import schema from '../schema';

let testUserId: Id<'users'>;

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

    const h = await asTestUser.query(api.history.get);

    expect(h).toHaveLength(2);

    expect(h[0]).toEqual(expect.objectContaining(mockItem1));
    expect(h[1]).toEqual(expect.objectContaining(mockItem2));
  });
});
