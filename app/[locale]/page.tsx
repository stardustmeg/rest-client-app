import { Loader } from '@chakra-ui/react'
import { useTranslations } from 'next-intl'
import { Suspense } from 'react'

export default function LocalePage() {
  const t = useTranslations('main')

  return (
    <Suspense fallback={<Loader text="Loading..." />}>
      <div>{t('hello')}</div>
    </Suspense>
  )
}
