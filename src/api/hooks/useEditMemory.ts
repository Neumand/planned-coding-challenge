import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Memory } from '../../models/Memory'

export const useEditMemory = () => {
  const queryClient = useQueryClient()

  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['memories'] })
    },
    mutationFn: async (memory: Memory) => {
      const response = await fetch(
        `http://localhost:4001/memories/${memory.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(memory),
        }
      )

      if (!response.ok) throw new Error('Error editing memory')

      return response.json()
    },
  })
}
