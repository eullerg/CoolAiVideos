'use client'

import { useState } from 'react'
import VideoGrid from '@/components/shared/VideoGrid'
import HelpBubble from '@/components/shared/HelpBubble'
import Header from '@/components/layout/Header'
import { Geist, Geist_Mono } from 'next/font/google'
import { cn } from '@/lib/utils'

/* fontes */
const geist = Geist({ subsets: ['latin'], weight: ['400', '500', '700'] })
const mono  = Geist_Mono({ subsets: ['latin'], weight: ['400', '700'] })

/* ----- MOCK: vídeos salvos pelo usuário (trocar por API) ----- */
const savedVideos = [
  {
    id: 201,
    title: 'My Sci-Fi Trailer',
    thumbnail:
      'https://images.unsplash.com/photo-1522199710521-72d69614c702?auto=format&fit=crop&w=800&q=80',
    duration: '0:26',
    author: 'you',
    date: 'Today',
  },
  {
    id: 202,
    title: 'Coffee Ad Concept',
    thumbnail:
      'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=800&q=80',
    duration: '0:19',
    author: 'you',
    date: 'Yesterday',
  },
]

export default function LibraryPage() {
  const [showHelp, setShowHelp] = useState(false)

  return (
    <div className={cn(geist.className, 'w-full min-h-screen px-4 py-6 md:px-8')}>
      {/* ---------- Cabeçalho reutilizado ---------- */}
      <Header />

      {/* ---------- Conteúdo ---------- */}
      <div className={cn(mono.className, 'max-w-6xl mx-auto mt-20 lg:mt-28')}>
        {/* Saved videos */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-3">Saved videos</h2>
          <p className="text-white/70 text-sm mb-6">
            Your videos are stored for 7&nbsp;days. Download or save them permanently
            before they expire.
          </p>

          <VideoGrid videos={savedVideos} heading="Recent videos" />
        </div>

        {/* Week Hall of Fame */}
        <VideoGrid heading="Week Hall of Fame" />
      </div>

      {showHelp && <HelpBubble onClose={() => setShowHelp(false)} />}
    </div>
  )
}
