import type { routing } from '@/i18n/routing'
import type messages from './messages/en.json'

declare module 'next-intl' {
  interface AppConfig {
    Messages: typeof messages
    Locale: (typeof routing.locales)[number]
  }
}
