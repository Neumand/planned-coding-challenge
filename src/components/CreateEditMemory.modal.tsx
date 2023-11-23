import {
  Button,
  FileInput,
  Group,
  Image,
  Modal,
  Stack,
  TextInput,
  Textarea,
  Text,
} from '@mantine/core'
import { DateTimePicker } from '@mantine/dates'
import { FC, useEffect } from 'react'
import { useCreateMemory } from '../api/hooks/useCreateMemory'
import { useForm } from '@mantine/form'
import { set } from 'idb-keyval'
import { useGetMemory } from '../api/hooks/useGetMemory'
import { useEditMemory } from '../api/hooks/useEditMemory'

interface CreateEditMemoryModalProps {
  opened: boolean
  onClose: () => void
  id?: string
}

interface MemoryFormValues {
  name: string
  description: string
  selectedDate: Date | null
  uploadedImage: File | null
}

export const CreateEditMemoryModal: FC<CreateEditMemoryModalProps> = ({
  opened,
  onClose,
  id,
}) => {
  const { data, isSuccess } = useGetMemory(id)

  const form = useForm<MemoryFormValues>({
    initialValues: {
      name: '',
      description: '',
      selectedDate: null,
      uploadedImage: null,
    },
    validate: {
      name: (value) =>
        value.trim().length < 1 ? 'Please enter a title' : null,
      description: (value) =>
        value.trim().length < 1 ? 'Please enter a description' : null,
      selectedDate: (value) => (!value ? 'Please select a date' : null),
      uploadedImage: (value) => (!value ? 'Please upload an image' : null),
    },
  })

  const { name, description, uploadedImage, selectedDate } = form.values

  useEffect(() => {
    if (data?.memory) {
      form.setValues({
        name: data.memory.name,
        description: data.memory.description,
        selectedDate: new Date(data.memory.timestamp),
        uploadedImage: data.memory.imageFile,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess])

  const defaultImage =
    'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png'
  const imageSrc = uploadedImage
    ? URL.createObjectURL(uploadedImage)
    : defaultImage

  const {
    isPending: isCreatingMemory,
    isError: hasErrorCreatingMemory,
    isSuccess: isCreateMemorySuccess,
    mutate: createMemory,
  } = useCreateMemory()

  const {
    isPending: isEditingMemory,
    isError: hasErrorEditingMemory,
    isSuccess: isEditMemorySuccess,
    mutate: editMemory,
  } = useEditMemory()

  if (isCreateMemorySuccess || isEditMemorySuccess) {
    onClose()
  }

  async function handleCreateEditMemory() {
    const { hasErrors } = form.validate()

    if (hasErrors || !name || !description || !selectedDate || !uploadedImage) {
      return
    }

    const imageKey = `${uploadedImage.name}-${Date.now()}`
    await set(imageKey, uploadedImage)

    if (id) {
      editMemory({
        id,
        name,
        description,
        timestamp: Date.parse(selectedDate.toLocaleDateString()),
        imageKey,
      })
    } else {
      createMemory({
        name,
        description,
        timestamp: Date.parse(selectedDate.toLocaleDateString()),
        imageKey,
      })
    }
  }

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={id ? 'Edit Memory' : 'New Memory'}
    >
      <Stack gap='md'>
        <form onSubmit={handleCreateEditMemory}>
          <TextInput
            label='Title'
            placeholder='Title'
            {...form.getInputProps('name')}
          />
          <Textarea
            label='Description'
            placeholder='What do you remember?'
            {...form.getInputProps('description')}
          />
          <DateTimePicker
            maxDate={new Date()}
            label='When did this happen?'
            {...form.getInputProps('selectedDate')}
          />
          <FileInput
            label='Upload an image'
            placeholder='Upload an image of your memory'
            accept='image/*'
            clearable
            {...form.getInputProps('uploadedImage')}
          />
        </form>

        <Image src={imageSrc} />
        <Group pos='sticky' justify='space-between'>
          <Button variant='outline' color='gray' onClick={onClose}>
            Close
          </Button>
          <Button
            loading={isCreatingMemory || isEditingMemory}
            variant='filled'
            color='blue'
            onClick={handleCreateEditMemory}
          >
            {id ? 'Update' : 'Create'}
          </Button>
        </Group>
        {(hasErrorCreatingMemory || hasErrorEditingMemory) && (
          <Text size='sm' c='red'>
            {id
              ? 'An error occurred editing your memory'
              : 'An error occurred creating your memory'}
          </Text>
        )}
      </Stack>
    </Modal>
  )
}
