/* -------------------------------------------------------------------------- */
/* VideoGrid.tsx – versão compacta (mesmo tamanho dos cards do Cooking)       */
/* - Exibe vídeos 9:16 em loop ou thumbnails.                                 */
/* - Container agora usa altura fixa (220 px / 260 px) em vez de aspect-ratio */
/* -------------------------------------------------------------------------- */

import { Play } from 'lucide-react'
import Image from 'next/image'

interface Video {
  id: number
  title: string
  thumbnail: string
  duration: string
  author?: string
  date?: string
}

export default function VideoGrid({
  videos,
  heading = 'Week Hall of Fame',
  subText = 'The best 6 videos of the week win a prize of $10, send us your best video!',
}: {
  videos?: Video[]
  heading?: string
  subText?: string
}) {
  /* ------- lista padrão (6 vídeos curados) ------- */
  const hallOfFame: Video[] = [
    { id: 1, title: 'Ancient Sorcerer',        thumbnail: '/halloffame1.mp4', duration: '0:05', author: 'alice',   date: 'May 20 2025' },
    { id: 2, title: 'Wraiths Ethereal',        thumbnail: '/halloffame2.mp4', duration: '0:05', author: 'bob',     date: 'May 18 2025' },
    { id: 3, title: 'Fiery Warrior Elegance',  thumbnail: '/halloffame3.mp4', duration: '0:05', author: 'charlie', date: 'May 15 2025' },
    { id: 4, title: 'Soldiers Patrol',         thumbnail: '/halloffame4.mp4', duration: '0:05', author: 'dana',    date: 'May 12 2025' },
    { id: 5, title: 'Serene Llama Embrace',    thumbnail: '/halloffame5.mp4', duration: '0:05', author: 'eve',     date: 'May 06 2025' },
    { id: 6, title: 'Otters Rainy Refuge',     thumbnail: '/halloffame6.mp4', duration: '0:05', author: 'frank',   date: 'May 01 2025' },
  ]

  const list = videos && videos.length ? videos : hallOfFame
  if (!list.length) return null

  const isVideo = (src: string) => src.toLowerCase().endsWith('.mp4')

  return (
    <section className="mt-12">
      <h2 className="text-xl font-semibold mb-4">{heading}</h2>

      {/* subtítulo */}
      <p className="text-gray/60 text-sm mb-4">
        {subText}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {list.map((v) => (
          <article
            key={v.id}
            className="rounded-2xl overflow-hidden bg-white/5 hover:bg-white/10 transition group"
          >
            {/* media – altura fixa para manter proporção visual semelhante ao Cooking */}
            <div className="relative w-full h-[300px] sm:h-[360px]">
              {isVideo(v.thumbnail) ? (
                <video
                  src={v.thumbnail}
                  loop
                  autoPlay
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : (
                <Image
                  src={v.thumbnail}
                  alt={v.title}
                  fill
                  priority={v.id === 1}
                  sizes="
                    (max-width: 640px) 100vw,
                    (max-width: 1024px) 50vw,
                    33vw"
                  className="object-cover"
                />
              )}

              {/* overlay / play */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Play size={18} className="text-white fill-white" />
                </div>
              </div>

              {/* duração */}
              <span className="absolute bottom-2 right-2 bg-black/70 text-[10px] sm:text-xs px-2 py-0.5 rounded">
                {v.duration}
              </span>
            </div>

            {/* meta */}
            <div className="p-3">
              <h3 className="font-medium text-sm sm:text-base">{v.title}</h3>
              {v.author && v.date && (
                <p className="text-[10px] sm:text-xs text-white/50">
                  by {v.author} • {v.date}
                </p>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
