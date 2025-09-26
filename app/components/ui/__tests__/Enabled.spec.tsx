import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Enabled } from '../Enabled';

vi.mock('@/app/feature-flags', () => ({
  enabled: vi.fn().mockReturnValue(true),
}));

describe('Enabled', () => {
  it('should render children when feature is enabled', async () => {
    const { enabled } = await import('@/app/feature-flags');
    vi.mocked(enabled).mockReturnValue(true);

    render(
      <Enabled feature="variables">
        <div>Feature content</div>
      </Enabled>,
    );

    expect(screen.getByText('Feature content')).toBeInTheDocument();
  });

  it('should not render children when feature is disabled', async () => {
    const { enabled } = await import('@/app/feature-flags');
    vi.mocked(enabled).mockReturnValue(false as unknown as true);

    render(
      <Enabled feature="restClient">
        <div>Feature content</div>
      </Enabled>,
    );

    expect(screen.queryByText('Feature content')).not.toBeInTheDocument();
  });

  it('should call enabled function with correct feature flag', async () => {
    const { enabled } = await import('@/app/feature-flags');
    vi.mocked(enabled).mockReturnValue(true);

    render(
      <Enabled feature="languageSelect">
        <div>Content</div>
      </Enabled>,
    );

    expect(vi.mocked(enabled)).toHaveBeenCalledWith('languageSelect');
  });
});
