import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { cn } from '@/lib/utils'
import type { Metadata } from 'next'
import { Newsreader } from 'next/font/google'
import type { PropsWithChildren } from 'react'
import './globals.css'

const newsreader = Newsreader({
  subsets: ['latin'],
  variable: '--font-newsreader',
})

export const metadata: Metadata = {
  title: 'Parish Website',
  description: 'A modern parish website built with Next.js'
}

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body
        className={cn(
          inter.className,
          'bg-background text-foreground min-h-screen m-0 p-0 min-w-screen'
        )}
      >
        <div className="mx-auto flex min-h-screen flex-col font-serif selection:bg-foreground selection:p-2 selection:text-background">
          <Header />
          <main className="mx-auto w-full max-w-3xl grow px-2">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
