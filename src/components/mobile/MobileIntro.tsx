'use client'
import Image from 'next/image'
import { Geist_Mono, Geist } from 'next/font/google'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

const mono = Geist_Mono({ subsets: ['latin'], weight: ['400', '700'] })
const geist = Geist({ subsets: ['latin'], weight: '500' })

export default function MobileIntro({
  onFinish,
}: {
  onFinish: () => void
}) {
  const [hidden, setHidden] = useState(false)

  // animação CSS depois do click
  useEffect(() => {
    if (hidden) {
      const t = setTimeout(onFinish, 400) // 400ms = duração da transição
      return () => clearTimeout(t)
    }
  }, [hidden, onFinish])

  return (
    <div
      className={cn(
        'fixed inset-0 z-[70] flex flex-col',
        'transition-transform duration-500',
        hidden && '-translate-y-full',
      )}
    >
      {/* imagem topo */}
      <div className="relative flex-1">
        <Image
          src="/Pan2.0Mobile.png"
          alt="Pan 2.0 hero"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* textos */}
      <div className="bg-gradient-to-b from-neutral-900 via-neutral-950 to-neutral-950 p-6 pb-24">
        <p className={cn('text-white/70 text-xs mb-1', mono.className)}>
          Welcome to CoolAIVideos
        </p>

        <h1 className={cn('text-3xl font-bold text-white mb-2', mono.className)}>
          Create text&nbsp;to&nbsp;video
        </h1>

        <p className={cn('text-white/60 text-sm mb-6', mono.className)}>
          Use text to create unlimited ideas in exclusive quality and performance
        </p>

        <button
          onClick={() => {
            /* dispara o evento que o modal escuta */
            if (typeof window !== 'undefined') {
              window.dispatchEvent(new Event('triggerUpsell'))
            }
            /* inicia animação para esconder a intro */
            setHidden(true)
          }}
          className={cn(
            'w-full py-3 rounded-xl text-center text-neutral-900',
            'bg-gradient-to-r from-turquoise to-neonpurple',
            geist.className,
          )}
        >
          let the adventure begins
        </button>
      </div>
    </div>
  )
}
