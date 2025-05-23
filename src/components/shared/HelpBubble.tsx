'use client'
import { X } from 'lucide-react'
import { useState } from 'react'

interface QA {
  q: string
  a: string
}

const qa: QA[] = [
  {
    q: 'How to make a video?',
    a: "It's as easy as push-ups! Type your prompt, pick style, quality & voice, then hit the magic button.",
  },
  {
    q: 'Where do I begin?',
    a: 'Start on the “Cooking” tab, describe your idea, choose a clip tier, and you’re off.',
  },
  {
    q: 'How privacy works?',
    a: 'Your raw prompts are encrypted and videos auto-delete after 30 days unless you save them.',
  },
  {
    q: 'What types of videos can I make?',
    a: 'Short ads, social clips, tutorials, trailers – any 15-90 s story your imagination sparks.',
  },
]

export default function HelpBubble({ onClose }: { onClose: () => void }) {
  const [open, setOpen] = useState<string | null>(null)

  return (
    <div className="fixed bottom-6 right-6 w-80 rounded-2xl overflow-hidden backdrop-blur-xl bg-white/10 border border-white/20 shadow-xl z-50">
      {/* header */}
      <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-turquoise to-neonpurple text-white">
        <p className="font-bold">Help Center</p>
        <button
          onClick={onClose}
          className="p-1 rounded-full hover:bg-white/20 transition"
        >
          <X size={18} />
        </button>
      </div>

      {/* body */}
      <div className="p-4 space-y-3 max-h-[380px] overflow-y-auto">
        {qa.map(({ q, a }) => (
          <div key={q}>
            <button
              onClick={() => setOpen(open === q ? null : q)}
              className="w-full text-left p-3 rounded-lg bg-white/5 hover:bg-white/10 transition flex items-center justify-between"
            >
              <span className="font-medium">{q}</span>
              <span>{open === q ? '−' : '+'}</span>
            </button>
            {open === q && (
              <p className="mt-2 p-3 rounded-lg bg-white/5 text-sm">{a}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
