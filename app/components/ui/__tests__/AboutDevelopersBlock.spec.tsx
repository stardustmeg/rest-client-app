import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { TestProviders } from '@/app/__tests__/utils';
import { AboutDevelopersBlock } from '@/app/components/ui/AboutDevelopersBlock';

describe('AboutDevelopersBlock', () => {
  it('renders all developer cards', async () => {
    const numberOfFields = 9;
    const element = await AboutDevelopersBlock();

    const html = renderToStaticMarkup(<TestProviders>{element}</TestProviders>);

    const cardMatches = html.match(/developers\./g) || [];
    expect(cardMatches.length).toBeGreaterThanOrEqual(numberOfFields);

    expect(html).toContain('developers.stardustmeg.author');
    expect(html).toContain('developers.ripetchor.author');
    expect(html).toContain('developers.zagorky.author');

    expect(html).toContain('https://avatars.githubusercontent.com/u/146496794?v=4');
    expect(html).toContain('https://avatars.githubusercontent.com/u/115036520?v=4');
    expect(html).toContain('https://avatars.githubusercontent.com/u/156232667?v=4');
  });

  it('renders roles and descriptions', async () => {
    const element = await AboutDevelopersBlock();
    const html = renderToStaticMarkup(<TestProviders>{element}</TestProviders>);

    expect(html).toContain('developers.stardustmeg.role');
    expect(html).toContain('developers.ripetchor.role');
    expect(html).toContain('developers.zagorky.role');

    expect(html).toContain('developers.stardustmeg.description');
    expect(html).toContain('developers.ripetchor.description');
    expect(html).toContain('developers.zagorky.description');
  });
});
