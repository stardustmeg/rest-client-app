/** biome-ignore-all lint/style/noMagicNumbers: <tests> */
import { describe, expect, it } from 'vitest';
import { Link, redirect, routing, usePathname, useRouter } from '../routing';

describe('routing configuration', () => {
  describe('routing.locales', () => {
    it('includes all expected locales', () => {
      expect(routing.locales).toEqual(['en', 'ru', 'jp']);
    });

    it('has correct number of locales', () => {
      expect(routing.locales).toHaveLength(3);
    });
  });

  describe('routing.defaultLocale', () => {
    it('sets English as the default locale', () => {
      expect(routing.defaultLocale).toBe('en');
    });

    it('default locale is included in locales array', () => {
      expect(routing.locales).toContain(routing.defaultLocale);
    });
  });
});

describe('Type definitions', () => {
  it('RoutingLocales type includes all locales', () => {
    const locales: (typeof routing.locales)[number][] = ['en', 'ru', 'jp'];

    locales.forEach((locale) => {
      expect(routing.locales).toContain(locale);
    });
  });
});

describe('Navigation exports', () => {
  describe('Link component', () => {
    it('is exported from createNavigation', () => {
      expect(Link).toBeDefined();
    });
  });

  describe('redirect function', () => {
    it('is exported as a function', () => {
      expect(typeof redirect).toBe('function');
    });
  });

  describe('usePathname hook', () => {
    it('is exported as a function', () => {
      expect(typeof usePathname).toBe('function');
    });
  });

  describe('useRouter hook', () => {
    it('is exported as a function', () => {
      expect(typeof useRouter).toBe('function');
    });
  });

  it('all navigation functions are exported', () => {
    expect(Link).toBeDefined();
    expect(redirect).toBeDefined();
    expect(usePathname).toBeDefined();
    expect(useRouter).toBeDefined();
  });
});

describe('Integration with next-intl', () => {
  it('routing object has required properties', () => {
    expect(routing).toHaveProperty('locales');
    expect(routing).toHaveProperty('defaultLocale');
    expect(Array.isArray(routing.locales)).toBe(true);
    expect(typeof routing.defaultLocale).toBe('string');
  });

  it('locales array contains valid locale strings', () => {
    routing.locales.forEach((locale) => {
      expect(typeof locale).toBe('string');
      expect(locale.length).toBeGreaterThan(0);
      expect(locale.length).toBeLessThanOrEqual(3);
    });
  });

  it('default locale is a valid string', () => {
    expect(typeof routing.defaultLocale).toBe('string');
    expect(routing.defaultLocale.length).toBeGreaterThan(0);
  });

  it('routing configuration maintains consistent structure', () => {
    expect(routing.locales).toBeInstanceOf(Array);
    expect(routing.locales).toHaveLength(3);
    expect(typeof routing.defaultLocale).toBe('string');

    const uniqueLocales = [...new Set(routing.locales)];
    expect(uniqueLocales).toHaveLength(routing.locales.length);
  });
});
