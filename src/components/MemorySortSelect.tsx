import { Select } from '@mantine/core'
import { SortOption } from '../models/Sort'
import { FC } from 'react'

interface MemorySortSelectProps {
  onChange: (value: string | null) => void
}

export const MemorySortSelect: FC<MemorySortSelectProps> = ({ onChange }) => {
  return (
    <Select
      placeholder='Order memories by:'
      onChange={onChange}
      data={[
        {
          value: SortOption.NEWEST,
          label: 'Newest to oldest',
        },
        {
          value: SortOption.OLDEST,
          label: 'Oldest to newest',
        },
      ]}
    />
  )
}
