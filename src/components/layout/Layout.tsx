'use client'

import { useState, useEffect } from 'react'
import Sidebar from '@/components/layout/Sidebar'
import MobileIntro from '@/components/mobile/MobileIntro'
import BottomTabBar from '@/components/mobile/BottomTabBar'
import MobileUpsellModal from '@/components/mobile/MobileUpsellModal'
import { cn } from '@/lib/utils'

export default function Layout({ children }: { children: React.ReactNode }) {
  /* ----------- detecta mobile ----------- */
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 639px)')
    const handler = () => setIsMobile(mq.matches)
    handler()
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  /* ----------- controla intro ------------ */
  const [introSeen, setIntroSeen] = useState(false)

  return (
    <>
      {/* modal de oferta (desktop + mobile) */}
      <MobileUpsellModal />

      {/* intro apenas em mobile */}
      {isMobile && !introSeen && (
        <MobileIntro onFinish={() => setIntroSeen(true)} />
      )}

      {/* layout principal */}
      <div className="flex">
        {!isMobile && <Sidebar />}

        <main
          className={cn(
            isMobile ? 'pb-20 w-full' : 'flex-1 sm:ml-64 px-4 md:px-8 py-6',
          )}
        >
          {children}
        </main>
      </div>

      {/* tab bar só no mobile depois da intro */}
      {isMobile && introSeen && <BottomTabBar />}
    </>
  )
}
