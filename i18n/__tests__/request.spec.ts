import { beforeEach, describe, expect, it, vi } from 'vitest';

const mockHasLocale = vi.fn();

vi.mock('next-intl', () => ({
  hasLocale: mockHasLocale,
}));

vi.mock('next-intl/server', () => ({
  getRequestConfig: vi.fn((configFn) => configFn),
}));

vi.mock('../routing', () => ({
  routing: {
    locales: ['en', 'ru', 'jp'],
    defaultLocale: 'en',
  },
}));

vi.mock('../../app/messages/en.json', () => ({
  default: { greeting: 'Hello' },
}));

vi.mock('../../app/messages/ru.json', () => ({
  default: { greeting: 'Привет' },
}));

vi.mock('../../app/messages/jp.json', () => ({
  default: { greeting: 'こんにちは' },
}));

describe('getRequestConfig', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns config for valid locale', async () => {
    mockHasLocale.mockReturnValue(true);

    const { default: configFn } = await import('../request');
    const result = await configFn({
      requestLocale: Promise.resolve('ru'),
    });

    expect(result.locale).toBe('ru');
    expect(result.messages).toEqual({ greeting: 'Привет' });
  });

  it('falls back to default locale for invalid locale', async () => {
    mockHasLocale.mockReturnValue(false);

    const { default: configFn } = await import('../request');
    const result = await configFn({
      requestLocale: Promise.resolve('invalid'),
    });

    expect(result.locale).toBe('en');
    expect(result.messages).toEqual({ greeting: 'Hello' });
  });

  it('handles undefined request locale', async () => {
    mockHasLocale.mockReturnValue(false);

    const { default: configFn } = await import('../request');
    const result = await configFn({
      requestLocale: Promise.resolve(undefined),
    });

    expect(result.locale).toBe('en');
    expect(result.messages).toEqual({ greeting: 'Hello' });
  });
});
