import { useEffect, useMemo, useCallback } from 'react'
import { usePromptStore } from '@/stores/promptStore'
import { useProviderStore } from '@/stores/providerStore'
import { useNotificationStore } from '@/stores/notificationStore'
import { AIGuideService } from '@/services/aiGuideService'
import { AIService } from '@/services/aiService'
import { PromptGeneratorService } from '@/services/promptGeneratorService'
import { getPromptGeneratorConfig } from '@/config/promptGenerator'
import { cleanAIResponse, checkAIDecision } from '@/utils/aiResponseUtils'
import type { useChatMessages } from './useChatMessages'
import type { useChatModel } from './useChatModel'
import type { useChatInput } from './useChatInput'
import type { useChatAttachments } from './useChatAttachments'
import type { useChatQuickReplies } from './useChatQuickReplies'

interface UseChatLogicParams {
  chatMessages: ReturnType<typeof useChatMessages>
  chatModel: ReturnType<typeof useChatModel>
  chatInput: ReturnType<typeof useChatInput>
  chatAttachments: ReturnType<typeof useChatAttachments>
  chatQuickReplies: ReturnType<typeof useChatQuickReplies>
}

export function useChatLogic({
  chatMessages,
  chatModel,
  chatInput,
  chatAttachments,
  chatQuickReplies
}: UseChatLogicParams) {
  const promptStore = usePromptStore()
  const providerStore = useProviderStore()
  const notificationStore = useNotificationStore()
  const config = getPromptGeneratorConfig()
  const aiGuideService = AIGuideService.getInstance()

  const isAbortError = useCallback((error: unknown) => {
    return (error instanceof DOMException && error.name === 'AbortError') || (error as any)?.name === 'AbortError'
  }, [])

  const chatContainerMaxHeight = useMemo(() => {
    let baseCalculation = 345
    let attachmentExtraHeight = 0
    if (chatAttachments.currentAttachments.length > 0) {
      attachmentExtraHeight = 115
    }
    const totalReduction = baseCalculation + attachmentExtraHeight
    return `calc(100vh - ${totalReduction}px)`
  }, [chatAttachments.currentAttachments.length])

  useEffect(() => {
    chatMessages.scrollToBottom()
  }, [promptStore.chatMessages.length, chatMessages])

  useEffect(() => {
    chatMessages.scrollToBottom()
  }, [promptStore.isTyping, chatMessages.scrollToBottom])

  const initializeChat = useCallback(async () => {
    const state = promptStore.getState()
    if (state.chatMessages.length === 0 && !state.isInitialized) {
      promptStore.setState({ isInitialized: true })
      await chatMessages.simulateTyping(config.welcomeMessage, false)
    }
  }, [promptStore, chatMessages, config])

  const clearChat = useCallback(() => {
    promptStore.clearChat()
    chatQuickReplies.setShowQuickReplies(false)
    chatAttachments.clearAttachments()
    
    setTimeout(async () => {
      await chatMessages.simulateTyping(config.welcomeMessage, false)
      promptStore.setState({ isInitialized: true })
    }, 500)
  }, [promptStore, chatQuickReplies, chatAttachments, chatMessages, config])

  const generatePrompt = useCallback(async (provider: any, modelId: string) => {
    try {
      promptStore.clearProgressMessages()

      const validMessages = promptStore.getValidMessages()
      const conversationHistory = validMessages.map(msg => ({
        type: msg.type,
        content: msg.content,
        attachments: msg.attachments || []
      }))
      
      promptStore.setIsGenerating(true)
      promptStore.setCurrentExecutionStep('report')
      promptStore.addOrUpdateProgressMessage('🔄 正在基于对话生成需求报告...', 'progress')
      
      const initState = promptStore.getState()
      promptStore.setState({ promptData: { ...initState.promptData, requirementReport: '' } })
      
      const onReportStreamUpdate = (chunk: string) => {
        const state = promptStore.getState()
        promptStore.promptData.requirementReport = (state.promptData.requirementReport || '') + chunk
        // 触发状态更新
        promptStore.setState({ promptData: { ...state.promptData, requirementReport: state.promptData.requirementReport + chunk } })
      }
      
      const requirementReport = await aiGuideService.generateRequirementReportFromConversation(
        conversationHistory,
        provider,
        modelId,
        providerStore.streamMode ? onReportStreamUpdate : undefined
      )

      if (!providerStore.streamMode) {
        const state = promptStore.getState()
        promptStore.setState({ promptData: { ...state.promptData, requirementReport } })
      }
      promptStore.setShowPreview(true)
      
      const state = promptStore.getState()
      if (state.isAutoMode) {
        promptStore.addOrUpdateProgressMessage('✅ 需求报告已生成！正在自动执行完整的提示词生成流程...', 'progress')
        
        const promptGeneratorService = PromptGeneratorService.getInstance()
        
        promptStore.setCurrentExecutionStep('thinking')
        promptStore.addOrUpdateProgressMessage('🔄 步骤 1/4: 正在分析需求并生成关键指令...', 'progress')
        
        let step1Content = ''
        const onStep1Update = (chunk: string) => {
          step1Content += chunk
          const points = step1Content.split('\n').map(s => s.replace(/^[*-]\s*/, '').trim()).filter(Boolean)
          if (points.length > 0) {
            const step1State = promptStore.getState()
            promptStore.setState({ promptData: { ...step1State.promptData, thinkingPoints: points } })
          }
        }
        
        const step1State = promptStore.getState()
        const thinkingPoints = await promptGeneratorService.getSystemPromptThinkingPoints(
          step1State.promptData.requirementReport || requirementReport,
          modelId,
          'zh',
          [],
          provider,
          providerStore.streamMode ? onStep1Update : undefined
        )
        
        if (!providerStore.streamMode) {
          const afterStep1State = promptStore.getState()
          promptStore.setState({ promptData: { ...afterStep1State.promptData, thinkingPoints } })
        }
        
        promptStore.setCurrentExecutionStep('initial')
        promptStore.addOrUpdateProgressMessage('🔄 步骤 2/4: 正在基于关键指令生成初始提示词...', 'progress')
        
        const step2State = promptStore.getState()
        promptStore.setState({ promptData: { ...step2State.promptData, initialPrompt: '' } })
        const onStep2Update = (chunk: string) => {
          const state = promptStore.getState()
          const newInitialPrompt = (state.promptData.initialPrompt || '') + chunk
          promptStore.setState({ promptData: { ...state.promptData, initialPrompt: newInitialPrompt } })
        }
        
        const step2StateForPrompt = promptStore.getState()
        const initialPrompt = await promptGeneratorService.generateSystemPrompt(
          step2StateForPrompt.promptData.requirementReport || requirementReport,
          modelId,
          'zh',
          [],
          step2StateForPrompt.promptData.thinkingPoints || thinkingPoints,
          provider,
          providerStore.streamMode ? onStep2Update : undefined
        )
        
        if (!providerStore.streamMode) {
          const afterStep2State = promptStore.getState()
          promptStore.setState({ promptData: { ...afterStep2State.promptData, initialPrompt } })
        }
        
        promptStore.setCurrentExecutionStep('advice')
        promptStore.addOrUpdateProgressMessage('🔄 步骤 3/4: 正在分析提示词并生成优化建议...', 'progress')
        
        let step3Content = ''
        const onStep3Update = (chunk: string) => {
          step3Content += chunk
          const adviceList = step3Content.split('\n').map(s => s.replace(/^[*-]\s*/, '').trim()).filter(Boolean)
          if (adviceList.length > 0) {
            const step3State = promptStore.getState()
            promptStore.setState({ promptData: { ...step3State.promptData, advice: adviceList } })
          }
        }
        
        const step3StateForAdvice = promptStore.getState()
        const advice = await promptGeneratorService.getOptimizationAdvice(
          step3StateForAdvice.promptData.initialPrompt || initialPrompt,
          'system',
          modelId,
          'zh',
          [],
          provider,
          providerStore.streamMode ? onStep3Update : undefined
        )
        
        if (!providerStore.streamMode) {
          const afterStep3State = promptStore.getState()
          promptStore.setState({ promptData: { ...afterStep3State.promptData, advice } })
        }
        
        promptStore.setCurrentExecutionStep('final')
        promptStore.addOrUpdateProgressMessage('🔄 步骤 4/4: 正在应用优化建议，生成最终提示词...', 'progress')
        
        const step4InitState = promptStore.getState()
        promptStore.setState({ promptData: { ...step4InitState.promptData, generatedPrompt: '' } })
        const onStep4Update = (chunk: string) => {
          const step4State = promptStore.getState()
          const currentPrompt = typeof step4State.promptData.generatedPrompt === 'string' 
            ? step4State.promptData.generatedPrompt 
            : ('zh' in step4State.promptData.generatedPrompt ? step4State.promptData.generatedPrompt.zh : '')
          const newPrompt = currentPrompt + chunk
          promptStore.setState({ promptData: { ...step4State.promptData, generatedPrompt: newPrompt } })
        }
        
        const step4StateForFinal = promptStore.getState()
        const finalPrompt = await promptGeneratorService.applyOptimizationAdvice(
          step4StateForFinal.promptData.initialPrompt || initialPrompt,
          step4StateForFinal.promptData.advice || advice,
          'system',
          modelId,
          'zh',
          [],
          provider,
          providerStore.streamMode ? onStep4Update : undefined
        )
        
        if (!providerStore.streamMode) {
          const afterStep4State = promptStore.getState()
          promptStore.setState({ promptData: { ...afterStep4State.promptData, generatedPrompt: finalPrompt } })
        }
        promptStore.addOrUpdateProgressMessage('✅ 已为您生成高质量的AI提示词！右侧可查看完整的生成过程和最终结果。', 'progress')
        
      } else {
        promptStore.addOrUpdateProgressMessage('✅ 需求报告已生成！请在右侧预览面板中查看，您可以手动执行每个步骤。', 'progress')
      }
      
      promptStore.isGenerating = false
      promptStore.currentExecutionStep = null
      
    } catch (error: unknown) {
      promptStore.setIsGenerating(false)
      promptStore.setCurrentExecutionStep(null)

      if (isAbortError(error)) {
        notificationStore.info('生成已中断')
        return
      }

      const errorMessage = error instanceof Error ? error.message : String(error)
      notificationStore.error(`提示词生成失败: ${errorMessage}。请检查网络连接和API配置后重试`)
    }
  }, [promptStore, providerStore, aiGuideService, notificationStore, isAbortError])

  const sendMessage = useCallback(async (userInput: string) => {
    if (!userInput.trim()) {
      if (chatAttachments.currentAttachments.length > 0) {
        notificationStore.warning('请输入消息内容，不能只发送附件')
      }
      return
    }
    
    // 确保 providerStore 已初始化
    if (!providerStore.isInitialized) {
      console.log('[useChatLogic] providerStore 未初始化，尝试初始化...')
      try {
        await providerStore.initialize()
        // 等待一下，确保状态已更新
        await new Promise(resolve => setTimeout(resolve, 100))
      } catch (error) {
        console.error('[useChatLogic] 初始化 providerStore 失败:', error)
        notificationStore.error('无法加载AI模型配置，请检查网络连接')
        return
      }
    }

    // 如果初始化后仍然没有选择，尝试从 store 获取最新的状态
    const storeState = useProviderStore.getState()
    if (!storeState.selectedProviderId && storeState.enabledProviders.length > 0) {
      const firstProvider = storeState.enabledProviders[0]
      console.log('[useChatLogic] 检测到没有选择，自动选择第一个提供商:', firstProvider.name)
      storeState.setSelectedProvider(firstProvider.id)
      if (firstProvider.models.length > 0) {
        storeState.setSelectedModel(firstProvider.models[0].id)
      }
      // 等待状态更新
      await new Promise(resolve => setTimeout(resolve, 50))
    }

    const { provider, model } = chatModel.getCurrentChatModel()

    console.log('[useChatLogic] sendMessage 检查模型配置:', {
      provider,
      model,
      hasProvider: !!provider,
      hasModel: !!model,
      providerName: provider?.name,
      modelName: model?.name,
      isInitialized: providerStore.isInitialized,
      providersCount: providerStore.providers.length,
      selectedProviderId: providerStore.selectedProviderId,
      selectedModelId: providerStore.selectedModelId
    })

    if (!provider || !model) {
      // 添加详细的调试信息
      const providerStoreState = {
        selectedProviderId: providerStore.selectedProviderId,
        selectedModelId: providerStore.selectedModelId,
        providersCount: providerStore.providers.length,
        isInitialized: providerStore.isInitialized,
        enabledProvidersCount: providerStore.enabledProviders.length
      }

      console.error('[useChatLogic] 模型配置检测失败:', {
        providerStoreState,
        currentProvider: providerStore.currentProvider,
        currentModel: providerStore.currentModel,
        enabledProviders: providerStore.enabledProviders.map(p => ({ id: p.id, name: p.name, modelsCount: p.models.length }))
      })

      // 如果 providers 已加载但没有选择，提示用户选择
      if (providerStore.isInitialized && providerStore.enabledProviders.length > 0) {
        notificationStore.warning('请先在导航栏选择AI模型，或在右上角设置中配置AI模型和API密钥')
      } else if (!providerStore.isInitialized) {
        notificationStore.error('AI模型配置加载中，请稍候再试')
      } else {
        notificationStore.warning('请先在右上角设置中配置AI模型和API密钥')
      }
      return
    }

    promptStore.clearProgressMessages()

    const currentInput = userInput
    const attachments = [...chatAttachments.currentAttachments]
    
    const isForceGenerate = chatQuickReplies.checkForceGenerate(currentInput)
    
    promptStore.addMessage('user', currentInput, attachments)
    
    chatInput.clearInput()
    chatAttachments.clearAttachments()
    chatQuickReplies.setShowQuickReplies(false)
    
    if (isForceGenerate) {
      await chatMessages.simulateTyping('好的,我将立即为您生成需求报告。', false)

      setTimeout(async () => {
        const globalProvider = providerStore.currentProvider
        const globalModel = providerStore.currentModel
        if (globalProvider && globalModel) {
          await generatePrompt(globalProvider, globalModel.id)
        }
      }, 800)
      return
    }

    promptStore.setIsTyping(true)
    promptStore.setIsGenerating(true)

    try {
      const useStreamMode = chatModel.isStreamMode
      
      if (useStreamMode) {
        const aiService = AIService.getInstance()
        
        let streamingContent = ''
        let messageIndex = -1
        
        aiService.setStreamUpdateCallback((chunk: string) => {
          if (messageIndex === -1) {
            messageIndex = chatMessages.startStreamingMessage()
          }
          streamingContent += chunk
          const cleanContent = cleanAIResponse(streamingContent)
          chatMessages.updateStreamingMessage(messageIndex, cleanContent)
          chatMessages.scrollToBottom()
        })
        
        const validMessages = promptStore.getValidMessages()
        const conversationHistory = validMessages.map(msg => ({
          type: msg.type,
          content: msg.content,
          attachments: msg.attachments || []
        }))
        
        const aiResponse = await aiGuideService.generateSimpleResponse(
          '',
          conversationHistory,
          provider,
          model.id,
          useStreamMode
        )

        aiService.clearStreamUpdateCallback()

        if (useStreamMode && messageIndex === -1) {
          messageIndex = chatMessages.startStreamingMessage()
          const cleanContent = cleanAIResponse(aiResponse)
          chatMessages.updateStreamingMessage(messageIndex, cleanContent)
        } else if (useStreamMode && streamingContent.trim() === '') {
          const cleanContent = cleanAIResponse(aiResponse)
          chatMessages.updateStreamingMessage(messageIndex, cleanContent)
        }

        const shouldEndConversation = checkAIDecision(aiResponse)
        
        promptStore.setIsTyping(false)
        promptStore.setIsGenerating(false)
        
        if (shouldEndConversation || aiResponse.includes('基于我们的对话，我现在为您生成需求报告：')) {
          setTimeout(async () => {
            const globalProvider = providerStore.currentProvider
            const globalModel = providerStore.currentModel
            if (globalProvider && globalModel) {
              await generatePrompt(globalProvider, globalModel.id)
            }
          }, 800)
        }
      } else {
        const validMessages = promptStore.getValidMessages()
        const conversationHistory = validMessages.map(msg => ({
          type: msg.type,
          content: msg.content,
          attachments: msg.attachments || []
        }))
        const aiResponse = await aiGuideService.generateSimpleResponse(
          '',
          conversationHistory,
          provider,
          model.id,
          useStreamMode
        )

        const shouldEndConversation = checkAIDecision(aiResponse)
        
        if (shouldEndConversation || aiResponse.includes('基于我们的对话，我现在为您生成需求报告：')) {
          const cleanResponse = cleanAIResponse(aiResponse)
          await chatMessages.simulateTyping(cleanResponse, false)

          promptStore.setIsGenerating(false)

          setTimeout(async () => {
            const globalProvider = providerStore.currentProvider
            const globalModel = providerStore.currentModel
            if (globalProvider && globalModel) {
              await generatePrompt(globalProvider, globalModel.id)
            }
          }, 800)
        } else {
          const cleanResponse = cleanAIResponse(aiResponse)
          await chatMessages.simulateTyping(cleanResponse, false)
          
          promptStore.isGenerating = false
        }
      }
      } catch (error: unknown) {
      promptStore.setIsTyping(false)
      promptStore.setIsGenerating(false)

      if (isAbortError(error)) {
        if (chatModel.isStreamMode) {
          const aiService = AIService.getInstance()
          aiService.clearStreamUpdateCallback()
        }
        return
      }

      const errorMessage = error instanceof Error ? error.message : String(error)
      notificationStore.error(`发生错误: ${errorMessage}`)

      if (chatModel.isStreamMode) {
        const aiService = AIService.getInstance()
        aiService.clearStreamUpdateCallback()
      }
    }
  }, [
    chatAttachments,
    chatModel,
    chatInput,
    chatQuickReplies,
    chatMessages,
    promptStore,
    providerStore,
    notificationStore,
    aiGuideService,
    generatePrompt,
    isAbortError
  ])

  const regenerateMessage = useCallback(async (messageId: string, messageIndex: number, provider: any, model: any) => {
    const message = promptStore.chatMessages.find(msg => msg.id === messageId)
    if (!message || message.type !== 'ai') {
      return
    }

    if (!provider || !model) {
      notificationStore.warning('请先在右上角设置中配置AI模型和API密钥')
      return
    }

    try {
      promptStore.clearProgressMessages()
      
      const contextMessages = promptStore.getValidMessages().slice(0, messageIndex)
      const conversationHistory = contextMessages.map(msg => ({
        type: msg.type,
        content: msg.content,
        attachments: msg.attachments || []
      }))
      
      promptStore.setIsTyping(true)
      
      if (chatModel.isStreamMode) {
        const aiService = AIService.getInstance()
        
        let streamingContent = ''
        
        aiService.setStreamUpdateCallback((chunk: string) => {
          streamingContent += chunk
          const cleanContent = cleanAIResponse(streamingContent)
          promptStore.updateMessage(messageId, cleanContent)
          chatMessages.scrollToBottom()
        })
        
        const aiResponse = await aiGuideService.generateSimpleResponse(
          '',
          conversationHistory,
          provider,
          model.id,
          true
        )

        aiService.clearStreamUpdateCallback()
        
        const finalContent = cleanAIResponse(aiResponse)
        promptStore.updateMessage(messageId, finalContent)
        
      } else {
        const aiResponse = await aiGuideService.generateSimpleResponse(
          '',
          conversationHistory,
          provider,
          model.id,
          false
        )
        
        const cleanResponse = cleanAIResponse(aiResponse)
        promptStore.updateMessage(messageId, cleanResponse)
      }
      
      promptStore.setIsTyping(false)
      notificationStore.success('消息已重新生成')
      
    } catch (error: unknown) {
      promptStore.setIsTyping(false)

      if (isAbortError(error)) {
        if (chatModel.isStreamMode) {
          const aiService = AIService.getInstance()
          aiService.clearStreamUpdateCallback()
        }
        return
      }

      const errorMessage = error instanceof Error ? error.message : String(error)
      notificationStore.error(`重新生成失败: ${errorMessage}`)

      if (chatModel.isStreamMode) {
        const aiService = AIService.getInstance()
        aiService.clearStreamUpdateCallback()
      }
    }
  }, [promptStore, chatModel, notificationStore, aiGuideService, chatMessages, isAbortError])

  const resendUserMessage = useCallback(async (messageId: string, messageIndex: number, provider: any, model: any) => {
    const message = promptStore.chatMessages.find(msg => msg.id === messageId)
    if (!message || message.type !== 'user') {
      return
    }

    if (!provider || !model) {
      notificationStore.warning('请先在右上角设置中配置AI模型和API密钥')
      return
    }

    try {
      promptStore.clearProgressMessages()
      
      if (messageIndex !== -1) {
        for (let i = messageIndex + 1; i < promptStore.chatMessages.length; i++) {
          const msg = promptStore.chatMessages[i]
          if (msg && !msg.isProgress) {
            promptStore.deleteMessage(msg.id!)
          }
        }
      }

      promptStore.setIsTyping(true)

      const useStreamMode = chatModel.isStreamMode
      
      if (useStreamMode) {
        const aiService = AIService.getInstance()
        
        let streamingContent = ''
        let msgIndex = -1
        
        aiService.setStreamUpdateCallback((chunk: string) => {
          if (msgIndex === -1) {
            msgIndex = chatMessages.startStreamingMessage()
          }
          streamingContent += chunk
          const cleanContent = cleanAIResponse(streamingContent)
          chatMessages.updateStreamingMessage(msgIndex, cleanContent)
          chatMessages.scrollToBottom()
        })
        
        const validMessages = promptStore.getValidMessages()
        const conversationHistory = validMessages.map(msg => ({
          type: msg.type,
          content: msg.content,
          attachments: msg.attachments || []
        }))
        const aiResponse = await aiGuideService.generateSimpleResponse(
          '',
          conversationHistory,
          provider,
          model.id,
          useStreamMode
        )

        aiService.clearStreamUpdateCallback()

        const shouldEndConversation = checkAIDecision(aiResponse)
        
        promptStore.setIsTyping(false)
        
        if (shouldEndConversation || aiResponse.includes('基于我们的对话，我现在为您生成需求报告：')) {
          setTimeout(async () => {
            const globalProvider = providerStore.currentProvider
            const globalModel = providerStore.currentModel
            if (globalProvider && globalModel) {
              await generatePrompt(globalProvider, globalModel.id)
            }
          }, 800)
        }
      } else {
        const validMessages = promptStore.getValidMessages()
        const conversationHistory = validMessages.map(msg => ({
          type: msg.type,
          content: msg.content,
          attachments: msg.attachments || []
        }))
        const aiResponse = await aiGuideService.generateSimpleResponse(
          '',
          conversationHistory,
          provider,
          model.id,
          useStreamMode
        )

        const shouldEndConversation = checkAIDecision(aiResponse)
        
        if (shouldEndConversation || aiResponse.includes('基于我们的对话，我现在为您生成需求报告：')) {
          const cleanResponse = cleanAIResponse(aiResponse)
          await chatMessages.simulateTyping(cleanResponse, false)

          promptStore.setIsTyping(false)

          setTimeout(async () => {
            const globalProvider = providerStore.currentProvider
            const globalModel = providerStore.currentModel
            if (globalProvider && globalModel) {
              await generatePrompt(globalProvider, globalModel.id)
            }
          }, 800)
        } else {
          const cleanResponse = cleanAIResponse(aiResponse)
          await chatMessages.simulateTyping(cleanResponse, false)
          
          promptStore.setIsTyping(false)
        }
      }
    } catch (error: unknown) {
      promptStore.setIsTyping(false)
      promptStore.setIsGenerating(false)

      if (isAbortError(error)) {
        if (chatModel.isStreamMode) {
          const aiService = AIService.getInstance()
          aiService.clearStreamUpdateCallback()
        }
        return
      }

      const errorMessage = error instanceof Error ? error.message : String(error)
      notificationStore.error(`重新发送失败: ${errorMessage}`)

      if (chatModel.isStreamMode) {
        const aiService = AIService.getInstance()
        aiService.clearStreamUpdateCallback()
      }
    }
  }, [
    promptStore,
    chatModel,
    chatMessages,
    providerStore,
    notificationStore,
    aiGuideService,
    generatePrompt,
    isAbortError
  ])

  const interruptGeneration = useCallback(() => {
    aiGuideService.interruptCurrentRequest()
    promptStore.setIsTyping(false)
    promptStore.setIsGenerating(false)
    promptStore.setCurrentExecutionStep(null)
  }, [aiGuideService, promptStore])

  return {
    chatContainerMaxHeight,
    initializeChat,
    clearChat,
    sendMessage,
    generatePrompt,
    regenerateMessage,
    resendUserMessage,
    interruptGeneration
  }
}
