import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useHighlightSyntax } from '../use-highlight-syntax';

describe(useHighlightSyntax.name, () => {
  it('should return highlighted code', () => {
    const { result } = renderHook(() => useHighlightSyntax('csharp', 'code'));

    expect(result.current).toBe(
      '<pre class="shiki github-dark" style="background-color:#24292e;color:#e1e4e8" tabindex="0"><code><span class="line"><span>code</span></span></code></pre>',
    );
  });
});
