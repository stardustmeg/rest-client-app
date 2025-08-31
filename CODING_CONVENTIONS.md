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
# Naming
## Components

* PascalCase for React components

```tsx
export const NavigationMenu = () => { ... };
export const UserProfileCard = () => { ... };
```
```text
app/
├── components/
│   ├── NavigationMenu.tsx
│   └── UserProfileCard.tsx
└── settings/
    └── page.tsx
```


## Pages (Next.js Routing)

* kebab-case for page files and folders

```text
app/
├── user-profile/
│   ├── page.tsx
│   └── layout.tsx
├── blog-posts/
│   ├── [slug]/
│   │   └── page.tsx
│   └── page.tsx
└── settings/
    └── page.tsx
```

## Folders and Files (non-components)

* kebab-case for directories and non-component files

```text
src/
├── components/
│   └── user-card/
│       └── UserCard.tsx
├── hooks/
│   ├── use-auth.ts
│   └── use-local-storage.ts
└── utils/
    ├── date-formatters.ts
    └── string-utils.ts

```

## Tests

* Filename + .spec.ts(x)

```text
components/
├── ui/
│   ├── __tests__/
│   │   └── Button.spec.tsx
│   └── Button.tsx
├── forms/
│   ├── __tests__/
│   │   └── LoginForm.spec.tsx
│   └── LoginForm.tsx
└── settings/
    └── page.tsx
```

## Examples of Proper Naming

```tsx
// Components - PascalCase
export const DataTable = () => { ... };
export const SidebarNavigation = () => { ... };

// Hooks - camelCase with 'use' prefix
export function useDarkMode() { ... };
export function useFormValidation() { ... };

// Utilities - camelCase
export function generateUniqueId(): string { ... };
export function formatDate(date: Date): string { ... };

// Types - PascalCase
export interface ApiResponse<T> { ... };
export type UserPreferences = { ... };

// Constants - UPPER_SNAKE_CASE
export const MAX_FILE_SIZE = 5 * 1024 * 1024;
export const DEFAULT_TIMEOUT = 30000;
```
