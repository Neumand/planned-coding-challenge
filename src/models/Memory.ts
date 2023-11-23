export interface Memory {
  id: string
  name: string
  description: string
  timestamp: number
  imageKey: string
}

export interface MemoryWithImageFile extends Memory {
  imageFile: File
}
