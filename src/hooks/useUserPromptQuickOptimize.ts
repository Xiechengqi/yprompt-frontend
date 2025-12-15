import { useState, useCallback, useMemo } from 'react'
import { useProviderStore } from '@/stores/providerStore'
import { useOptimizeStore } from '@/stores/optimizeStore'
import { promptConfigManager } from '@/config/prompts'
import { AIService } from '@/services/aiService'
import { parseAIJsonResponse } from '@/utils/jsonParser'
import { post } from '@/services/apiService'

/**
 * 质量分析维度
 */
export interface QualityDimension {
  score: number
  feedback: string
}

/**
 * 质量分析结果
 */
export interface QualityAnalysisResult {
  overall_score: number
  analysis: {
    clarity?: QualityDimension
    specificity?: QualityDimension
    structure?: QualityDimension
    context?: QualityDimension
    completeness?: QualityDimension
    [key: string]: QualityDimension | undefined
  }
  issues?: string[]
}

/**
 * 快速优化结果
 */
export interface QuickOptimizeResult {
  originalPrompt: string
  qualityAnalysis: QualityAnalysisResult
  optimizedPrompt: string | { zh: string; en: string }
  metadata: {
    processingTime: number
    modelUsed: string
    timestamp: Date
  }
}

interface QuickOptimizeState {
  draftPrompt: string
  systemPrompt: string
  conversationHistory: string
  result: QuickOptimizeResult | null
  isOptimizing: boolean
  error: string | null
  isAnalyzing: boolean
  analysisText: string
  isOptimizingPrompt: boolean
  optimizedText: string
  enableQualityAnalysis: boolean
  languageState: 'zh' | 'en'
  isConvertingLanguage: boolean
}

const RESULT_STORAGE_KEY = 'user_prompt_optimize_result'

