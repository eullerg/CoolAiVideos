import Header from '@/components/layout/Header'
import VideoGrid from '@/components/shared/VideoGrid'
import LoadMoreHall from '@/components/hall/LoadMoreHall'
import BackToTop from '@/components/hall/BackToTop'
import { Geist, Geist_Mono } from 'next/font/google'
import { cn } from '@/lib/utils'

export const metadata = { title: 'Hall of Fame — CoolAiVideos' }

/* fontes */
const geist = Geist({ subsets: ['latin'], weight: ['400', '500', '700'] })
const mono  = Geist_Mono({ subsets: ['latin'], weight: ['400', '700'] })

export default function HallOfFamePage() {
  return (
    <div className={cn(geist.className, 'w-full min-h-screen px-4 py-6 md:px-8')}>
      {/* cabeçalho com Need a hand + BUY CREDITS */}
      <Header />

      <div className={cn(mono.className, 'max-w-6xl mx-auto mt-20 lg:mt-28')}>
        {/* weekly curadoria fixa */}
        <VideoGrid heading="Week Hall of Fame" />

        {/* all-time hall com botão Load more */}
        <LoadMoreHall heading="All-Time Hall" />
      </div>

      {/* botão flutuante voltar ao topo */}
      <BackToTop />
    </div>
  )
}
