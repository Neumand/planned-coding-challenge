import { ActionIcon, Menu, Text } from '@mantine/core'
import { DeleteMemoryModal } from './DeleteMemory.modal'
import { useDisclosure } from '@mantine/hooks'
import { FC } from 'react'
import { CreateEditMemoryModal } from './CreateEditMemory.modal'

interface ActionMenuProps {
  memoryId: string
}

export const MemoryActionsMenu: FC<ActionMenuProps> = ({ memoryId }) => {
  const [isEditModalOpened, { open: openEditModal, close: closeEditModal }] =
    useDisclosure(false)
  const [
    isDeleteModalOpened,
    { open: openDeleteModal, close: closeDeleteModal },
  ] = useDisclosure(false)

  return (
    <>
      <Menu shadow='md'>
        <Menu.Target>
          <ActionIcon
            variant='transparent'
            styles={{
              root: {
                position: 'absolute',
                top: '0',
                right: 0,
                height: '12px',
                width: '12px',
              },
            }}
          >
            <Text c='dark'>...</Text>
          </ActionIcon>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Item onClickCapture={openEditModal}>Edit</Menu.Item>
          <Menu.Item onClick={openDeleteModal} color='red'>
            Delete
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>

      <CreateEditMemoryModal
        id={memoryId}
        opened={isEditModalOpened}
        onClose={closeEditModal}
      />
      <DeleteMemoryModal
        id={memoryId}
        opened={isDeleteModalOpened}
        onClose={closeDeleteModal}
      />
    </>
  )
}
