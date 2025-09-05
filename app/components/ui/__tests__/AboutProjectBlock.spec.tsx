import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { TestProviders } from '@/app/__tests__/utils';
import { AboutProjectBlock } from '@/app/components/ui/AboutProjectBlock';

describe('AboutProjectBlock', () => {
  it('renders all project feature cards', async () => {
    const numberOfFields = 6;
    const element = await AboutProjectBlock();
    const html = renderToStaticMarkup(<TestProviders>{element}</TestProviders>);
    const cardMatches = html.match(/features\./g) || [];
    expect(cardMatches.length).toBeGreaterThanOrEqual(numberOfFields);
    expect(html).toContain('features.api.title');
    expect(html).toContain('features.api.description');
    expect(html).toContain('features.history.title');
    expect(html).toContain('features.history.description');
    expect(html).toContain('features.organize.title');
    expect(html).toContain('features.organize.description');
  });

  it('renders headings and text elements correctly', async () => {
    const element = await AboutProjectBlock();
    const html = renderToStaticMarkup(<TestProviders>{element}</TestProviders>);
    expect(html).toMatch(/<h3.*>features\.api\.title<\/h3>/);
    expect(html).toMatch(/<h3.*>features\.history\.title<\/h3>/);
    expect(html).toMatch(/<h3.*>features\.organize\.title<\/h3>/);
    expect(html).toContain('features.api.description');
    expect(html).toContain('features.history.description');
    expect(html).toContain('features.organize.description');
  });
});
