'use client'
import { HelpCircle, User } from 'lucide-react'
import { useState } from 'react'
import VideoGrid from '@/components/shared/VideoGrid'
import HelpBubble from '@/components/shared/HelpBubble'
import { Button } from '@/components/ui/button'

export default function LibraryPage() {
  const [showHelp, setShowHelp] = useState(false)

  return (
    <div className="w-full min-h-screen px-4 py-6 md:px-8">
    {/* ---------- Header ---------- */}
    <header className="relative flex items-start justify-between mb-8">
      <h1 className="text-2xl font-bold">Library</h1>

      {/* central pill */}
      <button
        onClick={() => setShowHelp(true)}
        className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 px-5 py-2 rounded-full backdrop-blur-xl bg-white/5 border border-white/10 hover:bg-white/10"
      >
        <HelpCircle size={16} className="text-turquoise" />
        Need a hand?
      </button>

      {/* ícone + e-mail  ⤵︎ botão */}
      <div className="flex flex-col items-end gap-2">
        <div className="flex items-center gap-2">
          <User size={18} className="text-turquoise" />
          <span className="hidden sm:inline text-sm">
            username@example.com
          </span>
        </div>

        <Button className="bg-gradient-to-r from-turquoise to-neonpurple hover:shadow-lg hover:shadow-turquoise/40">
          BUY CREDITS
        </Button>
      </div>
    </header>

      {/* ---------- Body ---------- */}
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3">Saved videos</h2>
          <p className="text-white/70 text-sm">
            Your videos are stored for 30 days. Download or save them permanently
            before they expire.
          </p>
        </div>

        <VideoGrid heading="Saved videos" />
      </div>

      {showHelp && <HelpBubble onClose={() => setShowHelp(false)} />}
    </div>
  )
}
