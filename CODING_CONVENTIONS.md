# FISH CODING CONVENTIONS

## Functions

* React Components - arrow functions

```tsx
export const Foo = () => {
  return <div>Foo</div>
}
```

* Hooks - function declaration

```tsx
export function Foo() {
  return <div>Foo</div>
}
```

* Utils - function declaration

```tsx
export function Foo() {
  return <div>Foo</div>
}
```

## Types

* Explicit return types - always (except for react components)

```tsx
export const Foo = () => {
  return <div>Foo</div>
};

function Foo(a: number, b: string): string {
  return `${a} ${b}`;
}
```

* Library types - use [Library].type names

```tsx
export interface TooltipProps extends ChakraTooltip.RootProps {
  content: React.ReactNode;
  contentProps?: ChakraTooltip.ContentProps;
  disabled?: boolean;
}
```

## Imports

* Import specific items from libraries

```tsx
import { Button } from '@chakra-ui/react';
import { forwardRef } from 'react';
```
