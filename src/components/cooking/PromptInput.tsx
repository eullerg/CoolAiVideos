'use client'

import { ArrowUp, Settings2 } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import GenerationOptions from '@/components/shared/GenerationOptions'
import { useVideoSettings } from '@/context/VideoSettingsContext'
import { extraCredits } from '@/lib/credits'

type Quality = 'ultra' | 'standard' | 'low'

export default function PromptInput({
  onSubmit,
  isLoading,
}: {
  onSubmit: (prompt: string, quality: Quality) => void
  isLoading: boolean
}) {
  const [prompt, setPrompt] = useState('')
  const [quality, setQuality] = useState<Quality>('standard')
  const [openOptions, setOpenOptions] = useState(false)

  const { duration } = useVideoSettings()

  const creditLabel = () => {
    const len = prompt.length
    const base =
      quality === 'ultra'
        ? len <= 400
          ? 10
          : len <= 800
          ? 20
          : 40
        : len <= 400
        ? 2
        : len <= 800
        ? 4
        : 7
    return ` (${base + extraCredits(duration)} credits)`
  }

  return (
    <>
      {/* CARD */}
      <div className="rounded-2xl overflow-hidden backdrop-blur-xl bg-white/5 shadow-lg border border-white/10">
        {/* tabs */}
        <div className="flex border-b border-white/10">
          {([
            ['standard', 'AI Clips'],
            ['ultra', 'Ultra AI Clips'],
            ['low', 'Low AI Clips'],
          ] as [Quality, string][]).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setQuality(key)}
              className={cn(
                'flex-1 py-3 text-center transition text-sm sm:text-base',
                quality === key
                  ? 'bg-white/10 text-turquoise font-medium'
                  : 'hover:bg-white/5',
              )}
            >
              {label}
            </button>
          ))}
        </div>

        {/* textarea */}
        <div className="relative">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe the video you want to create..."
            className="w-full p-4 min-h-[180px] sm:min-h-[200px] bg-transparent focus:outline-none resize-none"
            disabled={isLoading}
          />
          {/* counter */}
          <p className="absolute bottom-4 left-4 text-xs text-white/60">
            {prompt.length} characters
            {prompt.length > 0 && creditLabel()}
          </p>
          {/* submit */}
          <button
            onClick={() => onSubmit(prompt, quality)}
            disabled={!prompt.trim() || isLoading}
            className={cn(
              'absolute bottom-4 right-4 w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center',
              'bg-gradient-to-r from-turquoise to-neonpurple',
              'hover:shadow-lg hover:shadow-turquoise/50 active:scale-95 transition',
              (!prompt.trim() || isLoading) && 'opacity-50 cursor-not-allowed',
            )}
          >
            <ArrowUp size={20} />
          </button>
        </div>
      </div>

      {/* SETTINGS BUTTON — DESKTOP / TABLET */}
      <button
        onClick={() => setOpenOptions(true)}
        className="hidden sm:flex mt-4 items-center justify-center p-3 rounded-full
                   bg-white/5 border border-white/10 hover:bg-white/10 transition"
        aria-label="Generation options"
      >
        <Settings2 size={20} />
      </button>

      {/* SETTINGS BUTTON — MOBILE (full-width, abaixo do card) */}
      <button
        onClick={() => setOpenOptions(true)}
        className="sm:hidden mt-4 w-full py-3 rounded-xl flex items-center justify-center
                   bg-white/5 border border-white/10 hover:bg-white/10 transition"
        aria-label="Generation options"
      >
        <Settings2 size={20} />
        <span className="ml-2 text-sm">Options</span>
      </button>

      {/* sheet */}
      {openOptions && <GenerationOptions onClose={() => setOpenOptions(false)} />}
    </>
  )
}
