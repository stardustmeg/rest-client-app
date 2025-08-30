import Image from 'next/image'
import type { JSX } from 'react'

export default function Home(): JSX.Element {
  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-sans sm:p-20">
      <main className="row-start-2 flex flex-col items-center gap-[32px] sm:items-start">
        <h1 className="font-bold text-4xl text-emerald-700">No No No Mister Fish</h1>
      </main>
      <footer className="row-start-3 flex flex-wrap items-center justify-center gap-[24px]">
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
