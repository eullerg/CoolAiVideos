'use client'

import Image from 'next/image'
import { Geist_Mono } from 'next/font/google'
import { useState, useEffect, useCallback } from 'react'
import { cn } from '@/lib/utils'
import { useCredits } from '@/context/CreditContext'

const mono = Geist_Mono({ subsets: ['latin'], weight: ['400', '700'] })

export default function MobileUpsellModal() {
  const { credits } = useCredits()
  const [show, setShow] = useState(false)

  const maybeShow = useCallback(() => {
    if (credits < 20 && !sessionStorage.getItem('upsellShown')) {
      setShow(true)
    }
  }, [credits])

  useEffect(() => {
    maybeShow()
  }, [maybeShow])

  useEffect(() => {
    const handler = () => maybeShow()
    window.addEventListener('triggerUpsell', handler)
    return () => window.removeEventListener('triggerUpsell', handler)
  }, [maybeShow])

  const handleClose = () => {
    sessionStorage.setItem('upsellShown', 'yes')
    setShow(false)
  }

  if (!show) return null

  return (
    <div className="fixed inset-0 z-[80] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-sm rounded-2xl bg-neutral-950 overflow-hidden">
        <div className="relative h-56">
          <Image src="/Pan2.0.png" alt="promo" fill className="object-cover" />
          <button
            onClick={handleClose}
            className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center"
          >
            ✕
          </button>
        </div>

        <div className="p-6 pb-4">
          <h3 className={cn('text-white text-lg font-bold mb-4', mono.className)}>
            Get Unlimited&nbsp;Access
          </h3>

          <ul className="text-white/80 text-sm space-y-2 mb-6 list-disc list-inside">
            <li>Fast processing</li>
            <li>Unlimited video creation</li>
            <li>Exclusive quality</li>
          </ul>

          <div className="space-y-3">
            {[
              { title: 'Special offer', sub: '100 Credits', price: '$19.99' },
              { title: 'Best deal',   sub: '500 Credits', price: '$49.99' },
            ].map((p) => (
              <button
                key={p.title}
                className="w-full text-left bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-4"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">{p.title}</p>
                    <p className="text-xs text-white/60">{p.sub}</p>
                  </div>
                  <p className="font-medium">{p.price}</p>
                </div>
              </button>
            ))}
          </div>

          <button
            onClick={handleClose}
            className="mt-6 w-full py-3 rounded-xl bg-gradient-to-r from-turquoise to-neonpurple font-medium"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  )
}
