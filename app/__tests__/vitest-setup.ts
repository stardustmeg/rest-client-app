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

vi.mock('next-intl/server', async (importOriginal) => {
  const actual = await importOriginal<typeof import('next-intl/server')>();
  return {
    ...actual,
    getTranslations: vi.fn(async () => (key: string) => key),
  };
});

vi.mock('@/app/domains/auth/get-validation-error', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/app/domains/auth/get-validation-error')>();
  return {
    ...actual,
    getValidationError: vi.fn((tValidation, message) => (message ? tValidation(message) : '')),
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
