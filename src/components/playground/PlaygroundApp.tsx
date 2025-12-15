import { useState, useMemo, useCallback } from 'react'
import { useProviderStore } from '@/stores/providerStore'
import { useNotificationStore } from '@/stores/notificationStore'
import { extractArtifact } from '@/services/playground/artifactParser'
import { PlaygroundAIService } from '@/services/playground/aiPlaygroundService'
import PlaygroundChatPanel from './PlaygroundChatPanel'
import PreviewPanel from './PreviewPanel'

interface PlaygroundMessage {
  id: string
  role: 'user' | 'model'
  text: string
  displayText?: string
  isStreaming?: boolean
  timestamp: number
}

interface PlaygroundAppProps {
  systemPrompt: string
  onOpenSystemPrompt: () => void
}

const buildDisplayText = (text: string): string => {
  const matches = text.match(/```/g)
  if (matches && matches.length % 2 !== 0) {
    return `${text}\n\`\`\``
  }
  return text
}

export default function PlaygroundApp({ systemPrompt, onOpenSystemPrompt }: PlaygroundAppProps) {
  const providerStore = useProviderStore()
  const notificationStore = useNotificationStore()
  const aiService = PlaygroundAIService.getInstance()

  const [messages, setMessages] = useState<PlaygroundMessage[]>([])
  const [isStreaming, setIsStreaming] = useState(false)
  const [currentArtifact, setCurrentArtifact] = useState<any>(null)

  const hasSystemPrompt = useMemo(() => Boolean(systemPrompt && systemPrompt.trim().length), [systemPrompt])

  const currentModelName = useMemo(() => {
    const provider = providerStore.currentProvider
    const model = providerStore.currentModel
    if (provider && model) {
      return `${provider.name} · ${model.name}`
    }
    return '未连接模型'
  }, [providerStore.currentProvider, providerStore.currentModel])

  const ensureProvider = useCallback(() => {
    const provider = providerStore.currentProvider
    const model = providerStore.currentModel
    if (!provider || !model || !provider.apiKey) {
      notificationStore.warning('请先在系统设置中配置可用的 AI 模型和 API Key')
      return null
    }
    return { provider, model }
  }, [providerStore.currentProvider, providerStore.currentModel, notificationStore])

  const handleClear = useCallback(() => {
    setMessages([])
    setCurrentArtifact(null)
  }, [])

  const toggleStreamMode = useCallback(() => {
    providerStore.setStreamMode(!providerStore.streamMode)
  }, [providerStore])

  const handleSend = useCallback(
    async (payload: { text: string }) => {
      const text = payload?.text?.trim()
      if (!text) return

      const providerInfo = ensureProvider()
      if (!providerInfo) return

      const userMessage: PlaygroundMessage = {
        id: Date.now().toString(),
        role: 'user',
        text,
        timestamp: Date.now()
      }
      setMessages((prev) => [...prev, userMessage])

      setIsStreaming(true)
      const aiMsgId = `${Date.now()}_ai`
      const aiMessage: PlaygroundMessage = {
        id: aiMsgId,
        role: 'model',
        text: '',
        displayText: '',
        isStreaming: true,
        timestamp: Date.now()
      }
      setMessages((prev) => [...prev, aiMessage])

      const payloadMessages = [...messages, userMessage].map((msg) => ({
        id: msg.id,
        role: (msg.role === 'model' ? 'assistant' : 'user') as 'user' | 'system' | 'assistant',
        content: msg.text,
        timestamp: msg.timestamp
      }))

      const useStream = providerStore.streamMode

      try {
        let accumulated = ''
        const onChunk = (chunkText: string) => {
          accumulated += chunkText
          setMessages((prev) => {
            const updated = [...prev]
            const aiMsg = updated.find((m) => m.id === aiMsgId)
            if (aiMsg) {
              aiMsg.text = accumulated
              aiMsg.displayText = buildDisplayText(accumulated)
            }
            return updated
          })
          const artifact = extractArtifact(accumulated)
          if (artifact) {
            setCurrentArtifact(artifact)
          }
        }

        const response = await aiService.send({
          messages: payloadMessages,
          provider: providerInfo.provider,
          modelId: providerInfo.model.id,
          stream: useStream,
          onChunk: useStream ? onChunk : undefined,
          systemPrompt: systemPrompt
        })

        if (!useStream && typeof response === 'string') {
          setMessages((prev) => {
            const updated = [...prev]
            const aiMsg = updated.find((m) => m.id === aiMsgId)
            if (aiMsg) {
              aiMsg.text = response
              aiMsg.displayText = response
              aiMsg.isStreaming = false
            }
            return updated
          })
          const artifact = extractArtifact(response)
          if (artifact) {
            setCurrentArtifact(artifact)
          }
        } else {
          setMessages((prev) => {
            const updated = [...prev]
            const aiMsg = updated.find((m) => m.id === aiMsgId)
            if (aiMsg) {
              aiMsg.isStreaming = false
              aiMsg.displayText = aiMsg.text
            }
            return updated
          })
        }
      } catch (err: any) {
        setMessages((prev) => {
          const updated = [...prev]
          const aiMsg = updated.find((m) => m.id === aiMsgId)
          if (aiMsg) {
            aiMsg.text += `\n\n*Error: ${err?.message || err}*`
            aiMsg.displayText = aiMsg.text
            aiMsg.isStreaming = false
          }
          return updated
        })
      } finally {
        setIsStreaming(false)
      }
    },
    [messages, providerStore.streamMode, systemPrompt, aiService, ensureProvider]
  )

  return (
    <div className="w-full flex-1 flex flex-col overflow-hidden min-h-0">
      <div className="flex flex-row gap-4 flex-1 min-h-0 overflow-hidden">
        <div className="flex-1 min-h-0 flex flex-col overflow-hidden">
          <PlaygroundChatPanel
            messages={messages}
            isStreaming={isStreaming}
            isStreamMode={providerStore.streamMode}
            hasSystemPrompt={hasSystemPrompt}
            currentModelName={currentModelName}
            onSend={handleSend}
            onClear={handleClear}
            onToggleStream={toggleStreamMode}
            onOpenSystemPrompt={onOpenSystemPrompt}
          />
        </div>
        <div className="flex-1 min-h-0 flex flex-col bg-[#f0f4f9] rounded-lg overflow-hidden">
          <PreviewPanel artifact={currentArtifact} />
        </div>
      </div>
    </div>
  )
}
