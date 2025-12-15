// React版本的useComparison hook
import { useState, useCallback } from 'react'
import { AIService } from '@/services/aiService'
import { useProviderStore } from '@/stores/providerStore'
import type { ProviderConfig, ModelConfig } from '@/stores/providerStore'

export type ComparisonMode = 'system' | 'user'

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  isStreaming?: boolean
}

export interface SystemComparisonConfig {
  leftSystemPrompt: string
  rightSystemPrompt: string
  sharedUserInput: string
}

export interface UserComparisonConfig {
  sharedSystemPrompt: string
  leftUserPrompt: string
  rightUserPrompt: string
}

interface ComparisonState {
  mode: ComparisonMode
  systemConfig: SystemComparisonConfig
  leftMessages: ChatMessage[]
  rightMessages: ChatMessage[]
  userConfig: UserComparisonConfig
  leftUserMessages: ChatMessage[]
  rightUserMessages: ChatMessage[]
  isLeftGenerating: boolean
  isRightGenerating: boolean
}

export function useComparison() {
  const aiService = AIService.getInstance()
  const currentProvider = useProviderStore((state) => state.currentProvider)
  const currentModel = useProviderStore((state) => state.currentModel)

  const [state, setState] = useState<ComparisonState>({
    mode: 'system',
    systemConfig: {
      leftSystemPrompt: '',
      rightSystemPrompt: '',
      sharedUserInput: ''
    },
    leftMessages: [],
    rightMessages: [],
    userConfig: {
      sharedSystemPrompt: '',
      leftUserPrompt: '',
      rightUserPrompt: ''
    },
    leftUserMessages: [],
    rightUserMessages: [],
    isLeftGenerating: false,
    isRightGenerating: false
  })

  const isGenerating = state.isLeftGenerating || state.isRightGenerating

  const initSystemComparison = useCallback((originalPrompt: string, optimizedPrompt: string) => {
    setState(prev => ({
      ...prev,
      mode: 'system',
      systemConfig: {
        leftSystemPrompt: originalPrompt,
        rightSystemPrompt: optimizedPrompt,
        sharedUserInput: ''
      },
      leftMessages: [],
      rightMessages: []
    }))
  }, [])

  const initUserComparison = useCallback((
    systemPrompt: string,
    originalUserPrompt: string,
    optimizedUserPrompt: string
  ) => {
    setState(prev => ({
      ...prev,
      mode: 'user',
      userConfig: {
        sharedSystemPrompt: systemPrompt,
        leftUserPrompt: originalUserPrompt,
        rightUserPrompt: optimizedUserPrompt
      },
      leftUserMessages: [],
      rightUserMessages: []
    }))
  }, [])

  const callAI = useCallback(async (
    side: 'left' | 'right',
    systemPrompt: string,
    messages: ChatMessage[],
    customProvider?: ProviderConfig,
    customModel?: ModelConfig
  ) => {
    const provider = customProvider || currentProvider
    const model = customModel || currentModel

    if (!provider || !model) {
      throw new Error('请先选择AI提供商和模型')
    }

    // 设置生成状态
    setState(prev => ({
      ...prev,
      ...(side === 'left' ? { isLeftGenerating: true } : { isRightGenerating: true })
    }))

    // 创建AI响应消息
    const aiMessageId = `${side}-ai-${Date.now()}`
    const aiMsg: ChatMessage = {
      id: aiMessageId,
      role: 'assistant',
      content: '',
      timestamp: new Date(),
      isStreaming: true
    }

    // 添加消息到状态
    if (state.mode === 'system') {
      setState(prev => ({
        ...prev,
        ...(side === 'left' 
          ? { leftMessages: [...prev.leftMessages, aiMsg] }
          : { rightMessages: [...prev.rightMessages, aiMsg] })
      }))
    } else {
      setState(prev => ({
        ...prev,
        ...(side === 'left'
          ? { leftUserMessages: [...prev.leftUserMessages, aiMsg] }
          : { rightUserMessages: [...prev.rightUserMessages, aiMsg] })
      }))
    }

    try {
      // 构建消息历史
      const apiMessages = [
        { role: 'system' as const, content: systemPrompt },
        ...messages
          .filter(m => m.id !== aiMessageId)
          .map(m => ({ role: m.role, content: m.content }))
      ]

      // 流式回调
      let accumulatedContent = ''
      const streamCallback = (chunk: string) => {
        accumulatedContent += chunk
        setState(prev => {
          const updateMessage = (msgs: ChatMessage[]) =>
            msgs.map(msg => msg.id === aiMessageId 
              ? { ...msg, content: accumulatedContent }
              : msg
            )

          if (state.mode === 'system') {
            return {
              ...prev,
              ...(side === 'left'
                ? { leftMessages: updateMessage(prev.leftMessages) }
                : { rightMessages: updateMessage(prev.rightMessages) })
            }
          } else {
            return {
              ...prev,
              ...(side === 'left'
                ? { leftUserMessages: updateMessage(prev.leftUserMessages) }
                : { rightUserMessages: updateMessage(prev.rightUserMessages) })
            }
          }
        })
      }

      // 调用AI
      const response = await aiService.callAI(
        apiMessages,
        provider,
        model.id,
        true, // 流式输出
        streamCallback
      )

      // 更新最终响应
      setState(prev => {
        const updateMessage = (msgs: ChatMessage[]) =>
          msgs.map(msg => msg.id === aiMessageId
            ? { ...msg, content: response, isStreaming: false }
            : msg
          )

        if (state.mode === 'system') {
          return {
            ...prev,
            ...(side === 'left'
              ? { leftMessages: updateMessage(prev.leftMessages) }
              : { rightMessages: updateMessage(prev.rightMessages) })
          }
        } else {
          return {
            ...prev,
            ...(side === 'left'
              ? { leftUserMessages: updateMessage(prev.leftUserMessages) }
              : { rightUserMessages: updateMessage(prev.rightUserMessages) })
          }
        }
      })
    } catch (error: any) {
      console.error(`${side} AI call failed:`, error)
      setState(prev => {
        const updateMessage = (msgs: ChatMessage[]) =>
          msgs.map(msg => msg.id === aiMessageId
            ? { ...msg, content: `❌ 错误: ${error.message}`, isStreaming: false }
            : msg
          )

        if (state.mode === 'system') {
          return {
            ...prev,
            ...(side === 'left'
              ? { leftMessages: updateMessage(prev.leftMessages) }
              : { rightMessages: updateMessage(prev.rightMessages) })
          }
        } else {
          return {
            ...prev,
            ...(side === 'left'
              ? { leftUserMessages: updateMessage(prev.leftUserMessages) }
              : { rightUserMessages: updateMessage(prev.rightUserMessages) })
          }
        }
      })
    } finally {
      setState(prev => ({
        ...prev,
        ...(side === 'left' ? { isLeftGenerating: false } : { isRightGenerating: false })
      }))
    }
  }, [currentProvider, currentModel, state.mode, aiService])

  const sendSystemMessage = useCallback(async () => {
    if (!state.systemConfig.sharedUserInput.trim() || isGenerating) return

    const userMessage = state.systemConfig.sharedUserInput.trim()
    const userMessageId = `user-${Date.now()}`

    const userMsg: ChatMessage = {
      id: userMessageId,
      role: 'user',
      content: userMessage,
      timestamp: new Date()
    }

    setState(prev => ({
      ...prev,
      systemConfig: { ...prev.systemConfig, sharedUserInput: '' },
      leftMessages: [...prev.leftMessages, { ...userMsg, id: `left-${userMessageId}` }],
      rightMessages: [...prev.rightMessages, { ...userMsg, id: `right-${userMessageId}` }]
    }))

    // 获取更新后的消息
    const updatedState = { ...state }
    updatedState.leftMessages = [...state.leftMessages, { ...userMsg, id: `left-${userMessageId}` }]
    updatedState.rightMessages = [...state.rightMessages, { ...userMsg, id: `right-${userMessageId}` }]

    // 并发调用两侧AI
    await Promise.all([
      callAI('left', state.systemConfig.leftSystemPrompt, updatedState.leftMessages),
      callAI('right', state.systemConfig.rightSystemPrompt, updatedState.rightMessages)
    ])
  }, [state, isGenerating, callAI])

  const sendLeftUserMessage = useCallback(async () => {
    if (!state.userConfig.leftUserPrompt.trim() || state.isLeftGenerating) return

    const userMessage = state.userConfig.leftUserPrompt.trim()
    const userMessageId = `left-user-${Date.now()}`

    const userMsg: ChatMessage = {
      id: userMessageId,
      role: 'user',
      content: userMessage,
      timestamp: new Date()
    }

    setState(prev => ({
      ...prev,
      userConfig: { ...prev.userConfig, leftUserPrompt: '' },
      leftUserMessages: [...prev.leftUserMessages, userMsg]
    }))

    const updatedState = { ...state }
    updatedState.leftUserMessages = [...state.leftUserMessages, userMsg]

    await callAI('left', state.userConfig.sharedSystemPrompt, updatedState.leftUserMessages)
  }, [state, callAI])

  const sendRightUserMessage = useCallback(async () => {
    if (!state.userConfig.rightUserPrompt.trim() || state.isRightGenerating) return

    const userMessage = state.userConfig.rightUserPrompt.trim()
    const userMessageId = `right-user-${Date.now()}`

    const userMsg: ChatMessage = {
      id: userMessageId,
      role: 'user',
      content: userMessage,
      timestamp: new Date()
    }

    setState(prev => ({
      ...prev,
      userConfig: { ...prev.userConfig, rightUserPrompt: '' },
      rightUserMessages: [...prev.rightUserMessages, userMsg]
    }))

    const updatedState = { ...state }
    updatedState.rightUserMessages = [...state.rightUserMessages, userMsg]

    await callAI('right', state.userConfig.sharedSystemPrompt, updatedState.rightUserMessages)
  }, [state, callAI])

  const clearHistory = useCallback((side?: 'left' | 'right') => {
    setState(prev => {
      if (prev.mode === 'system') {
        return {
          ...prev,
          ...(side === 'left' || !side ? { leftMessages: [] } : {}),
          ...(side === 'right' || !side ? { rightMessages: [] } : {})
        }
      } else {
        return {
          ...prev,
          ...(side === 'left' || !side ? { leftUserMessages: [] } : {}),
          ...(side === 'right' || !side ? { rightUserMessages: [] } : {})
        }
      }
    })
  }, [])

  return {
    state,
    isGenerating,
    initSystemComparison,
    initUserComparison,
    sendSystemMessage,
    sendLeftUserMessage,
    sendRightUserMessage,
    clearHistory,
    setState
  }
}
