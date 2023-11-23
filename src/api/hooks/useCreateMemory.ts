import { useMutation, useQueryClient } from '@tanstack/react-query'
import { PostMemory } from '../../models/PostMemory'

export const useCreateMemory = () => {
  const queryClient = useQueryClient()

  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['memories'] })
    },
    mutationFn: async (memory: PostMemory) => {
      const response = await fetch('http://localhost:4001/memories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(memory),
      })

      if (!response.ok) throw new Error('Error creating memory')

      return response.json()
    },
  })
}
