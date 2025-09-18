import { getAuthUserId } from '@convex-dev/auth/server';
import { convexTest } from 'convex-test';
import { describe, expect, it, type Mock, vi } from 'vitest';
import { api } from '../_generated/api';
import schema from '../schema';

vi.mock(import('@convex-dev/auth/server'), async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    getAuthUserId: vi.fn(),
  };
});

describe('currentUser', () => {
  it('returns null', async () => {
    const t = convexTest(schema);

    (getAuthUserId as Mock).mockResolvedValueOnce(null);

    const user = await t.query(api.users.currentUser);
    expect(user).toBeNull();
  });

  it('creates and returns user', async () => {
    const t = convexTest();

    const user = await t.run(async (ctx) => {
      await ctx.db.insert('users', { login: 'login', password: 'password' });
      return await ctx.db.query('users').first();
    });

    expect(user).toEqual(expect.objectContaining({ login: 'login', password: 'password' }));
  });
});
