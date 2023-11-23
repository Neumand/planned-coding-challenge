import { Button, Group, Modal, Text } from '@mantine/core'
import { FC } from 'react'
import { useDeleteMemory } from '../api/hooks/useDeleteMemory'

interface DeleteMemoryModalProps {
  id: string
  opened: boolean
  onClose: () => void
}

export const DeleteMemoryModal: FC<DeleteMemoryModalProps> = ({
  id,
  opened,
  onClose,
}) => {
  const { isError, isPending, isSuccess, mutate } = useDeleteMemory()

  async function handleDeleteMemory() {
    mutate(id)
  }

  if (isSuccess) {
    onClose()
  }

  return (
    <Modal
      centered
      opened={opened}
      onClose={onClose}
      title='Are you sure you want to forget this memory?'
    >
      <Group pos='sticky' justify='space-between'>
        <Button
          loading={isPending}
          variant='outline'
          color='gray'
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button variant='filled' color='red' onClick={handleDeleteMemory}>
          Delete
        </Button>
      </Group>
      {isError && (
        <Text size='sm' c='red'>
          An error occurred deleting your memory
        </Text>
      )}
    </Modal>
  )
}
