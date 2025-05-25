'use client'
import { useState } from 'react'
import VideoGrid from '@/components/shared/VideoGrid'
import { getHallVideos, HallVideo } from '@/lib/api/getHallVideos'

export default function LoadMoreHall({ heading }: { heading: string }) {
  const [videos, setVideos] = useState<HallVideo[]>([])
  const [loading, setLoading] = useState(false)
  const [batch, setBatch] = useState(0)

  const loadMore = async () => {
    setLoading(true)
    const newBatch = await getHallVideos(3)
    setVideos((prev) => [...prev, ...newBatch])
    setBatch((n) => n + 1)
    setLoading(false)
  }

  // carrega o primeiro trio automaticamente
  if (!batch && !loading) loadMore()

  return (
    <>
      <VideoGrid videos={videos} heading={heading} />

      <div className="flex justify-center mt-6">
        <button
          onClick={loadMore}
          disabled={loading}
          className="px-6 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition text-sm"
        >
          {loading ? 'Loading…' : 'Load more'}
        </button>
      </div>
    </>
  )
}
