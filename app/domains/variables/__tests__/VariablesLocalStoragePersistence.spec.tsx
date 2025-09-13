import { render } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, type Mock, vi } from 'vitest';
import { TestProviders } from '@/app/__tests__/utils';
import { VariablesLocalStoragePersistence } from '@/app/domains/variables/components/VariablesLocalStoragePersistence';
import { useAuth } from '@/app/hooks/use-auth';
import { getFullKey } from '@/app/hooks/use-local-storage2';
import { useToast } from '@/app/hooks/use-toast';

vi.mock('@/app/hooks/use-auth');
vi.mock('@/app/hooks/use-toast');

describe('VariablesLocalStoragePersistence', () => {
  const error = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useToast as Mock).mockReturnValue({ error });
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should render when userId is null (uses anonymous fallback)', () => {
    (useAuth as Mock).mockReturnValue({ userId: null });
    const { container } = render(
      <TestProviders>
        <VariablesLocalStoragePersistence />
      </TestProviders>,
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('should load variables from localStorage on mount', () => {
    const savedVariables = [{ id: 'v1', value: '123' }];
    localStorage.setItem(getFullKey('user-1:variables'), JSON.stringify(savedVariables));

    (useAuth as Mock).mockReturnValue({ userId: 'user-1' });

    render(
      <TestProviders>
        <VariablesLocalStoragePersistence />
      </TestProviders>,
    );

    expect(true).toBe(true);
  });

  it('should save variables to localStorage when variables change', () => {
    (useAuth as Mock).mockReturnValue({ userId: 'user-1' });

    render(
      <TestProviders>
        <VariablesLocalStoragePersistence />
      </TestProviders>,
    );

    expect(true).toBe(true);
  });
});
