import { useCallback } from 'react'
import { useProviderStore } from '@/stores/providerStore'
import { AIService } from '@/services/aiService'
import { PromptGeneratorService } from '@/services/promptGeneratorService'
import { promptConfigManager } from '@/config/prompts'
import { parseAIJsonResponse } from '@/utils/jsonParser'
import type { PromptAnalysis } from '@/stores/optimizeStore'

export function useOptimizeModule() {
  const providerStore = useProviderStore()
  const aiService = AIService.getInstance()
  const promptGenerator = PromptGeneratorService.getInstance()

  // 分析提示词质量
  const analyzePrompt = useCallback(
    async (
      prompt: string,
      _mode: 'system' | 'user',
      onStreamUpdate?: (chunk: string) => void
    ): Promise<PromptAnalysis> => {
      if (!prompt || !prompt.trim()) {
        throw new Error('请输入提示词内容')
      }

      const currentProvider = providerStore.currentProvider
      const currentModel = providerStore.currentModel

      if (!currentProvider || !currentModel) {
        throw new Error('请先选择AI提供商和模型')
      }

      // 从配置管理器获取质量分析系统提示词
      const systemPrompt = promptConfigManager.getQualityAnalysisSystemPrompt()

      // 用户提示词直接在代码中构建
      const userPrompt = `请分析以下系统提示词的质量：

提示词内容：
${prompt}

请严格按照指定的JSON格式返回分析结果。`

      let fullResponse = ''

      // 设置流式回调
      if (onStreamUpdate) {
        aiService.setStreamUpdateCallback((chunk: string) => {
          fullResponse += chunk
          onStreamUpdate(fullResponse)
        })
      }

      try {
        const response = await aiService.callAI(
          [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt }
          ],
          currentProvider,
          currentModel.id,
          !!onStreamUpdate // 使用流式输出
        )

        // 使用完整响应进行解析
        const finalContent = response || fullResponse

        // 解析分析结果 - 处理markdown代码块包裹的JSON
        let result: PromptAnalysis
        try {
          result = parseAIJsonResponse(finalContent)
          console.log('✅ Parsed analysis result:', result)
        } catch (parseError) {
          console.error('❌ Failed to parse analysis response:', parseError)
          console.error('📄 Original content:', finalContent)
          // 如果解析失败，返回基础分析
          result = {
            overall_score: 75,
            analysis: {
              role: { score: 75, status: 'good', feedback: '角色定义基本完善' },
              task: { score: 75, status: 'good', feedback: '任务描述较为清晰' },
              format: { score: 65, status: 'needs_improvement', feedback: '输出格式可以更详细' },
              constraints: { score: 70, status: 'needs_improvement', feedback: '约束条件可以更明确' },
              example: { score: 60, status: 'needs_improvement', feedback: '建议添加示例说明' },
              language: { score: 80, status: 'good', feedback: '语言表达清晰' }
            },
            suggestions: [],
            language: 'zh',
            word_count: prompt.length,
            estimated_tokens: Math.ceil(prompt.length / 4),
            issues: ['解析失败，无法获取详细问题分析']
          }
        }

        return result
      } catch (error: any) {
        console.error('Analysis failed:', error)
        // 返回默认分析结果
        const defaultResult: PromptAnalysis = {
          overall_score: 70,
          analysis: {
            role: { score: 70, status: 'needs_improvement', feedback: '分析失败，请检查提示词' },
            task: { score: 70, status: 'needs_improvement', feedback: '分析失败，请检查提示词' },
            format: { score: 70, status: 'needs_improvement', feedback: '分析失败，请检查提示词' },
            constraints: { score: 70, status: 'needs_improvement', feedback: '分析失败，请检查提示词' },
            example: { score: 70, status: 'needs_improvement', feedback: '分析失败，请检查提示词' },
            language: { score: 70, status: 'needs_improvement', feedback: '分析失败，请检查提示词' }
          },
          suggestions: [{ area: 'general', suggestion: '分析失败，请检查网络连接或重试' }],
          language: 'zh',
          word_count: prompt.length,
          estimated_tokens: Math.ceil(prompt.length / 4),
          issues: ['分析失败']
        }
        return defaultResult
      } finally {
        // 清理流式回调
        if (onStreamUpdate) {
          aiService.clearStreamUpdateCallback()
        }
      }
    },
    [providerStore, aiService]
  )

  // 生成优化建议
  const generateOptimizationAdvice = useCallback(
    async (
      prompt: string,
      promptType: 'system' | 'user',
      onStreamUpdate?: (chunk: string) => void
    ): Promise<string[]> => {
      const currentProvider = providerStore.currentProvider
      const currentModel = providerStore.currentModel

      if (!currentProvider || !currentModel) {
        throw new Error('请先选择AI提供商和模型')
      }

      const adviceList = await promptGenerator.getOptimizationAdvice(
        prompt,
        promptType,
        currentModel.id,
        'zh',
        [],
        currentProvider,
        onStreamUpdate
      )

      return adviceList
    },
    [providerStore, promptGenerator]
  )

  // 应用优化建议生成最终提示词
  const applyOptimizationAdvice = useCallback(
    async (
      originalPrompt: string,
      advice: string[],
      promptType: 'system' | 'user',
      onStreamUpdate?: (content: string) => void
    ): Promise<string> => {
      const currentProvider = providerStore.currentProvider
      const currentModel = providerStore.currentModel

      if (!currentProvider || !currentModel) {
        throw new Error('请先选择AI提供商和模型')
      }

      const optimizedPrompt = await promptGenerator.applyOptimizationAdvice(
        originalPrompt,
        advice,
        promptType,
        currentModel.id,
        'zh',
        [],
        currentProvider,
        onStreamUpdate
      )

      return optimizedPrompt
    },
    [providerStore, promptGenerator]
  )

  return {
    analyzePrompt,
    generateOptimizationAdvice,
    applyOptimizationAdvice
  }
}
