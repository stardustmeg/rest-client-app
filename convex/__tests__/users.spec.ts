import { convexTest } from 'convex-test';
import { describe, expect, it } from 'vitest';
import { api } from '../_generated/api';
import type { Id } from '../_generated/dataModel';
import schema from '../schema';

let testUserId: Id<'users'>;

describe('currentUser', () => {
  it('returns null if not authenticated', async () => {
    const t = convexTest(schema);

    const user = await t.query(api.users.currentUser);

    expect(user).toBeNull();
  });

  it('returns the user if authenticated', async () => {
    const t = convexTest(schema);

    await t.run(async (ctx) => {
      testUserId = await ctx.db.insert('users', { username: 'login', email: 'email' });
    });

    const asUser = t.withIdentity({ subject: testUserId });
    const user = await asUser.query(api.users.currentUser);

    expect(user).toEqual(expect.objectContaining({ username: 'login', email: 'email' }));
  });

  it('returns null if authenticated but user does not exist', async () => {
    const t = convexTest(schema);

    const asUser = t.withIdentity({ subject: 'a' });
    const user = await asUser.query(api.users.currentUser);

    expect(user).toBeNull();
  });
});
