import { useState, useCallback } from 'react'
import { usePromptStore } from '@/stores/promptStore'
import { useNotificationStore } from '@/stores/notificationStore'
import { PromptGeneratorService } from '@/services/promptGeneratorService'
import { AIGuideService } from '@/services/aiGuideService'
import { cleanConvertedResponse } from '@/utils/aiResponseUtils'
import { useEnsureAIConfig } from '@/hooks/useEnsureAIConfig'

interface UsePreviewExecutionParams {
  switchToTabWithScroll: (tab: string) => void
  scrollToBottomOfContent: () => void
}

export function usePreviewExecution({
  switchToTabWithScroll,
  scrollToBottomOfContent
}: UsePreviewExecutionParams) {
  const promptStore = usePromptStore()
  const notificationStore = useNotificationStore()
  const [isExecuting, setIsExecuting] = useState(false)

  // 使用统一的配置确保函数
  const { ensureConfig } = useEnsureAIConfig()

  const regenerateRequirementReport = useCallback(async () => {
    const state = promptStore.getState()
    const hasConversationData = state.chatMessages && state.chatMessages.length > 0
    if (!hasConversationData) {
      notificationStore.warning('需要先与AI助手对话才能重新生成需求描述')
      return
    }

    try {
      setIsExecuting(true)
      promptStore.setCurrentExecutionStep('report')

      // 使用统一的配置确保函数
      const { provider, model } = await ensureConfig()
      console.log('[usePreviewExecution] regenerateRequirementReport 配置成功:', provider.name, model.name)

      const aiGuideService = AIGuideService.getInstance()

      // 获取对话历史
      const validMessages = promptStore.getValidMessages()
      const conversationHistory = validMessages.map(msg => ({
        type: msg.type,
        content: msg.content,
        attachments: msg.attachments || []
      }))

      // 设置流式更新
      let streamContent = ''
      const onStreamUpdate = (chunk: string) => {
        streamContent += chunk
        const currentState = promptStore.getState()
        promptStore.setState({ promptData: { ...currentState.promptData, requirementReport: streamContent } })
        scrollToBottomOfContent()
      }

      // 重新生成需求报告
      const requirementReport = await aiGuideService.generateRequirementReportFromConversation(
        conversationHistory,
        provider,
        model.id,
        onStreamUpdate
      )

      // 确保最终数据正确
      const finalState = promptStore.getState()
      promptStore.setState({ promptData: { ...finalState.promptData, requirementReport } })
      notificationStore.success('需求描述已重新生成')

    } catch (error) {
      notificationStore.error('重新生成需求描述失败，请重试')
    } finally {
      setIsExecuting(false)
      promptStore.setCurrentExecutionStep(null)
    }
  }, [promptStore, notificationStore, scrollToBottomOfContent, ensureConfig])

  const executeFullWorkflow = useCallback(async () => {
    const state = promptStore.getState()
    if (!state.promptData.requirementReport.trim()) {
      notificationStore.warning('请先输入需求描述')
      return
    }

    try {
      setIsExecuting(true)

      // 使用统一的配置确保函数
      let provider, model
      try {
        const config = await ensureConfig()
        provider = config.provider
        model = config.model
        console.log('[usePreviewExecution] executeFullWorkflow 配置成功:', provider.name, model.name)
      } catch (configError) {
        // 配置错误已经在 ensureConfig 中处理了通知，这里只需要重置状态
        console.error('[usePreviewExecution] 配置验证失败:', configError)
        setIsExecuting(false)
        promptStore.setCurrentExecutionStep(null)
        return
      }

      const promptGeneratorService = PromptGeneratorService.getInstance()
      const requirementReport = state.promptData.requirementReport

      promptStore.setCurrentExecutionStep('thinking')
      let step1Content = ''
      let step1Initialized = false
      const onStep1Update = (chunk: string) => {
        step1Content += chunk

        // 首次收到数据时立即切换标签页
        if (!step1Initialized && chunk.trim()) {
          step1Initialized = true
          const currentState = promptStore.getState()
          promptStore.setState({ promptData: { ...currentState.promptData, thinkingPoints: ['正在生成...'] } })
          switchToTabWithScroll('thinking')
        }

        const points = step1Content.split('\n').map(s => s.replace(/^[*-]\s*/, '').trim()).filter(Boolean)
        if (points.length > 0) {
          const currentState = promptStore.getState()
          promptStore.setState({ promptData: { ...currentState.promptData, thinkingPoints: points } })
          scrollToBottomOfContent()
        }
      }
      
      const thinkingPoints = await promptGeneratorService.getSystemPromptThinkingPoints(
        requirementReport,
        model.id,
        'zh',
        [],
        provider,
        onStep1Update
      )
      
      const afterStep1State = promptStore.getState()
      promptStore.setState({ promptData: { ...afterStep1State.promptData, thinkingPoints } })
      
      promptStore.setCurrentExecutionStep('initial')
      let step2Content = ''
      let step2Initialized = false
      const onStep2Update = (chunk: string) => {
        // 首次收到数据时立即切换标签页
        if (!step2Initialized && chunk.trim()) {
          step2Initialized = true
          const currentState = promptStore.getState()
          promptStore.setState({ promptData: { ...currentState.promptData, initialPrompt: '正在生成...' } })
          switchToTabWithScroll('initial')
        }

        step2Content += chunk
        // 如果已经初始化，更新内容
        if (step2Initialized) {
          const currentState = promptStore.getState()
          if (currentState.promptData.initialPrompt === '正在生成...') {
            promptStore.setState({ promptData: { ...currentState.promptData, initialPrompt: chunk } })
          } else {
            promptStore.setState({ promptData: { ...currentState.promptData, initialPrompt: step2Content } })
          }
          scrollToBottomOfContent()
        }
      }
      
      const initialPrompt = await promptGeneratorService.generateSystemPrompt(
        requirementReport,
        model.id,
        'zh',
        [],
        thinkingPoints,
        provider,
        onStep2Update
      )
      
      const afterStep2State = promptStore.getState()
      promptStore.setState({ promptData: { ...afterStep2State.promptData, initialPrompt } })
      
      promptStore.setCurrentExecutionStep('advice')
      let step3Content = ''
      let step3Initialized = false
      const onStep3Update = (chunk: string) => {
        step3Content += chunk

        // 首次收到数据时立即切换标签页
        if (!step3Initialized && chunk.trim()) {
          step3Initialized = true
          const currentState = promptStore.getState()
          promptStore.setState({ promptData: { ...currentState.promptData, advice: ['正在生成...'] } })
          switchToTabWithScroll('advice')
        }

        const adviceList = step3Content.split('\n').map(s => s.replace(/^[*-]\s*/, '').trim()).filter(Boolean)
        if (adviceList.length > 0) {
          const currentState = promptStore.getState()
          promptStore.setState({ promptData: { ...currentState.promptData, advice: adviceList } })
          scrollToBottomOfContent()
        }
      }
      
      const advice = await promptGeneratorService.getOptimizationAdvice(
        initialPrompt,
        'system',
        model.id,
        'zh',
        [],
        provider,
        onStep3Update
      )
      
      const afterStep3State = promptStore.getState()
      promptStore.setState({ promptData: { ...afterStep3State.promptData, advice } })
      
      promptStore.setCurrentExecutionStep('final')
      let step4Content = ''
      let step4Initialized = false
      const onStep4Update = (chunk: string) => {
        // 首次收到数据时立即切换标签页
        if (!step4Initialized && chunk.trim()) {
          step4Initialized = true
          const currentState = promptStore.getState()
          promptStore.setState({ promptData: { ...currentState.promptData, generatedPrompt: '正在生成...' } })
          switchToTabWithScroll('zh')
        }

        step4Content += chunk
        // 如果已经初始化，更新内容
        if (step4Initialized) {
          const currentState = promptStore.getState()
          if (currentState.promptData.generatedPrompt === '正在生成...') {
            promptStore.setState({ promptData: { ...currentState.promptData, generatedPrompt: chunk } })
          } else {
            const currentPrompt = typeof currentState.promptData.generatedPrompt === 'string' 
              ? currentState.promptData.generatedPrompt 
              : ''
            promptStore.setState({ promptData: { ...currentState.promptData, generatedPrompt: currentPrompt + chunk } })
          }
          scrollToBottomOfContent()
        }
      }
      
      const finalPrompt = await promptGeneratorService.applyOptimizationAdvice(
        initialPrompt,
        advice,
        'system',
        model.id,
        'zh',
        [],
        provider,
        onStep4Update
      )
      
      const cleanedFinal = cleanConvertedResponse(finalPrompt)
      const afterStep4State = promptStore.getState()
      promptStore.setState({ promptData: { ...afterStep4State.promptData, generatedPrompt: cleanedFinal } })
      
      switchToTabWithScroll('zh')
      
    } catch (error) {
      console.error('[usePreviewExecution] executeFullWorkflow 错误:', error)
      console.error('[usePreviewExecution] 错误详情:', {
        message: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
        errorType: error instanceof Error ? error.constructor.name : typeof error
      })
      const errorMessage = error instanceof Error ? error.message : '未知错误'
      notificationStore.error(`自动生成提示词失败: ${errorMessage}`)
    } finally {
      setIsExecuting(false)
      promptStore.setCurrentExecutionStep(null)
    }
  }, [promptStore, notificationStore, switchToTabWithScroll, scrollToBottomOfContent, ensureConfig])

  const executeThinkingPoints = useCallback(async () => {
    const state = promptStore.getState()
    if (!state.promptData.requirementReport.trim()) {
      notificationStore.warning('请先输入需求报告')
      return
    }

    try {
      setIsExecuting(true)
      promptStore.setCurrentExecutionStep('thinking')

      // 使用统一的配置确保函数
      const { provider, model } = await ensureConfig()
      console.log('[usePreviewExecution] executeThinkingPoints 配置成功:', provider.name, model.name)

      const promptGeneratorService = PromptGeneratorService.getInstance()
      let streamContent = ''
      let hasInitialized = false

      const onStreamUpdate = (chunk: string) => {
        streamContent += chunk

        // 首次收到有效数据时，立即切换到该标签页并初始化
        if (!hasInitialized && chunk.trim()) {
          hasInitialized = true
          const currentState = promptStore.getState()
          promptStore.setState({ promptData: { ...currentState.promptData, thinkingPoints: ['正在生成...'] } })
          switchToTabWithScroll('thinking')
        }

        // 实时解析并更新关键指令
        const points = streamContent
          .split('\n')
          .map(s => s.replace(/^[*-]\s*/, '').trim())
          .filter(Boolean)

        if (points.length > 0) {
          const currentState = promptStore.getState()
          promptStore.setState({ promptData: { ...currentState.promptData, thinkingPoints: points } })
          // 流式更新时自动滚动到底部
          scrollToBottomOfContent()
        }
      }

      const thinkingPoints = await promptGeneratorService.getSystemPromptThinkingPoints(
        state.promptData.requirementReport,
        model.id,
        'zh',
        [],
        provider,
         onStreamUpdate       )

      const finalState = promptStore.getState()
      promptStore.setState({ promptData: { ...finalState.promptData, thinkingPoints } })

    } catch (error) {
      notificationStore.error('生成关键指令失败，请重试')
    } finally {
      setIsExecuting(false)
      promptStore.setCurrentExecutionStep(null)
    }
  }, [promptStore, notificationStore, switchToTabWithScroll, scrollToBottomOfContent, ensureConfig])

  const executeInitialPrompt = useCallback(async () => {
    const state = promptStore.getState()
    if (!state.promptData.requirementReport.trim() || !state.promptData.thinkingPoints || state.promptData.thinkingPoints.length === 0) {
      notificationStore.warning('请先完成前面的步骤')
      return
    }

    try {
      setIsExecuting(true)
      promptStore.setCurrentExecutionStep('initial')

      // 使用统一的配置确保函数
      const { provider, model } = await ensureConfig()
      console.log('[usePreviewExecution] 配置成功:', provider.name, model.name)

      
      const promptGeneratorService = PromptGeneratorService.getInstance()
      let step2Content = ''
      let hasInitialized = false

      const onStep2Update = (chunk: string) => {
        // 首次收到有效数据时，立即切换到该标签页并初始化
        if (!hasInitialized && chunk.trim()) {
          hasInitialized = true
          const currentState = promptStore.getState()
          promptStore.setState({ promptData: { ...currentState.promptData, initialPrompt: '正在生成...' } })
          switchToTabWithScroll('initial')
        }

        step2Content += chunk
        // 如果已经初始化，追加内容；否则设置内容
        if (hasInitialized) {
          const currentState = promptStore.getState()
          if (currentState.promptData.initialPrompt === '正在生成...') {
            promptStore.setState({ promptData: { ...currentState.promptData, initialPrompt: chunk } })
          } else {
            promptStore.setState({ promptData: { ...currentState.promptData, initialPrompt: step2Content } })
          }
          scrollToBottomOfContent()
        }
      }

      const initialPrompt = await promptGeneratorService.generateSystemPrompt(
        state.promptData.requirementReport,
        model!.id,
        'zh',
        [],
        state.promptData.thinkingPoints,
        provider!,
         onStep2Update       )

      // 最终确保数据正确性 - 清理代码块标记
      const cleanedInitial = cleanConvertedResponse(initialPrompt)
      const finalState = promptStore.getState()
      promptStore.setState({ promptData: { ...finalState.promptData, initialPrompt: cleanedInitial } })

    } catch (error) {
      notificationStore.error('生成初始提示词失败，请重试')
    } finally {
      setIsExecuting(false)
      promptStore.setCurrentExecutionStep(null)
    }
  }, [promptStore, notificationStore, scrollToBottomOfContent, switchToTabWithScroll, ensureConfig])

  const executeAdvice = useCallback(async () => {
    const state = promptStore.getState()
    if (!state.promptData.initialPrompt || !state.promptData.initialPrompt.trim()) {
      notificationStore.warning('请先生成初始提示词')
      return
    }

    try {
      setIsExecuting(true)
      promptStore.setCurrentExecutionStep('advice')

      // 使用统一的配置确保函数
      const { provider, model } = await ensureConfig()
      console.log('[usePreviewExecution] 配置成功:', provider.name, model.name)

      
      const promptGeneratorService = PromptGeneratorService.getInstance()
      let step3Content = ''
      let hasInitialized = false

      const onStep3Update = (chunk: string) => {
        step3Content += chunk

        // 首次收到有效数据时，立即切换到该标签页并初始化
        if (!hasInitialized && chunk.trim()) {
          hasInitialized = true
          const currentState = promptStore.getState()
          promptStore.setState({ promptData: { ...currentState.promptData, advice: ['正在生成...'] } })
          switchToTabWithScroll('advice')
        }

        // 实时解析并更新优化建议
        const adviceList = step3Content
          .split('\n')
          .map(s => s.replace(/^[*-]\s*/, '').trim())
          .filter(Boolean)

        if (adviceList.length > 0) {
          const currentState = promptStore.getState()
          promptStore.setState({ promptData: { ...currentState.promptData, advice: adviceList } })
          scrollToBottomOfContent()
        }
      }

      const advice = await promptGeneratorService.getOptimizationAdvice(
        state.promptData.initialPrompt,
        'system',
        model!.id,
        'zh',
        [],
        provider!,
         onStep3Update       )

      const finalState = promptStore.getState()
      promptStore.setState({ promptData: { ...finalState.promptData, advice } })

    } catch (error) {
      notificationStore.error('生成优化建议失败，请重试')
    } finally {
      setIsExecuting(false)
      promptStore.setCurrentExecutionStep(null)
    }
  }, [promptStore, notificationStore, scrollToBottomOfContent, switchToTabWithScroll, ensureConfig])

  const executeFinalPrompt = useCallback(async () => {
    const state = promptStore.getState()
    if (!state.promptData.initialPrompt || !state.promptData.advice || state.promptData.advice.length === 0) {
      notificationStore.warning('请先完成前面的步骤')
      return
    }

    try {
      setIsExecuting(true)
      promptStore.setCurrentExecutionStep('final')

      // 使用统一的配置确保函数
      const { provider, model } = await ensureConfig()
      console.log('[usePreviewExecution] 配置成功:', provider.name, model.name)

      
      const promptGeneratorService = PromptGeneratorService.getInstance()
      let step4Content = ''
      let hasInitialized = false

      const onStep4Update = (chunk: string) => {
        // 首次收到有效数据时，立即切换到该标签页并初始化
        if (!hasInitialized && chunk.trim()) {
          hasInitialized = true
          const currentState = promptStore.getState()
          promptStore.setState({ promptData: { ...currentState.promptData, generatedPrompt: '正在生成...' } })
          switchToTabWithScroll('zh')
        }

        step4Content += chunk
        // 如果已经初始化，追加内容；否则设置内容
        if (hasInitialized) {
          const currentState = promptStore.getState()
          if (currentState.promptData.generatedPrompt === '正在生成...') {
            promptStore.setState({ promptData: { ...currentState.promptData, generatedPrompt: chunk } })
          } else {
            const currentPrompt = typeof currentState.promptData.generatedPrompt === 'string' 
              ? currentState.promptData.generatedPrompt 
              : ''
            promptStore.setState({ promptData: { ...currentState.promptData, generatedPrompt: currentPrompt + chunk } })
          }
          scrollToBottomOfContent()
        }
      }

      const finalPrompt = await promptGeneratorService.applyOptimizationAdvice(
        state.promptData.initialPrompt,
        state.promptData.advice,
        'system',
        model!.id,
        'zh',
        [],
        provider!,
         onStep4Update       )

      const cleanedFinal = cleanConvertedResponse(finalPrompt)
      const finalState = promptStore.getState()
      promptStore.setState({ promptData: { ...finalState.promptData, generatedPrompt: cleanedFinal } })
      
      switchToTabWithScroll('zh')

    } catch (error) {
      notificationStore.error('生成最终提示词失败，请重试')
    } finally {
      setIsExecuting(false)
      promptStore.setCurrentExecutionStep(null)
    }
  }, [promptStore, notificationStore, switchToTabWithScroll, scrollToBottomOfContent, ensureConfig])

  const regenerateThinkingPoints = useCallback(async () => {
    const state = promptStore.getState()
    if (!state.promptData.requirementReport.trim()) {
      notificationStore.warning('请先输入需求描述')
      return
    }

    try {
      setIsExecuting(true)
      promptStore.setCurrentExecutionStep('thinking')

      // 使用统一的配置确保函数
      const { provider, model } = await ensureConfig()
      console.log('[usePreviewExecution] 配置成功:', provider.name, model.name)

            
      const promptGeneratorService = PromptGeneratorService.getInstance()

      // 初始化流式更新状态
      let streamContent = ''
      let hasInitialized = false

      // 设置流式回调函数
      const onStreamUpdate = (chunk: string) => {
        streamContent += chunk

        // 首次收到有效数据时，立即切换到该标签页并初始化
        if (!hasInitialized && chunk.trim()) {
          hasInitialized = true
          const currentState = promptStore.getState()
          promptStore.setState({ promptData: { ...currentState.promptData, thinkingPoints: ['正在生成...'] } })
          switchToTabWithScroll('thinking')
        }

        // 实时解析并更新关键指令
        const points = streamContent
          .split('\n')
          .map(s => s.replace(/^[*-]\s*/, '').trim())
          .filter(Boolean)

        if (points.length > 0) {
          const currentState = promptStore.getState()
          promptStore.setState({ promptData: { ...currentState.promptData, thinkingPoints: points } })
          // 流式更新时自动滚动到底部
          scrollToBottomOfContent()
        }
      }

      const thinkingPoints = await promptGeneratorService.getSystemPromptThinkingPoints(
        state.promptData.requirementReport,
        model.id,
        'zh',
        [],
        provider,
         onStreamUpdate       )

      // 最终确保数据正确性
      const finalState = promptStore.getState()
      promptStore.setState({ promptData: { ...finalState.promptData, thinkingPoints } })
      notificationStore.success('关键指令已重新生成')

    } catch (error) {
      notificationStore.error('重新生成关键指令失败，请重试')
    } finally {
      setIsExecuting(false)
      promptStore.setCurrentExecutionStep(null)
    }
  }, [promptStore, notificationStore, switchToTabWithScroll, scrollToBottomOfContent, ensureConfig])

  const regenerateInitialPrompt = useCallback(async () => {
    const state = promptStore.getState()
    if (!state.promptData.thinkingPoints || state.promptData.thinkingPoints.length === 0) {
      notificationStore.warning('请先生成关键指令')
      return
    }

    try {
      setIsExecuting(true)
      promptStore.setCurrentExecutionStep('initial')

      // 使用统一的配置确保函数
      const { provider, model } = await ensureConfig()
      console.log('[usePreviewExecution] 配置成功:', provider.name, model.name)

            
      const promptGeneratorService = PromptGeneratorService.getInstance()

      // 初始化流式更新状态
      let hasInitialized = false

      // 设置流式回调函数
      const onStreamUpdate = (chunk: string) => {
        // 首次收到有效数据时，立即切换到该标签页并初始化
        if (!hasInitialized && chunk.trim()) {
          hasInitialized = true
          const currentState = promptStore.getState()
          promptStore.setState({ promptData: { ...currentState.promptData, initialPrompt: '正在生成...' } })
          switchToTabWithScroll('initial')
        }

        // 如果已经初始化，追加内容；否则设置内容
        if (hasInitialized) {
          const currentState = promptStore.getState()
          if (currentState.promptData.initialPrompt === '正在生成...') {
            promptStore.setState({ promptData: { ...currentState.promptData, initialPrompt: chunk } })
          } else {
            const currentContent = currentState.promptData.initialPrompt || ''
            promptStore.setState({ promptData: { ...currentState.promptData, initialPrompt: currentContent + chunk } })
          }
          // 流式更新时自动滚动到底部
          scrollToBottomOfContent()
        }
      }

      const initialPrompt = await promptGeneratorService.generateSystemPrompt(
        state.promptData.requirementReport,
        model.id,
        'zh',
        [],
        state.promptData.thinkingPoints,
        provider,
         onStreamUpdate       )

      // 最终确保数据正确性 - 清理代码块标记
      const cleanedInitial = cleanConvertedResponse(initialPrompt)
      const finalState = promptStore.getState()
      promptStore.setState({ promptData: { ...finalState.promptData, initialPrompt: cleanedInitial } })
      notificationStore.success('初始提示词已重新生成')

    } catch (error) {
      notificationStore.error('重新生成初始提示词失败，请重试')
    } finally {
      setIsExecuting(false)
      promptStore.setCurrentExecutionStep(null)
    }
  }, [promptStore, notificationStore, switchToTabWithScroll, scrollToBottomOfContent, ensureConfig])

  const regenerateAdvice = useCallback(async () => {
    const state = promptStore.getState()
    if (!state.promptData.initialPrompt) {
      notificationStore.error('请先生成初始提示词')
      return
    }

    try {
      setIsExecuting(true)
      promptStore.setCurrentExecutionStep('advice')

      // 使用统一的配置确保函数
      const { provider, model } = await ensureConfig()
      console.log('[usePreviewExecution] 配置成功:', provider.name, model.name)

            
      const promptGeneratorService = PromptGeneratorService.getInstance()

      // 初始化流式更新状态
      let streamContent = ''
      let hasInitialized = false

      // 设置流式回调函数
      const onStreamUpdate = (chunk: string) => {
        streamContent += chunk

        // 首次收到有效数据时，立即切换到该标签页并初始化
        if (!hasInitialized && chunk.trim()) {
          hasInitialized = true
          const currentState = promptStore.getState()
          promptStore.setState({ promptData: { ...currentState.promptData, advice: ['正在生成...'] } })
          switchToTabWithScroll('advice')
        }

        // 实时解析并更新优化建议
        const adviceList = streamContent
          .split('\n')
          .map(s => s.replace(/^[*-]\s*/, '').trim())
          .filter(Boolean)

        if (adviceList.length > 0) {
          const currentState = promptStore.getState()
          promptStore.setState({ promptData: { ...currentState.promptData, advice: adviceList } })
          // 流式更新时自动滚动到底部
          scrollToBottomOfContent()
        }
      }

      const advice = await promptGeneratorService.getOptimizationAdvice(
        state.promptData.initialPrompt,
        'system',
        model.id,
        'zh',
        [],
        provider,
         onStreamUpdate       )

      // 最终确保数据正确性
      const finalState = promptStore.getState()
      promptStore.setState({ promptData: { ...finalState.promptData, advice } })
      notificationStore.success('优化建议已重新生成')

    } catch (error) {
      notificationStore.error('重新生成优化建议失败，请重试')
    } finally {
      setIsExecuting(false)
      promptStore.setCurrentExecutionStep(null)
    }
  }, [promptStore, notificationStore, switchToTabWithScroll, scrollToBottomOfContent, ensureConfig])

  const regenerateFinalPrompt = useCallback(async () => {
    const state = promptStore.getState()
    if (!state.promptData.initialPrompt || !state.promptData.advice) {
      notificationStore.error('请先完成前面的步骤')
      return
    }

    try {
      setIsExecuting(true)
      promptStore.setCurrentExecutionStep('final')

      // 使用统一的配置确保函数
      const { provider, model } = await ensureConfig()
      console.log('[usePreviewExecution] 配置成功:', provider.name, model.name)

            
      const promptGeneratorService = PromptGeneratorService.getInstance()

      // 初始化流式更新状态
      let hasInitialized = false

      // 设置流式回调函数
      const onStreamUpdate = (chunk: string) => {
        // 首次收到有效数据时，立即切换到该标签页并初始化
        if (!hasInitialized && chunk.trim()) {
          hasInitialized = true
          const currentState = promptStore.getState()
          promptStore.setState({ promptData: { ...currentState.promptData, generatedPrompt: '正在生成...' } })
          switchToTabWithScroll('zh')
        }

        // 如果已经初始化，追加内容；否则设置内容
        if (hasInitialized) {
          const currentState = promptStore.getState()
          if (currentState.promptData.generatedPrompt === '正在生成...') {
            promptStore.setState({ promptData: { ...currentState.promptData, generatedPrompt: chunk } })
          } else {
            const currentPrompt = typeof currentState.promptData.generatedPrompt === 'string' 
              ? currentState.promptData.generatedPrompt 
              : ''
            promptStore.setState({ promptData: { ...currentState.promptData, generatedPrompt: currentPrompt + chunk } })
          }
          // 流式更新时自动滚动到底部
          scrollToBottomOfContent()
        }
      }

      const finalPrompt = await promptGeneratorService.applyOptimizationAdvice(
        state.promptData.initialPrompt,
        state.promptData.advice,
        'system',
        model.id,
        'zh',
        [],
        provider,
         onStreamUpdate       )

      // 最终确保数据正确性 - 清理代码块标记
      const cleanedFinal = cleanConvertedResponse(finalPrompt)
      const finalState = promptStore.getState()
      promptStore.setState({ promptData: { ...finalState.promptData, generatedPrompt: cleanedFinal } })
      notificationStore.success('最终提示词已重新生成')

    } catch (error) {
      notificationStore.error('重新生成最终提示词失败，请重试')
    } finally {
      setIsExecuting(false)
      promptStore.setCurrentExecutionStep(null)
    }
  }, [promptStore, notificationStore, switchToTabWithScroll, scrollToBottomOfContent, ensureConfig])

  return {
    isExecuting,
    regenerateRequirementReport,
    executeFullWorkflow,
    executeThinkingPoints,
    executeInitialPrompt,
    executeAdvice,
    executeFinalPrompt,
    regenerateThinkingPoints,
    regenerateInitialPrompt,
    regenerateAdvice,
    regenerateFinalPrompt
  }
}
