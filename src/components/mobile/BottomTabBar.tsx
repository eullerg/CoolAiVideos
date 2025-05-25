'use client'

import { usePathname, useRouter } from 'next/navigation'
import { ChefHat, MonitorPlay, Star } from 'lucide-react'
import { useState, useEffect } from 'react'

type Tab = 'cooking' | 'library' | 'hall'

export default function BottomTabBar() {
  const pathname = usePathname()
  const router   = useRouter()

  /* -------- estado ativo (sincroniza com pathname) -------- */
  const [tab, setTab] = useState<Tab>(() => {
    if (pathname === '/library') return 'library'
    if (pathname === '/halloffame') return 'hall'
    return 'cooking'
  })

  /* atualiza quando usuário navega por push() */
  useEffect(() => {
    if (pathname === '/library') setTab('library')
    else if (pathname === '/halloffame') setTab('hall')
    else setTab('cooking')
  }, [pathname])

  /* navegação */
  const go = (t: Tab) => {
    setTab(t)
    if (t === 'hall') {
      router.push('/halloffame')
      return
    }
    router.push(t === 'library' ? '/library' : '/')
  }

  const Item = ({
    id,
    label,
    icon: Icon,
  }: {
    id: Tab
    label: string
    icon: typeof ChefHat
  }) => (
    <button
      onClick={() => go(id)}
      className="flex flex-col items-center gap-1 text-xs"
    >
      <Icon
        size={18}
        className={id === tab ? 'text-turquoise' : 'text-white/70'}
      />
      <span className={id === tab ? 'text-turquoise' : 'text-white/70'}>
        {label}
      </span>
    </button>
  )

  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 bg-neutral-950/90 backdrop-blur-md border-t border-white/10">
      <div className="flex justify-around py-3">
        <Item id="cooking" label="Cooking"     icon={ChefHat} />
        <Item id="library" label="Library"     icon={MonitorPlay} />
        <Item id="hall"    label="Hall of fame" icon={Star} />
      </div>
    </nav>
  )
}
