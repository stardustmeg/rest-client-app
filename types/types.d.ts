import type { RoutingLocales } from '@/i18n/routing'
import type messages from '@/app/messages/en.json'

declare module 'next-intl' {
  interface AppConfig {
    Messages: typeof messages
    Locale: RoutingLocales
  }
}

declare module '@chakra-ui/react' {
  interface SystemContext {
    setColorScheme: (colorScheme: ColorScheme) => void;
  }
}
