import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useDeleteMemory = () => {
  const queryClient = useQueryClient()

  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['memories'] })
    },
    mutationFn: async (id: string) => {
      const response = await fetch(`http://localhost:4001/memories/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) throw new Error('Error deleting memory')

      return response.json()
    },
  })
}
