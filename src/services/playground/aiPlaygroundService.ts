import type { PlaygroundCapability } from '@/config/playgroundInstructions'
import { AIService, type ChatMessage } from '@/services/aiService'
import type { ProviderConfig } from '@/stores/providerStore'

export interface PlaygroundMessage {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: number
}

export interface PlaygroundAIOptions {
  messages: PlaygroundMessage[]
  provider: ProviderConfig
  modelId: string
  capability?: PlaygroundCapability
  stream?: boolean
  onChunk?: (chunk: string) => void
  systemPrompt?: string
}

export class PlaygroundAIService {
  private static instance: PlaygroundAIService
  private aiService: AIService

  private constructor() {
    this.aiService = AIService.getInstance()
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new PlaygroundAIService()
    }
    return this.instance
  }

  async send(options: PlaygroundAIOptions) {
    const { messages, provider, modelId, capability, stream = true, onChunk, systemPrompt } = options
    const aiMessages: ChatMessage[] = []

    const trimmedSystemPrompt = systemPrompt?.trim()
    if (trimmedSystemPrompt) {
      aiMessages.push({
        role: 'system',
        content: trimmedSystemPrompt
      })
    }

    if (capability?.prompt) {
      aiMessages.push({
        role: 'system',
        content: capability.prompt
      })
    }

    aiMessages.push(
      ...messages.map((msg) => ({
        role: (msg.role === 'assistant' ? 'assistant' : 'user') as ChatMessage['role'],
        content: msg.content
      }))
    )

    // 默认允许流式输出，除非明确禁用
    const allowStream = true
    const useStream = stream && allowStream

    return await this.aiService.callAI(aiMessages, provider, modelId, useStream, onChunk)
  }
}
