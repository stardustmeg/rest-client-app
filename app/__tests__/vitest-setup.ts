/** biome-ignore-all lint/suspicious/noEmptyBlockStatements: false positive */
import '@testing-library/jest-dom';

import { afterAll, afterEach, beforeAll, vi } from 'vitest';

import { server } from './server/index.js';

vi.mock('next-intl', async (importOriginal) => {
  const actual = await importOriginal<typeof import('next-intl')>();

  return {
    ...actual,
    useTranslations: vi.fn(() => (key: string) => key),
    useLocale: vi.fn(),
  };
});

global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
