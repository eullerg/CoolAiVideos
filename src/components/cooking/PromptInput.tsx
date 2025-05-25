'use client'

import { ArrowUp, Settings2, Zap } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import GenerationOptions from '@/components/shared/GenerationOptions'
import { useVideoSettings } from '@/context/VideoSettingsContext'
import { extraCredits } from '@/lib/credits'

type Mode = 'agent' | 'script'
type Quality = 'standard' | 'ultra'

export default function PromptInput({
  onSubmit,
  isLoading,
}: {
  onSubmit: (prompt: string, quality: Quality) => void
  isLoading: boolean
}) {
  const [prompt, setPrompt] = useState('')
  const [mode, setMode] = useState<Mode>('agent')
  const [quality, setQuality] = useState<Quality>('standard')
  const [openOptions, setOpenOptions] = useState(false)

  const { duration } = useVideoSettings()

  /* ---------- créditos ---------- */
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

  /* ---------- handlers ---------- */
  const handleChange = (txt: string) => {
    if (mode === 'agent' && txt.length > 200) return
    setPrompt(txt)
  }

  const toggleTurbo = () =>
    setQuality((q) => (q === 'ultra' ? 'standard' : 'ultra'))

  /* ---------- UI ---------- */
  return (
    <>
      {/* CARD */}
      <div className="rounded-2xl overflow-hidden backdrop-blur-xl bg-white/5 shadow-lg border border-white/10">
        {/* Tabs */}
        <div className="flex border-b border-white/10">
          {([
            ['agent', 'Agent mode'],
            ['script', 'Script mode'],
          ] as [Mode, string][]).map(([key, label]) => (
            <button
              key={key}
              onClick={() => {
                setMode(key)
                setPrompt('')
              }}
              className={cn(
                'flex-1 py-3 text-center transition text-sm sm:text-base',
                mode === key
                  ? 'bg-white/10 text-turquoise font-medium'
                  : 'hover:bg-white/5',
              )}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Textarea */}
        <div className="relative">
          <textarea
            value={prompt}
            onChange={(e) => handleChange(e.target.value)}
            onFocus={() =>
              typeof window !== 'undefined' &&
              window.dispatchEvent(new Event('triggerUpsell'))
            }
            placeholder={
              mode === 'agent'
                ? 'Write a short idea (max 200 chars)…'
                : 'Describe the full script, style, voice…'
            }
            className="
              w-full min-h-[180px] sm:min-h-[200px]
              bg-transparent focus:outline-none resize-none
              overflow-y-auto
              pb-14 pr-20
              p-4
            "
            disabled={isLoading}
          />

          {/* Counter */}
          <p className="absolute bottom-4 left-4 text-xs text-white/80 bg-neutral-900/80 backdrop-blur-sm px-2 py-1 rounded">
            {prompt.length} characters
            {prompt.length > 0 && creditLabel()}
          </p>

          {/* Submit */}
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

      {/* AUX BUTTONS */}
      <div className="mt-4 flex gap-3 w-full">
        <button
          onClick={toggleTurbo}
          className={cn(
            'flex-1 sm:w-auto flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-medium',
            quality === 'ultra'
              ? 'bg-gradient-to-r from-neonpurple to-turquoise shadow-lg shadow-neonpurple/40'
              : 'bg-white/5 border border-white/10 hover:bg-white/10',
          )}
        >
          <Zap size={18} className="shrink-0" />
          {quality === 'ultra' ? 'Turbo ON (Ultra)' : 'Turbo OFF'}
        </button>

        {/* Options (desktop) */}
        <button
          onClick={() => setOpenOptions(true)}
          className="hidden sm:flex items-center justify-center p-3 rounded-xl
                     bg-white/5 border border-white/10 hover:bg-white/10 transition"
          aria-label="Generation options"
        >
          <Settings2 size={20} />
        </button>
      </div>

      {/* Options (mobile) */}
      <button
        onClick={() => setOpenOptions(true)}
        className="sm:hidden mt-3 w-full py-3 rounded-xl flex items-center justify-center
                   bg-white/5 border border-white/10 hover:bg-white/10 transition"
      >
        <Settings2 size={20} />
        <span className="ml-2 text-sm">Options</span>
      </button>

      {/* Sheet */}
      {openOptions && <GenerationOptions onClose={() => setOpenOptions(false)} />}
    </>
  )
}
