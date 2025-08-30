'use client'

import { Button } from '@chakra-ui/react'
import Image from 'next/image'
import type { JSX } from 'react'
import { RxMagicWand } from 'react-icons/rx'
import { ColorModeButton } from '@/components/ui/color-mode'
import { toaster } from '@/components/ui/toaster'
import { Tooltip } from '@/components/ui/tooltip'

export default function Home(): JSX.Element {
  const handleButtonClick = () => {
    toaster.create({
      title: 'Congrats! You are a fish',
      type: 'success',
      duration: 3000,
      closable: true,
    })
  }
  return (
    <div className="flex min-h-screen flex-col place-content-center gap-10">
      <div className="fixed top-4 right-4 z-10">
        <ColorModeButton />
      </div>

      <main className="flex place-content-center">
        <div className="flex flex-col items-center gap-[32px] sm:items-start">
          <h1 className="font-bold text-4xl text-emerald-700 dark:text-blue-400">No No No Mister Fish</h1>

          <Tooltip content="Click Me" showArrow>
            <Button onClick={handleButtonClick} colorPalette="green" size="lg" variant="surface">
              Click Me! <RxMagicWand />
            </Button>
          </Tooltip>
        </div>
      </main>
      <footer className="mb-6 flex flex-wrap place-content-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://app.rs.school/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image aria-hidden src="/file.svg" alt="File icon" width={16} height={16} />
          RS App
        </a>
      </footer>
    </div>
  )
}
