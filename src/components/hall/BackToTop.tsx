'use client'
import { ArrowUp } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function BackToTop() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!show) return null

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="
        fixed bottom-24 right-4 z-50 w-10 h-10 rounded-full
        flex items-center justify-center
        bg-gradient-to-r from-turquoise to-neonpurple
        shadow shadow-neonpurple/40 hover:scale-105 transition
      "
      aria-label="Back to top"
    >
      <ArrowUp size={18} />
    </button>
  )
}
