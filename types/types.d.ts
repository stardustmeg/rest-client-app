import type { MessagesType, RoutingLocales } from '@/i18n/routing'

declare module 'next-intl' {
  interface AppConfig {
    Messages: MessagesType
    Locale: RoutingLocales
  }
}

declare module '@chakra-ui/react' {
  interface SystemContext {
    setColorScheme: (colorScheme: ColorScheme) => void;
  }
}

export type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };
