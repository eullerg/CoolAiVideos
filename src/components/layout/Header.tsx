'use client'

import { HelpCircle, User } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import HelpBubble from '@/components/shared/HelpBubble'

export default function Header() {
  const [showHelp, setShowHelp] = useState(false)

  return (
    <>
      {/* ---------------- MOBILE ( < 640 px ) ---------------- */}
      <header className="mb-6 sm:hidden">
        {/* linha 1 – título + usuário + créditos */}
        <div className="flex items-start justify-between">
          <h1 className="text-xl font-bold">Cooking</h1>

          <div className="flex items-center gap-3">
            <User size={18} className="text-turquoise" />
            <Button className="px-3 py-1 text-xs bg-gradient-to-r from-turquoise to-neonpurple">
              BUY&nbsp;CREDITS
            </Button>
          </div>
        </div>

        {/* linha 2 – pill central */}
        <button
          onClick={() => setShowHelp(true)}
          className="mx-auto mt-4 flex items-center gap-2 px-4 py-2 rounded-full text-sm
                     backdrop-blur-xl bg-white/5 border border-white/10 hover:bg-white/10"
        >
          <HelpCircle size={14} className="text-turquoise" />
          Need&nbsp;a&nbsp;hand?
        </button>
      </header>

      {/* ---------------- DESKTOP / TABLET ( ≥ 640 px ) ---------------- */}
      <header className="hidden sm:flex relative items-start justify-between mb-8">
        <h1 className="text-2xl font-bold">Cooking</h1>

        {/* pill central */}
        <button
          onClick={() => setShowHelp(true)}
          className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 px-5 py-2
                     rounded-full backdrop-blur-xl bg-white/5 border border-white/10 hover:bg-white/10"
        >
          <HelpCircle size={16} className="text-turquoise" />
          Need&nbsp;a&nbsp;hand?
        </button>

        {/* usuário + botão empilhado */}
        <div className="flex flex-col items-end gap-2">
          <div className="flex items-center gap-2">
            <User size={18} className="text-turquoise" />
            <span className="text-sm">username@example.com</span>
          </div>

          <Button className="bg-gradient-to-r from-turquoise to-neonpurple hover:shadow-lg hover:shadow-turquoise/40">
            BUY&nbsp;CREDITS
          </Button>
        </div>
      </header>

      {showHelp && <HelpBubble onClose={() => setShowHelp(false)} />}
    </>
  )
}
