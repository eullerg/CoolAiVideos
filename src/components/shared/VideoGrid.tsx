/* -------------------------------------------------------------------------- */
/* VideoGrid.tsx – responsivo mobile-first                                    */
/* 1. Colunas: 1 (xs) · 2 (sm) · 3 (lg)                                       */
/* 2. Altura fixa em mobile (h-[200px]) p/ evitar “layout shift”              */
/* 3. Overlay / ícone e badge ajustados (text-[10px] em xs)                   */
/* -------------------------------------------------------------------------- */

import { Play } from 'lucide-react'
import Image from 'next/image'

interface Video {
  id: number
  title: string
  thumbnail: string
  duration: string
}

export default function VideoGrid({
  videos,
  heading = 'Recent videos',
}: {
  videos?: Video[]
  heading?: string
}) {
  /* fallback mock */
  const list: Video[] =
    videos && videos.length
      ? videos
      : [
          {
            id: 1,
            title: 'Product Promo',
            thumbnail:
              'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=800&q=80',
            duration: '0:32',
          },
          {
            id: 2,
            title: 'Social Media Ad',
            thumbnail:
              'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&w=800&q=80',
            duration: '0:45',
          },
          {
            id: 3,
            title: 'Tutorial Video',
            thumbnail:
              'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?auto=format&fit=crop&w=800&q=80',
            duration: '1:20',
          },
          {
            id: 4,
            title: 'Brand Story',
            thumbnail:
              'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80',
            duration: '0:58',
          },
        ]

  if (!list.length) return null

  return (
    <section className="mt-12">
      <h2 className="text-xl font-semibold mb-4">{heading}</h2>

      {/* grid responsivo */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {list.map((v) => (
          <article
            key={v.id}
            className="rounded-2xl overflow-hidden bg-white/5 hover:bg-white/10 transition group"
          >
            {/* ---------------------------------------------------------------- */}
            {/* Thumnbnail responsivo                                            */}
            {/* — em mobile fixa altura para evitar CLS                           */}
            {/* ---------------------------------------------------------------- */}
            <div className="relative w-full h-[200px] sm:h-auto sm:aspect-video">
              <Image
                src={v.thumbnail}
                alt={v.title}
                fill
                sizes="
                  (max-width: 640px) 100vw,
                  (max-width: 1024px) 50vw,
                  33vw"
                className="object-cover"
                priority={v.id === 1}
              />

              {/* overlay + play */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Play size={18} className="text-white fill-white" />
                </div>
              </div>

              {/* duration badge */}
              <span className="absolute bottom-2 right-2 bg-black/70 text-[10px] sm:text-xs px-2 py-0.5 rounded">
                {v.duration}
              </span>
            </div>

            {/* title */}
            <div className="p-3">
              <h3 className="font-medium text-sm sm:text-base">{v.title}</h3>
              <p className="text-[10px] sm:text-xs text-white/50">
                Created 2 days ago
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
