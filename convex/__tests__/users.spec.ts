/** biome-ignore-all lint/style/noMagicNumbers: <tests> */
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

describe('get', () => {
  it('returns all users', async () => {
    const t = convexTest(schema);

    await t.run(async (ctx) => {
      await ctx.db.insert('users', { username: 'user1', email: 'user1@test.com' });
      await ctx.db.insert('users', { username: 'user2', email: 'user2@test.com' });
      await ctx.db.insert('users', { username: 'user3', email: 'user3@test.com' });
    });

    const allUsers = await t.query(api.users.get);

    expect(allUsers).toHaveLength(3);
    expect(allUsers).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ username: 'user1', email: 'user1@test.com' }),
        expect.objectContaining({ username: 'user2', email: 'user2@test.com' }),
        expect.objectContaining({ username: 'user3', email: 'user3@test.com' }),
      ]),
    );
  });

  it('returns empty array when no users exist', async () => {
    const t = convexTest(schema);

    const allUsers = await t.query(api.users.get);

    expect(allUsers).toEqual([]);
  });
});
