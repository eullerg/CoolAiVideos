/* MOCK – troque depois por fetch('/api/halloffame?cursor=...') */

export interface HallVideo {
    id: number
    title: string
    thumbnail: string   // mp4 ou imagem
    duration: string
    author: string
    date: string
  }
  
  let cursor = 0
  
  export async function getHallVideos(batch = 3): Promise<HallVideo[]> {
    // simula latência de rede
    await new Promise((r) => setTimeout(r, 400))
  
    // gera lote de vídeos
    const result: HallVideo[] = Array.from({ length: batch }).map((_, i) => {
      const id = cursor + i + 1
      return {
        id,
        title: `Hall clip #${id}`,
        thumbnail: `/halloffame${((id - 1) % 6) + 1}.mp4`,
        duration: '0:45',
        author: 'curator',
        date: '2025',
      }
    })
  
    cursor += batch
    return result
  }
  