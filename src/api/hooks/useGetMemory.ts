import { useQuery } from '@tanstack/react-query'
import { Memory, MemoryWithImageFile } from '../../models/Memory'
import { get } from 'idb-keyval'

export const useGetMemory = (id?: string) => {
  return useQuery<{ memory: MemoryWithImageFile }>({
    queryKey: ['memory', id],
    queryFn: async () => {
      if (!id) {
        throw new Error('No id provided')
      }

      try {
        const response = await fetch(`http://localhost:4001/memories/${id}`)

        if (!response.ok) throw new Error('Network error')

        const { memory }: { memory: Memory } = await response.json()
        const imageFile = await get(memory.imageKey)
        return {
          memory: {
            ...memory,
            imageFile,
          },
        }
      } catch (error) {
        throw new Error(`Error fetching memory with id ${id}: ${error}`)
      }
    },
  })
}
