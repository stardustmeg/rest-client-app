import { render, screen } from '@testing-library/react';
import { getTranslations } from 'next-intl/server';
import { describe, expect, it } from 'vitest';
import { NotFound } from '@/app/_pages/NotFound';

describe('NotFound', () => {
  it('should renders 404 heading', async () => {
    render(await NotFound());

    expect(screen.getByText('404')).toBeInTheDocument();
  });

  it('should renders translated title', async () => {
    render(await NotFound());

    expect(screen.getByText('title')).toBeInTheDocument();
  });

  it('should renders translated description', async () => {
    render(await NotFound());

    expect(screen.getByText('description')).toBeInTheDocument();
  });

  it(' should renders home link with correct translation', async () => {
    render(await NotFound());

    const link = screen.getByText('link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/');
  });

  it('should calls getTranslations with correct namespace', async () => {
    render(await NotFound());

    expect(getTranslations).toHaveBeenCalledWith('global-not-found');
  });
});
