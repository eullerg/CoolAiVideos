'use client'

import { X } from 'lucide-react'
import { useVideoSettings } from '@/context/VideoSettingsContext'
import Image from 'next/image'
import { extraCredits } from '@/lib/credits'

export default function GenerationOptions({ onClose }: { onClose: () => void }) {
  const {
    voice,
    duration,
    ratio,
    style,
    setVoice,
    setDuration,
    setRatio,
    setStyle,
  } = useVideoSettings()

  const voices = [
    { id: 'luffy', name: 'Luffy', img: '/avatars/luffy.png' },
    { id: 'ichigo', name: 'Ichigo', img: '/avatars/ichigo.png' },
    { id: 'nara', name: 'Nara', img: '/avatars/nara.png' },
  ] as const

  return (
    /* -------------------------------------------------------------------- */
    /* wrapper — side-sheet (≥ sm) ou bottom-sheet (mobile)                 */
    /* -------------------------------------------------------------------- */
    <div className="fixed inset-0 z-50 bg-black/40 flex sm:justify-end items-end sm:items-stretch">
      <div
        className="
          w-full sm:max-w-sm bg-neutral-950 shadow-xl overflow-y-auto
          p-6 sm:h-full
          rounded-t-2xl sm:rounded-none
          max-h-[85vh] sm:max-h-none
        "
      >
        {/* header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg sm:text-xl font-semibold">Generation Options</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* ------------------- Voices ------------------- */}
        <section className="mb-8">
          <h3 className="font-medium mb-3">Voice</h3>
          <div className="flex gap-4">
            {voices.map((v) => (
              <button
                key={v.id}
                onClick={() => setVoice(v.id)}
                className={`flex flex-col items-center gap-1 ${
                  voice === v.id ? 'text-turquoise' : 'text-white/70'
                }`}
              >
                <div
                  className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 ${
                    voice === v.id ? 'border-turquoise' : 'border-transparent'
                  }`}
                >
                  <Image
                    src={v.img}
                    alt={v.name}
                    width={64}
                    height={64}
                    className="object-cover"
                  />
                </div>
                <span className="text-xs sm:text-sm">{v.name}</span>
              </button>
            ))}
          </div>
        </section>

        {/* ------------------ Duration ------------------ */}
        <section className="mb-8">
          <h3 className="font-medium mb-3">
            Duration <span className="text-white/60">({duration}s)</span>
          </h3>
          <input
            type="range"
            min={5}
            max={60}
            step={1}
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            className="w-full accent-neonpurple"
          />
          <p className="text-xs mt-1 text-white/60">
            Extra credits: +{extraCredits(duration)}
          </p>
        </section>

        {/* ---------------- Aspect Ratio ---------------- */}
        <section className="mb-8">
          <h3 className="font-medium mb-3">Aspect Ratio</h3>
          <div className="grid grid-cols-3 gap-3">
            {(['16:9', '9:16', '1:1'] as const).map((r) => (
              <button
                key={r}
                onClick={() => setRatio(r)}
                className={`py-2 rounded-xl ${
                  ratio === r
                    ? 'bg-white/10 text-turquoise'
                    : 'bg-white/5 hover:bg-white/10'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </section>

        {/* -------------------- Style ------------------- */}
        <section>
          <h3 className="font-medium mb-3">Style</h3>
          <div className="grid grid-cols-2 gap-3">
            {(['realistic', 'cartoon', '3d', 'anime'] as const).map((s) => (
              <button
                key={s}
                onClick={() => setStyle(s)}
                className={`py-2 rounded-xl capitalize ${
                  style === s
                    ? 'bg-white/10 text-turquoise'
                    : 'bg-white/5 hover:bg-white/10'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
