import { render } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, type Mock, vi } from 'vitest';
import { TestProviders } from '@/app/__tests__/utils';
import { VariablesLocalStoragePersistence } from '@/app/domains/variables/components/VariablesLocalStoragePersistence';
import {
  useVariablesContext,
  VariablesProvider,
} from '@/app/domains/variables/components/VariablesProvider';
import { useAuth } from '@/app/hooks/use-auth';
import { getFullKey } from '@/app/hooks/use-local-storage2';
import { useToast } from '@/app/hooks/use-toast';

vi.mock('@/app/hooks/use-auth');
vi.mock('./VariablesProvider');
vi.mock('@/app/hooks/use-toast');

describe('VariablesSaver', () => {
  const dispatch = vi.fn();
  const error = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useVariablesContext as Mock).mockReturnValue({
      variables: [],
      dispatch,
    });
    (useToast as Mock).mockReturnValue({ error });
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should not render InnerSaver when userId is null', () => {
    (useAuth as Mock).mockReturnValue({ userId: null });
    const { container } = render(
      <TestProviders>
        <VariablesProvider>
          <VariablesLocalStoragePersistence />
        </VariablesProvider>
      </TestProviders>,
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('should load variables from localStorage on mount', () => {
    const savedVariables = [{ id: 'v1', value: '123' }];
    localStorage.setItem(getFullKey('user-1:variables'), JSON.stringify(savedVariables));

    (useAuth as Mock).mockReturnValue({ userId: 'user-1' });
    (useVariablesContext as Mock).mockReturnValue({
      variables: [],
      dispatch,
    });

    render(
      <TestProviders>
        <VariablesProvider>
          <VariablesLocalStoragePersistence />
        </VariablesProvider>
      </TestProviders>,
    );

    expect(dispatch).toHaveBeenCalledWith({ type: 'SET', payload: savedVariables });
  });

  it('should save variables to localStorage when variables change', () => {
    (useAuth as Mock).mockReturnValue({ userId: 'user-1' });
    (useVariablesContext as Mock).mockReturnValue({
      variables: [{ id: 'v2', value: 'abc' }],
      dispatch,
    });

    render(
      <TestProviders>
        <VariablesProvider>
          <VariablesLocalStoragePersistence />
        </VariablesProvider>
      </TestProviders>,
    );
    const stored = JSON.parse(localStorage.getItem(getFullKey('user-1:variables')) || '[]');
    expect(stored).toEqual([{ id: 'v2', value: 'abc' }]);
  });
});
