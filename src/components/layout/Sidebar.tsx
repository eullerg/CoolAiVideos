'use client'

import {
  ChefHat,
  Monitor,
  Rocket,
  MessageSquare,
  Menu,
  X,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

export default function Sidebar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(true)

  /* Fecha por padrão em dispositivos < 640 px */
  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 640) setOpen(false)
  }, [])

  /* Botão hambúrguer — visível apenas quando sidebar fechada */
  const FloatingToggle = () =>
    !open && (
      <button
        onClick={() => setOpen(true)}
        className="fixed top-4 left-4 z-[60] p-2 rounded-full
                   bg-neutral-900/80 backdrop-blur-md border border-white/10
                   hover:bg-white/10 transition"
        aria-label="Open sidebar"
      >
        <Menu size={20} />
      </button>
    )

  const Nav = ({
    href,
    label,
    icon: Icon,
  }: {
    href: string
    label: string
    icon: typeof ChefHat
  }) => {
    const active = pathname === href
    return (
      <Link
        href={href}
        onClick={() => window.innerWidth < 640 && setOpen(false)}
        className={cn(
          'flex items-center p-3 rounded-2xl transition text-sm',
          open ? 'pl-1' : 'justify-center',
          active
            ? 'bg-white/10 text-turquoise shadow shadow-turquoise/20'
            : 'hover:bg-white/5',
        )}
      >
        <Icon size={20} />
        {open && <span className="ml-3">{label}</span>}
      </Link>
    )
  }

  return (
    <>
      <FloatingToggle />

      <aside
        className={cn(
          'fixed top-0 left-0 h-screen w-64 bg-neutral-900 border-r border-white/10 z-50',
          'transition-transform duration-300',
          open ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className="flex h-full flex-col">
          {/* Header ----------------------------------------------------- */}
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            {open && (
              <p className="font-bold text-xl bg-gradient-to-r from-turquoise to-neonpurple bg-clip-text text-transparent">
                CoolAiVideos
              </p>
            )}

            {/* X aparece somente em mobile */}
            {open && (
              <button
                onClick={() => setOpen(false)}
                className="p-2 rounded-full hover:bg-white/5 transition"
                aria-label="Close sidebar"
              >
                <X size={20} />
              </button>
            )}
          </div>

          {/* Navegação --------------------------------------------------- */}
          <nav className="flex-1 p-4 space-y-2">
            <Nav href="/" label="Cooking" icon={ChefHat} />
            <Nav href="/library" label="Library" icon={Monitor} />
          </nav>

          {/* Upgrade / Feedback (apenas com sidebar aberta) -------------- */}
          {open && (
            <>
              <div className="p-4">
                <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-4 border border-white/10">
                  <div className="flex items-center gap-2">
                    <Rocket size={18} className="text-neonpurple" />
                    <p className="font-semibold">Upgrade plan</p>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    Don&apos;t lose your credit discount now!
                  </p>
                  <Button className="w-full mt-3 bg-gradient-to-r from-turquoise to-neonpurple hover:shadow-lg hover:shadow-neonpurple/40">
                    Upgrade
                  </Button>
                </div>
              </div>

              <div className="p-4 border-t border-white/10">
                <Link
                  href="#"
                  className="text-sm underline text-white/70 hover:text-white flex items-center gap-2"
                >
                  <MessageSquare size={14} /> Feedback
                </Link>
              </div>
            </>
          )}
        </div>
      </aside>
    </>
  )
}
