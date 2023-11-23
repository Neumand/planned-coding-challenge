import { get } from 'idb-keyval'
import { Memory, MemoryWithImageFile } from './../../models/Memory'
import { useQuery } from '@tanstack/react-query'

export const useMemories = (sort?: string | null) => {
  return useQuery<{ memories: MemoryWithImageFile[] }>({
    queryKey: ['memories'],
    queryFn: async () => {
      try {
        const response = await fetch(
          `http://localhost:4001/memories${sort ? `?sort=${sort}` : ''}`
        )

        if (!response.ok) throw new Error('Network error')

        const { memories }: { memories: Memory[] } = await response.json()

        const promises = memories.map(async (memory) => {
          const imageFile = await get(memory.imageKey)
          return { ...memory, imageFile }
        })

        const transformedMemories = await Promise.all(promises)
        return { memories: transformedMemories }
      } catch (error) {
        throw new Error(`Error fetching memories: ${error}`)
      }
    },
  })
}
