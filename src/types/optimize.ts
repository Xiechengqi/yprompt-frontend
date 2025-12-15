export interface QualityCheckResult {
  length: number
  lengthRatio: number
  lengthStatus: 'good' | 'warning' | 'error'
  hasStructureMarkers: boolean
  warnings?: string[]
}

export interface Message {
  role: 'system' | 'user' | 'assistant'
  content: string
}