export function useUserPromptQuickOptimize() {
  const providerStore = useProviderStore()
  const optimizeStore = useOptimizeStore()
  const aiService = AIService.getInstance()

  // 从localStorage加载之前的结果
  const loadResult = useCallback((): QuickOptimizeResult | null => {
    try {
      const saved = localStorage.getItem(RESULT_STORAGE_KEY)
      if (saved) {
        const data = JSON.parse(saved)
        if (data.metadata && data.metadata.timestamp) {
          data.metadata.timestamp = new Date(data.metadata.timestamp)
        }
        return data
      }
    } catch (e) {
      console.error('加载优化结果失败:', e)
    }
    return null
  }, [])

  // 保存结果到localStorage
  const saveResult = useCallback((result: QuickOptimizeResult | null) => {
    try {
      if (result) {
        localStorage.setItem(RESULT_STORAGE_KEY, JSON.stringify(result))
      } else {
        localStorage.removeItem(RESULT_STORAGE_KEY)
      }
    } catch (e) {
      console.error('保存优化结果失败:', e)
    }
  }, [])

  const [state, setState] = useState<QuickOptimizeState>(() => ({
    draftPrompt: '',
    systemPrompt: '',
    conversationHistory: '',
    result: loadResult(),
    isOptimizing: false,
    error: null,
    isAnalyzing: false,
    analysisText: '',
    isOptimizingPrompt: false,
    optimizedText: '',
    enableQualityAnalysis: true,
    languageState: 'zh',
    isConvertingLanguage: false
  }))

  // 计算属性
  const hasInput = useMemo(() => state.draftPrompt.trim().length > 0, [state.draftPrompt])
  const hasResult = useMemo(() => state.result !== null, [state.result])
  const hasError = useMemo(() => state.error !== null, [state.error])

  /**
   * 检测文本语言
   */
  const detectLanguage = useCallback((text: string): string => {
    const chinesePattern = /[\u4e00-\u9fa5]/
    if (chinesePattern.test(text)) {
      return '中文'
    }
    return '英文'
  }, [])

  /**
   * 设置草稿提示词
   */
  const setDraftPrompt = useCallback((prompt: string) => {
    setState((prev) => ({ ...prev, draftPrompt: prompt }))
    clearResult()
  }, [])

  /**
   * 设置系统提示词
   */
  const setSystemPrompt = useCallback((prompt: string) => {
    setState((prev) => ({ ...prev, systemPrompt: prompt }))
  }, [])

  /**
   * 设置对话历史
   */
  const setConversationHistory = useCallback((history: string) => {
    setState((prev) => ({ ...prev, conversationHistory: history }))
  }, [])

  /**
   * 清除结果
   */
  const clearResult = useCallback(() => {
    setState((prev) => ({
      ...prev,
      result: null,
      error: null,
      languageState: 'zh'
    }))
    saveResult(null)
  }, [saveResult])

  /**
   * 快速优化：质量分析 + 优化结果
   */
  const quickOptimize = useCallback(async () => {
    if (!state.draftPrompt.trim()) {
      setState((prev) => ({ ...prev, error: '请输入草稿提示词' }))
      return
    }

    setState((prev) => ({
      ...prev,
      isOptimizing: true,
      error: null,
      analysisText: '',
      optimizedText: ''
    }))

    const startTime = performance.now()

    try {
      const detectedLanguage = detectLanguage(state.draftPrompt)

      const currentProvider = providerStore.currentProvider
      const currentModel = providerStore.currentModel

      if (!currentProvider || !currentModel) {
        throw new Error('请先在顶部选择AI提供商和模型')
      }

      // 构建质量分析请求
      const contextSection = state.conversationHistory
        ? `\n**对话上下文：**\n${state.conversationHistory}\n`
        : ''
      const systemPromptSection = state.systemPrompt
        ? `\n**AI助手的系统提示词：**\n${state.systemPrompt}\n`
        : ''

      const analysisSystemPrompt = `你是专业的用户提示词质量分析师。

**任务：**分析用户草稿提示词的质量，给出评分和建议。
${systemPromptSection}${contextSection}
**❗️ 重要角色说明 ❗️**
- **系统提示词**（如上所示）是**AI助手**的角色设定，不是用户的角色
- **用户草稿**是用户发给AI助手的消息，用户不需要扮演AI助手的角色
- 例如：AI助手是医生，用户是患者；AI助手是翻译，用户是需要翻译服务的人

**分析原则：**
- ✅ 草稿是否与**对话历史连贯**（例如：AI问"多久了"，用户答"三天了"是连贯的）
- ✅ 草稿是否清晰地向AI助手**提出需求或提供信息**
- ❌ 不要要求用户草稿"符合AI助手的角色"（用户不是AI助手！）
- ❌ 不要要求用户草稿包含AI助手才应该提供的内容（如医生的诊断建议）

**分析维度（基于业界最佳实践）：**
1. **清晰度 (clarity)**: 意图是否明确，表达是否清晰，避免歧义
2. **特定性 (specificity)**: 是否具体，细节是否充分，避免模糊和泛泛而谈
3. **结构 (structure)**: 信息是否有组织，逻辑是否清晰，层次是否分明
4. **上下文 (context)**: 是否提供了足够的背景信息、使用场景、目标受众等；是否与对话历史连贯
5. **完整性 (completeness)**: 是否包含所有必要元素（任务、要求、限制、输出格式等）

**评分标准：**
- 90-100: 优秀，几乎无问题
- 70-89: 良好，有小问题但不影响使用
- 50-69: 一般，有明显问题需要优化
- <50: 差，问题较多必须优化

**输出格式（JSON）：**
\`\`\`json
{
  "overall_score": 75,
  "analysis": {
    "clarity": {
      "score": 80,
      "feedback": "意图基本明确，但某些表述略显模糊"
    },
    "specificity": {
      "score": 60,
      "feedback": "缺少具体细节，过于笼统"
    },
    "structure": {
      "score": 70,
      "feedback": "有基本结构，但层次不够清晰"
    },
    "context": {
      "score": 50,
      "feedback": "未提供背景信息和使用场景"
    },
    "completeness": {
      "score": 65,
      "feedback": "缺少输出格式和一些关键要求"
    }
  },
  "issues": [
    "提示词缺少具体的使用场景和目标受众",
    "未明确输出格式和字数要求",
    "缺少必要的背景信息和约束条件"
  ]
}
\`\`\`

**草稿提示词：**
${state.draftPrompt}

**请直接输出JSON，不要其他内容。**`

      const optimizationTemplate = promptConfigManager.getUserPromptQuickOptimization()
      const rules = promptConfigManager.getUserPromptRules()

      const optimizationSystemPrompt = optimizationTemplate
        .replace('{SYSTEM_PROMPT_RULES}', rules)
        .replace('{SYSTEM_PROMPT_CONTEXT}', state.systemPrompt || '无系统提示词')
        .replace('{CONVERSATION_HISTORY}', state.conversationHistory || '无对话历史')
        .replace('{USER_DRAFT_PROMPT}', state.draftPrompt)
        .replace('{VARIABLES_SECTION}', '')
        .replace('{LANGUAGE}', detectedLanguage)

      const analysisMessages = [
        { role: 'system' as const, content: analysisSystemPrompt },
        { role: 'user' as const, content: '请分析这个草稿的问题' }
      ]

      const optimizationMessages = [
        { role: 'system' as const, content: optimizationSystemPrompt },
        { role: 'user' as const, content: '请输出优化后的提示词（只输出优化结果，不要解释）' }
      ]

      let qualityAnalysis: QualityAnalysisResult | null = null

      // 如果启用质量分析，先执行分析
      if (state.enableQualityAnalysis) {
        console.log('🔍 开始质量分析（流式）')

        setState((prev) => ({ ...prev, isAnalyzing: true }))

        let fullAnalysisText = ''
        aiService.setStreamUpdateCallback((chunk: string) => {
          fullAnalysisText += chunk
          setState((prev) => ({ ...prev, analysisText: fullAnalysisText }))
        })

        const qualityAnalysisText = await aiService.callAI(
          analysisMessages,
          currentProvider,
          currentModel.id,
          true
        )
        aiService.clearStreamUpdateCallback()
        setState((prev) => ({ ...prev, isAnalyzing: false }))

        qualityAnalysis = parseAIJsonResponse(qualityAnalysisText) as QualityAnalysisResult | null
        if (!qualityAnalysis) {
          throw new Error('质量分析结果格式错误')
        }

        console.log('✅ 质量分析完成，开始优化结果（流式）')

        // 将质量分析结果注入到优化提示词中
        const analysisContext = `

**质量分析结果（请参考以改进）：**
- 整体评分：${qualityAnalysis.overall_score}/100
- 清晰度：${qualityAnalysis.analysis.clarity?.score}/100 - ${qualityAnalysis.analysis.clarity?.feedback}
- 特定性：${qualityAnalysis.analysis.specificity?.score}/100 - ${qualityAnalysis.analysis.specificity?.feedback}
- 结构：${qualityAnalysis.analysis.structure?.score}/100 - ${qualityAnalysis.analysis.structure?.feedback}
- 上下文：${qualityAnalysis.analysis.context?.score}/100 - ${qualityAnalysis.analysis.context?.feedback}
- 完整性：${qualityAnalysis.analysis.completeness?.score}/100 - ${qualityAnalysis.analysis.completeness?.feedback}
${
  qualityAnalysis.issues && qualityAnalysis.issues.length > 0
    ? `\n**发现的问题：**\n${qualityAnalysis.issues.map((issue, i) => `${i + 1}. ${issue}`).join('\n')}`
    : ''
}

请根据以上分析结果，重点改进低分维度，生成优化后的提示词。`

        optimizationMessages[0].content += analysisContext
      } else {
        console.log('⏭️ 跳过质量分析，直接优化')
      }

      // 优化结果流
      setState((prev) => ({ ...prev, isOptimizingPrompt: true }))
      let fullOptimizedText = ''
      aiService.setStreamUpdateCallback((chunk: string) => {
        fullOptimizedText += chunk
        setState((prev) => ({ ...prev, optimizedText: fullOptimizedText }))
      })

      const optimizedPrompt = await aiService.callAI(
        optimizationMessages,
        currentProvider,
        currentModel.id,
        true
      )
      aiService.clearStreamUpdateCallback()
      setState((prev) => ({ ...prev, isOptimizingPrompt: false }))

      console.log('✅ 优化完成')

      const processingTime = performance.now() - startTime

      const result: QuickOptimizeResult = {
        originalPrompt: state.draftPrompt,
        qualityAnalysis:
          qualityAnalysis || {
            overall_score: 0,
            analysis: {},
            issues: []
          },
        optimizedPrompt: optimizedPrompt.trim(),
        metadata: {
          processingTime,
          modelUsed: providerStore.currentModel?.id || 'unknown',
          timestamp: new Date()
        }
      }

      setState((prev) => ({
        ...prev,
        result,
        languageState: 'zh'
      }))

      saveResult(result)
      console.log(`✅ 优化完成，总耗时: ${processingTime.toFixed(0)}ms`)
    } catch (error: any) {
      console.error('快速优化失败:', error)
      setState((prev) => ({
        ...prev,
        error: error.message || '优化失败，请重试',
        result: null,
        isAnalyzing: false,
        isOptimizingPrompt: false
      }))
      saveResult(null)
    } finally {
      setState((prev) => ({ ...prev, isOptimizing: false }))
    }
  }, [state, providerStore, aiService, detectLanguage, saveResult])

  /**
   * 仅重新生成优化结果
   */
  const regenerateOptimization = useCallback(async () => {
    if (!state.result) {
      setState((prev) => ({ ...prev, error: '没有可用的质量分析结果' }))
      return
    }

    setState((prev) => ({
      ...prev,
      isOptimizing: true,
      error: null,
      optimizedText: ''
    }))

    const startTime = performance.now()

    try {
      const detectedLanguage = detectLanguage(state.draftPrompt)

      const currentProvider = providerStore.currentProvider
      const currentModel = providerStore.currentModel

      if (!currentProvider || !currentModel) {
        throw new Error('请先在顶部选择AI提供商和模型')
      }

      const optimizationTemplate = promptConfigManager.getUserPromptQuickOptimization()
      const rules = promptConfigManager.getUserPromptRules()

      const optimizationSystemPrompt = optimizationTemplate
        .replace('{SYSTEM_PROMPT_RULES}', rules)
        .replace('{SYSTEM_PROMPT_CONTEXT}', state.systemPrompt || '无系统提示词')
        .replace('{CONVERSATION_HISTORY}', state.conversationHistory || '无对话历史')
        .replace('{USER_DRAFT_PROMPT}', state.draftPrompt)
        .replace('{VARIABLES_SECTION}', '')
        .replace('{LANGUAGE}', detectedLanguage)

      const optimizationMessages = [
        { role: 'system' as const, content: optimizationSystemPrompt },
        { role: 'user' as const, content: '请输出优化后的提示词（只输出优化结果，不要解释）' }
      ]

      // 如果有质量分析结果，注入到优化提示词中
      if (
        state.enableQualityAnalysis &&
        state.result.qualityAnalysis &&
        state.result.qualityAnalysis.overall_score > 0
      ) {
        const qualityAnalysis = state.result.qualityAnalysis
        const analysisContext = `

**质量分析结果（请参考以改进）：**
- 整体评分：${qualityAnalysis.overall_score}/100
- 清晰度：${qualityAnalysis.analysis.clarity?.score}/100 - ${qualityAnalysis.analysis.clarity?.feedback}
- 特定性：${qualityAnalysis.analysis.specificity?.score}/100 - ${qualityAnalysis.analysis.specificity?.feedback}
- 结构：${qualityAnalysis.analysis.structure?.score}/100 - ${qualityAnalysis.analysis.structure?.feedback}
- 上下文：${qualityAnalysis.analysis.context?.score}/100 - ${qualityAnalysis.analysis.context?.feedback}
- 完整性：${qualityAnalysis.analysis.completeness?.score}/100 - ${qualityAnalysis.analysis.completeness?.feedback}
${
  qualityAnalysis.issues && qualityAnalysis.issues.length > 0
    ? `\n**发现的问题：**\n${qualityAnalysis.issues.map((issue, i) => `${i + 1}. ${issue}`).join('\n')}`
    : ''
}

请根据以上分析结果，重点改进低分维度，生成优化后的提示词。`

        optimizationMessages[0].content += analysisContext
      }

      // 优化结果流
      setState((prev) => ({ ...prev, isOptimizingPrompt: true }))
      let fullOptimizedText = ''
      aiService.setStreamUpdateCallback((chunk: string) => {
        fullOptimizedText += chunk
        setState((prev) => ({ ...prev, optimizedText: fullOptimizedText }))
      })

      const optimizedPrompt = await aiService.callAI(
        optimizationMessages,
        currentProvider,
        currentModel.id,
        true
      )
      aiService.clearStreamUpdateCallback()
      setState((prev) => ({ ...prev, isOptimizingPrompt: false }))

      console.log('✅ 重新生成优化完成')

      const processingTime = performance.now() - startTime

      // 保留原有的质量分析结果，只更新优化后的提示词
      const updatedResult: QuickOptimizeResult = {
        ...state.result,
        optimizedPrompt: optimizedPrompt.trim(),
        metadata: {
          processingTime,
          modelUsed: providerStore.currentModel?.id || 'unknown',
          timestamp: new Date()
        }
      }

      setState((prev) => ({
        ...prev,
        result: updatedResult,
        languageState: 'zh'
      }))

      saveResult(updatedResult)
      console.log(`✅ 重新生成完成，耗时: ${processingTime.toFixed(0)}ms`)
    } catch (error: any) {
      console.error('重新生成失败:', error)
      setState((prev) => ({
        ...prev,
        error: error.message || '重新生成失败，请重试',
        isOptimizingPrompt: false
      }))
    } finally {
      setState((prev) => ({ ...prev, isOptimizing: false }))
    }
  }, [state, providerStore, aiService, detectLanguage, saveResult])

  /**
   * 切换语言
   */
  const toggleLanguage = useCallback(async () => {
    if (!state.result || state.isConvertingLanguage) return

    const currentPrompt =
      typeof state.result.optimizedPrompt === 'string'
        ? state.result.optimizedPrompt
        : state.languageState === 'zh'
        ? state.result.optimizedPrompt.zh
        : state.result.optimizedPrompt.en

    if (!currentPrompt) return

    const targetLangCode = state.languageState === 'zh' ? 'en' : 'zh'

    // 如果已经是对象格式且目标语言已缓存，直接切换
    if (typeof state.result.optimizedPrompt !== 'string') {
      const targetPrompt =
        targetLangCode === 'zh' ? state.result.optimizedPrompt.zh : state.result.optimizedPrompt.en
      if (targetPrompt) {
        setState((prev) => ({ ...prev, languageState: targetLangCode }))
        saveResult(state.result)
        console.log(`✅ 切换为${targetLangCode === 'zh' ? '中文' : '英文'}（从缓存）`)
        return
      }
    }

    // 需要调用API翻译
    setState((prev) => ({ ...prev, isConvertingLanguage: true }))

    try {
      const currentProvider = providerStore.currentProvider
      const currentModel = providerStore.currentModel

      if (!currentProvider || !currentModel) {
        throw new Error('请先在顶部选择AI提供商和模型')
      }

      const targetLanguage = targetLangCode === 'zh' ? '中文' : '英文'
      const systemPrompt = `你是一个专业的AI提示词翻译助手。你的任务是将提示词翻译为${targetLanguage}，同时保持提示词的专业性、准确性和完整性。

**重要规则**：
1. **必须保留所有原有的格式标记**（如 Markdown 的 #、- 或 XML 的标签）
2. **翻译必须准确传达原意**，特别是技术术语和指令
3. **保持提示词的专业语气和结构**
4. **不要添加任何额外的解释或说明**
5. **直接输出翻译结果，不要包含任何前言或后记**
6. **对于专有名词、技术术语，要使用行业标准译法**`

      const messages = [
        { role: 'system' as const, content: systemPrompt },
        {
          role: 'user' as const,
          content: `请将以下AI提示词翻译为${targetLanguage}：\n\n${currentPrompt}`
        }
      ]

      const response = await aiService.callAI(messages, currentProvider, currentModel.id, false)

      if (response && response.trim()) {
        const cleaned = response.trim()

        // 将结果保存为对象格式
        let updatedResult: QuickOptimizeResult
        if (typeof state.result.optimizedPrompt === 'string') {
          // 如果是旧格式（字符串），转换为对象格式
          const oldContent = state.result.optimizedPrompt
          updatedResult = {
            ...state.result,
            optimizedPrompt: {
              zh: state.languageState === 'zh' ? oldContent : cleaned,
              en: state.languageState === 'en' ? oldContent : cleaned
            }
          }
        } else {
          // 直接保存到对应语言
          updatedResult = {
            ...state.result,
            optimizedPrompt: {
              ...state.result.optimizedPrompt,
              [targetLangCode]: cleaned
            }
          }
        }

        setState((prev) => ({
          ...prev,
          result: updatedResult,
          languageState: targetLangCode,
          isConvertingLanguage: false
        }))
        saveResult(updatedResult)
        console.log(`✅ 翻译为${targetLanguage}（已缓存）`)
      } else {
        throw new Error('翻译结果为空')
      }
    } catch (error: any) {
      console.error('语言转换失败:', error)
      setState((prev) => ({ ...prev, isConvertingLanguage: false }))
      throw error
    }
  }, [state, providerStore, aiService, saveResult])

  /**
   * 复制到剪贴板
   */
  const copyToClipboard = useCallback(async (text: string): Promise<boolean> => {
    try {
      const { copyToClipboard: copyUtil } = await import('@/utils/clipboardUtils')
      await copyUtil(text)
      return true
    } catch (error) {
      console.error('复制失败:', error)
      return false
    }
  }, [])

  /**
   * 保存到我的提示词
   */
  const saveToLibrary = useCallback(
    async (saveData: {
      title: string
      description: string
      tags: string[]
      isPublic: boolean
      systemPrompt: string
      conversationHistory: string
    }) => {
      if (!state.result) {
        throw new Error('没有可保存的优化结果')
      }

      try {
        // 获取优化后的提示词内容
        const promptText =
          typeof state.result.optimizedPrompt === 'string'
            ? state.result.optimizedPrompt
            : state.result.optimizedPrompt.zh || state.result.optimizedPrompt.en

        // 构建严格格式的对话历史JSON
        let formattedConversation = ''
        if (saveData.conversationHistory.trim()) {
          try {
            const parsed = JSON.parse(saveData.conversationHistory)
            formattedConversation = JSON.stringify(parsed)
          } catch (e) {
            throw new Error('对话历史JSON格式错误')
          }
        }

        // 从optimizeStore获取loadedPromptId (如果从"我的"页面加载)
        const currentPromptId = optimizeStore.loadedPromptId

        console.log('💾 用户提示词保存:', {
          promptId: currentPromptId,
          isUpdate: !!currentPromptId,
          title: saveData.title
        })

        // 统一调用保存接口
        const requestBody = {
          ...(currentPromptId ? { id: currentPromptId } : {}),
          title: saveData.title,
          description: saveData.description,
          final_prompt: promptText,
          language: 'zh',
          format: 'markdown',
          prompt_type: 'user',
          tags: saveData.tags,
          is_public: saveData.isPublic ? 1 : 0,
          system_prompt: saveData.systemPrompt,
          conversation_history: formattedConversation,
          create_version: true,
          change_type: 'patch',
          change_summary: saveData.description || '优化用户提示词',
          change_log: '通过用户提示词快速优化功能更新',
          version_tag: 'stable'
        }

        const result = await post('/api/prompts/', requestBody)

        if (result.code !== 200) {
          throw new Error(result.message || '保存失败')
        }

        console.log('✅ 保存成功:', {
          id: result.data.id,
          isNew: result.data.is_new,
          version: result.data.version,
          message: result.data.message
        })

        // 如果是新建,设置loadedPromptId以便下次更新
        if (result.data.is_new) {
          optimizeStore.setLoadedPromptId(result.data.id)
          console.log('🆕 新建提示词,设置loadedPromptId:', result.data.id)
        }

        return {
          success: true,
          id: result.data.id,
          version: result.data.version,
          message: result.data.message
        }
      } catch (error: any) {
        console.error('❌ 保存到我的提示词失败:', error)
        throw error
      }
    },
    [state.result, optimizeStore]
  )

  /**
   * 重置状态
   */
  const reset = useCallback(() => {
    setState({
      draftPrompt: '',
      systemPrompt: '',
      conversationHistory: '',
      result: null,
      error: null,
      isOptimizing: false,
      isAnalyzing: false,
      analysisText: '',
      isOptimizingPrompt: false,
      optimizedText: '',
      enableQualityAnalysis: true,
      languageState: 'zh',
      isConvertingLanguage: false
    })
  }, [])

  return {
    state,
    hasInput,
    hasResult,
    hasError,
    quickOptimize,
    regenerateOptimization,
    copyToClipboard,
    saveToLibrary,
    reset,
    clearResult,
    setDraftPrompt,
    setSystemPrompt,
    setConversationHistory,
    toggleLanguage,
    setEnableQualityAnalysis: (enable: boolean) => {
      setState((prev) => ({ ...prev, enableQualityAnalysis: enable }))
    }
  }
}
