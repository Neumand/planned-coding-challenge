import { CubeIcon, PlusIcon } from '@heroicons/react/20/solid'
import './App.css'
import { Memories } from './components/Memories'
import { Button, Stack, Text, Title } from '@mantine/core'
import { CreateEditMemoryModal } from './components/CreateEditMemory.modal'
import { useDisclosure } from '@mantine/hooks'

function App() {
  const [isModalOpened, { open, close }] = useDisclosure(false)

  function handleCreateMemory() {
    open()
  }

  return (
    <div>
      <div className='mx-auto max-w-7xl sm:px-6 lg:p-8'>
        <div className='flex-col overflow-hidden rounded-lg bg-slate-900 shadow h-96 mb-8 max-md:rounded-none'>
          <div className='flex justify-between items-center px-4 py-5 sm:p-6 max-md:flex-col'>
            <div className='flex items-center'>
              <CubeIcon className='h-16 w-16 text-white inline-block' />
              <h1 className='text-4xl font-semibold text-white mb-4 ml-4 mt-4'>
                Memory lane
              </h1>
            </div>
            <Button
              variant='outline'
              rightSection={<PlusIcon className='h-4 w-4' />}
              onClick={handleCreateMemory}
            >
              Create a memory
            </Button>
          </div>
          <Stack>
            <Title
              styles={{
                root: {
                  textAlign: 'center',
                  fontWeight: 800,
                  color: '#FFFFFF',
                },
              }}
            >
              David's Memories
            </Title>
            <Text
              w='60%'
              styles={{
                root: {
                  margin: '0 auto',
                  fontWeight: 500,
                  color: '#ffffffe4',
                  textAlign: 'center',
                },
              }}
            >
              David's journey led him from heavy metal, to finance, and finally
              to tech. He enjoys writing online and building delightful digital
              experiences for users.
            </Text>
          </Stack>
        </div>
        <Memories />
      </div>
      <CreateEditMemoryModal opened={isModalOpened} onClose={close} />
    </div>
  )
}

export default App
