import {
  ActionIcon,
  Avatar,
  Flex,
  Group,
  Loader,
  Stack,
  Text,
  Timeline,
  Title,
} from '@mantine/core'
import { useMemories } from '../api/hooks/useMemories'
import { MemoryActionsMenu } from './MemoryActionsMenu'
import { MemorySortSelect } from './MemorySortSelect'
import { useClipboard, useMediaQuery } from '@mantine/hooks'
import { useEffect, useState } from 'react'
import { ShareIcon } from '@heroicons/react/24/outline'
import dayjs from 'dayjs'

export const Memories = () => {
  const isMobile = useMediaQuery('(max-width: 768px)')
  const [sortOption, setSortOption] = useState<string | null>(null)
  const { isPending, isError, data, refetch } = useMemories(sortOption)
  const clipboard = useClipboard({ timeout: 5000 })

  useEffect(() => {
    refetch()
  }, [sortOption, refetch])

  if (isPending) {
    return (
      <Stack justify='center' align='center'>
        <Loader />
      </Stack>
    )
  }

  if (isError) {
    return <Text>An error occurred retrieving memories</Text>
  }

  if (!data.memories.length) {
    return (
      <Stack justify='center' align='center'>
        <Title>No memories found</Title>
        <Text c='gray' styles={{ root: { fontWeight: 500 } }}>
          Try creating one! 💭
        </Text>
      </Stack>
    )
  }

  async function handleShareMemories() {
    // The Web Share API only works in secure contexts (HTTPS)
    // This won't work in development, but should work on compatible
    // browsers if deployed to a production environment.
    const urlToShare = window.location.href
    if (navigator.canShare && navigator.canShare()) {
      navigator.share({
        title: "David's Memories",
        text: "Check out David's memories!",
        url: urlToShare,
      })
    } else {
      clipboard.copy(urlToShare)
    }
  }

  return (
    <Stack justify='center' align='center'>
      <Group
        w='100%'
        styles={{ root: { alignSelf: isMobile ? 'center' : 'start' } }}
        justify={isMobile ? 'center' : 'space-between'}
      >
        <MemorySortSelect onChange={setSortOption} />
        <Flex
          direction={isMobile ? 'row' : 'column'}
          ml='lg'
          w='24px'
          justify='center'
          align='center'
          gap='4px'
        >
          <ActionIcon onClick={handleShareMemories} variant='light'>
            <ShareIcon />
          </ActionIcon>
          <Text c='gray' size='xs'>
            {clipboard.copied ? 'Copied!' : 'Share'}
          </Text>
        </Flex>
      </Group>
      <Timeline lineWidth={2}>
        {data.memories.map((memory, i) => {
          return (
            <Timeline.Item
              key={`${memory.name}-${i}`}
              color='blue'
              title={memory.name}
              bullet={
                <Avatar size={32} src={URL.createObjectURL(memory.imageFile)} />
              }
              styles={{
                itemBody: { paddingLeft: '24px', position: 'relative' },
              }}
            >
              <Text size='sm' c='gray' w='90%'>
                {memory.description}
              </Text>
              <Text size='xs' mt={4}>
                {dayjs(new Date(memory.timestamp)).format('MMMM D, YYYY')}
              </Text>
              <MemoryActionsMenu memoryId={memory.id} />
            </Timeline.Item>
          )
        })}
      </Timeline>
    </Stack>
  )
}
