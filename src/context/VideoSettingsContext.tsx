'use client'
import { createContext, useContext, useState, ReactNode } from 'react'

type Voice = 'luffy' | 'ichigo' | 'nara'
type Ratio = '16:9' | '9:16' | '1:1'
type Style = 'realistic' | 'cartoon' | '3d' | 'anime'

interface Settings {
  voice: Voice
  duration: number        // segundos
  ratio: Ratio
  style: Style
}

interface Ctx extends Settings {
  setVoice: (v: Voice) => void
  setDuration: (n: number) => void
  setRatio: (r: Ratio) => void
  setStyle: (s: Style) => void
}

const defaultValue: Settings = {
  voice: 'luffy',
  duration: 5,
  ratio: '16:9',
  style: 'realistic',
}

const VideoSettingsContext = createContext<Ctx | null>(null)

export function useVideoSettings() {
  const ctx = useContext(VideoSettingsContext)
  if (!ctx) throw new Error('VideoSettingsContext not found')
  return ctx
}

export function VideoSettingsProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState(defaultValue)

  const value: Ctx = {
    ...state,
    setVoice: (v) => setState((s) => ({ ...s, voice: v })),
    setDuration: (n) => setState((s) => ({ ...s, duration: n })),
    setRatio: (r) => setState((s) => ({ ...s, ratio: r })),
    setStyle: (st) => setState((s) => ({ ...s, style: st })),
  }

  return (
    <VideoSettingsContext.Provider value={value}>
      {children}
    </VideoSettingsContext.Provider>
  )
}
