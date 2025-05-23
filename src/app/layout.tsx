import './globals.css'
import Layout from '@/components/layout/Layout'
import type { Metadata } from 'next'
import { VideoSettingsProvider } from '@/context/VideoSettingsContext'
export const metadata: Metadata = {
  title: 'Cool AI Videos',
  description: 'Generate AI-powered clips in seconds',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <VideoSettingsProvider>
        <Layout>{children}</Layout>
        </VideoSettingsProvider>
      </body>
    </html>
  )
}
