'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import VideoGrid from '@/components/shared/VideoGrid'
import { getHallVideos } from '@/lib/api/getHallVideos'

/* --- Reutilizamos o shape do VideoGrid ----------------------- */
interface Video {
  id: number
  title: string
  thumbnail: string
  duration: string
  author: string
  date: string
}

export default function InfiniteHall({ heading }: { heading: string }) {
  const [videos, setVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState(false)
  const loaderRef = useRef<HTMLDivElement | null>(null)

  /* ---------- load function ---------- */
  const loadMore = useCallback(async () => {
    if (loading) return
    setLoading(true)

    const newVidsRaw = await getHallVideos()
    const newVids: Video[] = newVidsRaw.map((v) => ({
      ...v,
      id: Number(v.id), // garante number
    }))

    setVideos((prev) => [...prev, ...newVids])
    setLoading(false)
  }, [loading])

  /* first load */
  useEffect(() => {
    loadMore()
  }, [loadMore])

  /* IntersectionObserver */
  useEffect(() => {
    if (!loaderRef.current) return
    const io = new IntersectionObserver(
      (entries) => entries[0].isIntersecting && loadMore(),
      { rootMargin: '300px' },
    )
    io.observe(loaderRef.current)
    return () => io.disconnect()
  }, [loadMore])

  return (
    <>
      <VideoGrid videos={videos} heading={heading} />
      <div ref={loaderRef} className="h-20 flex items-center justify-center">
        {loading && <span className="text-white/60 text-sm">Loading…</span>}
      </div>
    </>
  )
}
