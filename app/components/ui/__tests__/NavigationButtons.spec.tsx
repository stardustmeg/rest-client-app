import type { PropsWithChildren } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import { TestProviders } from '@/app/__tests__/utils';
import { type ButtonListType, NavigationButtons } from '@/app/components/ui/NavigationButtons';

vi.mock('@/i18n/routing', () => ({
  // biome-ignore lint/style/useNamingConvention: <because>
  Link: ({ children, href }: PropsWithChildren<{ href: string }>) => <a href={href}>{children}</a>,
}));

describe('NavigationButtons (server)', () => {
  const types: ButtonListType[] = ['authButtons', 'navigationButtons'];

  it.each(types)('renders all %s buttons', () => {
    const element = NavigationButtons();

    const html = renderToStaticMarkup(<TestProviders>{element}</TestProviders>);

    expect(html).toContain('<button');
    expect(html.length).toBeGreaterThan(0);
  });
});
