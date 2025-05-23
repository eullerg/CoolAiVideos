'use client'
import { useState } from 'react'
import PromptInput from './PromptInput'
import VideoGrid from '@/components/shared/VideoGrid'
import Header from '@/components/layout/Header'

export default function CookingPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [generatedVideo, setGeneratedVideo] = useState<string | null>(null)

  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  const handlePrompt = (_prompt: string, _quality: string) => {
    setIsLoading(true)
    setGeneratedVideo(null)

    setTimeout(() => {
      setIsLoading(false)
      setGeneratedVideo(
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      )
    }, 3000)
  }

  return (
    <div className="w-full min-h-screen px-4 py-6 md:px-8">
      <Header />

      {/* prompt centralizado ↓ */}
      <div className="max-w-3xl mx-auto mt-20 lg:mt-28">
        <PromptInput onSubmit={handlePrompt} isLoading={isLoading} />

        {/* loader e vídeo mantêm a mesma lógica */}
        {isLoading && (
          <div className="mt-8 flex justify-center">
            <span className="w-16 h-16 rounded-full border-4 border-t-turquoise border-r-plexblue border-b-neonpurple border-l-plexblue animate-spin" />
          </div>
        )}

        {generatedVideo && (
          <div className="mt-8 aspect-video rounded-2xl overflow-hidden bg-black">
            <video controls className="w-full h-full" src={generatedVideo} />
          </div>
        )}

        <VideoGrid />
      </div>
    </div>
  )
}