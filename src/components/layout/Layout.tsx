'use client'

import { useState, useEffect } from 'react'
import Sidebar from '@/components/layout/Sidebar'
import MobileIntro from '@/components/mobile/MobileIntro'
import BottomTabBar from '@/components/mobile/BottomTabBar'
import MobileUpsellModal from '@/components/mobile/MobileUpsellModal'
import { cn } from '@/lib/utils'

export default function Layout({ children }: { children: React.ReactNode }) {
  /* ---------- viewport detection ---------- */
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 639px)')
    const handle = () => setIsMobile(mq.matches)
    handle()
    mq.addEventListener('change', handle)
    return () => mq.removeEventListener('change', handle)
  }, [])

  /* ---------- mobile intro control -------- */
  const [introSeen, setIntroSeen] = useState(false)

  useEffect(() => {
    if (!isMobile) setIntroSeen(true) // desktop não precisa da intro
  }, [isMobile])

  return (
    <>
      {/* Upsell modal (decide internamente se mostra) */}
      <MobileUpsellModal />

      {/* Mobile Intro */}
      {isMobile && !introSeen && (
        <MobileIntro onFinish={() => setIntroSeen(true)} />
      )}

      {/* Wrapper flex: Sidebar + main */}
      <div className="flex">
        {/* Desktop sidebar */}
        {!isMobile && <Sidebar />}

        {/* Conteúdo principal */}
        <main
          className={cn(
            isMobile ? 'pb-20 w-full' : 'flex-1 sm:ml-64 px-4 md:px-8 py-6',
          )}
        >
          {children}
        </main>
      </div>

      {/* Bottom tab bar (mobile) */}
      {isMobile && introSeen && <BottomTabBar />}
    </>
  )
}
