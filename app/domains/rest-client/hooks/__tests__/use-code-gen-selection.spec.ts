import { renderHook, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  getLanguageOptions,
  getVariantOptions,
  useCodeGenSelection,
} from '../use-code-gen-selection';

const mocks = vi.hoisted(() => {
  return {
    mockLanguageList: [
      {
        key: 'js',
        label: 'JavaScript',
        // biome-ignore lint/style/useNamingConvention: <shhhhhhhhhhhhh>
        syntax_mode: 'javascript',
        variants: [{ key: 'fetch', label: 'Fetch' }],
      },
    ],
  };
});

vi.mock('@/app/server-actions/server-actions', () => ({
  getLanguageList: vi.fn().mockResolvedValue(mocks.mockLanguageList),
}));

afterEach(() => {
  vi.clearAllMocks();
});

describe(useCodeGenSelection.name, () => {
  it('should return a list of languages', async () => {
    const { result } = renderHook(() => useCodeGenSelection());

    await waitFor(() => {
      expect(result.current.languages).toEqual(getLanguageOptions(mocks.mockLanguageList));
    });
  });

  it('should return a list of variants', async () => {
    const { result } = renderHook(() => useCodeGenSelection());

    await waitFor(() => {
      expect(result.current.variants).toEqual(getVariantOptions(mocks.mockLanguageList[0]));
    });
  });
});
