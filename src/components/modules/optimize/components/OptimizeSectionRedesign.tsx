import { useState, useEffect, useMemo } from 'react'
import { RefreshCw } from 'lucide-react'
import { useOptimizeStore } from '@/stores/optimizeStore'
import { useNotificationStore } from '@/stores/notificationStore'
import { copyToClipboard } from '@/utils/clipboardUtils'
import { useOptimizeModule } from '@/hooks/useOptimizeModule'
import TabContainer from '@/components/preview/components/common/TabContainer'
import TabButton from '@/components/preview/components/common/TabButton'
import EmptyState from '@/components/preview/components/common/EmptyState'
import AdviceTab from '@/components/preview/components/tabs/AdviceTab'
import FinalTab from '@/components/preview/components/tabs/FinalTab'
import ComparisonPanel from './ComparisonPanel'
import UserPromptQuickOptimize from './quick/UserPromptQuickOptimize'
import SavePromptDialog from '@/components/preview/components/dialogs/SavePromptDialog'
import { post } from '@/services/apiService'
import type { Suggestion } from '@/stores/optimizeStore'

interface OptimizeSectionRedesignProps {
  activeMode: 'system' | 'user' | 'compare'
  onUpdateActiveMode: (mode: 'system' | 'user' | 'compare') => void
}

// localStorage keys
const OPTIMIZE_CACHE_KEY = 'yprompt_optimize_cache'

interface OptimizeCache {
  originalSystemPrompt: string
  optimizedSystemPrompt: string | { zh: string; en: string }
  systemAnalysisResult: any
  systemSuggestions: Suggestion[]
  systemOptimizationStage: number
  activeOptimizeTab: 'analysis' | 'advice' | 'final'
  analysisStreamingText: string
  formatState?: 'markdown' | 'xml'
  languageState?: 'zh' | 'en'
  currentPromptId?: number | null
  currentPromptTitle?: string
}

export default function OptimizeSectionRedesign({
  activeMode,
  onUpdateActiveMode: _onUpdateActiveMode
}: OptimizeSectionRedesignProps) {
  const optimizeStore = useOptimizeStore()
  const notificationStore = useNotificationStore()
  const { analyzePrompt, generateOptimizationAdvice, applyOptimizationAdvice } = useOptimizeModule()

  // 自动/手动模式
  const [isAutoMode, setIsAutoMode] = useState(true)

  // 加载缓存
  const loadCache = (): OptimizeCache | null => {
    try {
      const cached = localStorage.getItem(OPTIMIZE_CACHE_KEY)
      return cached ? JSON.parse(cached) : null
    } catch {
      return null
    }
  }

  // 保存缓存
  const saveCache = (cache: Partial<OptimizeCache>) => {
    try {
      const current = loadCache() || ({} as OptimizeCache)
      const updated = { ...current, ...cache }
      localStorage.setItem(OPTIMIZE_CACHE_KEY, JSON.stringify(updated))
    } catch (e) {
      console.error('Failed to save optimize cache:', e)
    }
  }

  const cache = loadCache()

  const [localSystemPrompt, setLocalSystemPrompt] = useState(
    cache?.originalSystemPrompt || optimizeStore.systemPrompt || ''
  )
  const [originalSystemPrompt, setOriginalSystemPrompt] = useState(cache?.originalSystemPrompt || '')
  const [optimizedSystemPrompt, setOptimizedSystemPrompt] = useState<string | { zh: string; en: string }>(
    cache?.optimizedSystemPrompt || ''
  )
  const [systemSuggestions, setSystemSuggestions] = useState<Suggestion[]>(cache?.systemSuggestions || [])
  const [isGeneratingSystem, setIsGeneratingSystem] = useState(false)
  const [systemAnalysisResult, setSystemAnalysisResult] = useState<any>(cache?.systemAnalysisResult || null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisStreamingText, setAnalysisStreamingText] = useState(cache?.analysisStreamingText || '')
  const [systemOptimizationStage, setSystemOptimizationStage] = useState(cache?.systemOptimizationStage || 0)
  const [activeOptimizeTab, setActiveOptimizeTab] = useState<'analysis' | 'advice' | 'final'>(
    cache?.activeOptimizeTab || 'analysis'
  )
  const [isCopiedAdvice, setIsCopiedAdvice] = useState(false)
  const [isCopiedFinal, setIsCopiedFinal] = useState(false)
  const [isConvertingFormat, setIsConvertingFormat] = useState(false)
  const [isConvertingLanguage, setIsConvertingLanguage] = useState(false)
  const [formatState, setFormatState] = useState<'markdown' | 'xml'>(cache?.formatState || 'markdown')
  const [languageState, setLanguageState] = useState<'zh' | 'en'>(cache?.languageState || 'zh')
  const [isSaving, setIsSaving] = useState(false)
  const [showSaveDialog, setShowSaveDialog] = useState(false)

  // 同步 store 中的 systemPrompt
  useEffect(() => {
    if (optimizeStore.systemPrompt && !localSystemPrompt) {
      setLocalSystemPrompt(optimizeStore.systemPrompt)
      setOriginalSystemPrompt(optimizeStore.systemPrompt)
    }
  }, [optimizeStore.systemPrompt])

  // 监听优化建议，自动切换到建议tab
  useEffect(() => {
    if (systemSuggestions.length > 0 && systemOptimizationStage >= 2 && activeOptimizeTab === 'analysis') {
      // 延迟500ms切换，给用户时间看分析结果
      const timer = setTimeout(() => {
        setActiveOptimizeTab('advice')
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [systemSuggestions, systemOptimizationStage])

  // 将建议转换为文本数组格式以适配AdviceTab
  const optimizeSuggestionsText = useMemo(
    () => systemSuggestions.map((s) => s.description),
    [systemSuggestions]
  )

  // 当前显示的优化后提示词（支持字符串和对象格式）
  const currentOptimizedSystemPrompt = useMemo(() => {
    if (typeof optimizedSystemPrompt === 'string') {
      return optimizedSystemPrompt
    }
    return languageState === 'zh' ? optimizedSystemPrompt.zh : optimizedSystemPrompt.en
  }, [optimizedSystemPrompt, languageState])

  const setCurrentOptimizedSystemPrompt = (value: string) => {
    if (typeof optimizedSystemPrompt === 'string') {
      setOptimizedSystemPrompt(value)
    } else if (languageState === 'zh') {
      setOptimizedSystemPrompt({ ...optimizedSystemPrompt, zh: value })
    } else {
      setOptimizedSystemPrompt({ ...optimizedSystemPrompt, en: value })
    }
  }

  // 处理系统提示词重新开始
  const handleSystemRestart = () => {
    if (confirm('确定要重新开始吗？当前优化进度将被清除。')) {
      setLocalSystemPrompt('')
      setOriginalSystemPrompt('')
      setOptimizedSystemPrompt('')
      setSystemSuggestions([])
      setSystemAnalysisResult(null)
      setSystemOptimizationStage(0)
      setActiveOptimizeTab('analysis')
      setAnalysisStreamingText('')
      setFormatState('markdown')
      setLanguageState('zh')
      setIsConvertingLanguage(false)
      setIsConvertingFormat(false)
      setIsCopiedAdvice(false)
      setIsCopiedFinal(false)
      optimizeStore.resetOptimization()
      localStorage.removeItem(OPTIMIZE_CACHE_KEY)
      notificationStore.success('已重置所有数据')
    }
  }

  // 处理系统提示词优化
  const handleSystemOptimize = async () => {
    if (!localSystemPrompt?.trim()) return

    setOriginalSystemPrompt(localSystemPrompt)
    setIsGeneratingSystem(true)
    setSystemOptimizationStage(0)
    setAnalysisStreamingText('')

    // 重置格式和语言状态为默认值（开始新的优化）
    setFormatState('markdown')
    setLanguageState('zh')

    // 保存原始提示词和重置状态到缓存
    saveCache({
      originalSystemPrompt: localSystemPrompt,
      formatState: 'markdown',
      languageState: 'zh'
    })

    try {
      // 阶段1: 质量分析
      setSystemOptimizationStage(1)
      saveCache({ systemOptimizationStage: 1 })
      setIsAnalyzing(true)

      let fullAnalysisText = ''
      const analysisResult = await analyzePrompt(localSystemPrompt, 'system', (chunk: string) => {
        fullAnalysisText = chunk
        setAnalysisStreamingText(chunk)
      })

      setSystemAnalysisResult(analysisResult)
      setIsAnalyzing(false)

      // 保存分析结果到缓存
      saveCache({
        systemAnalysisResult: analysisResult,
        analysisStreamingText: fullAnalysisText
      })

      // 阶段2: 生成优化建议
      setSystemOptimizationStage(2)
      saveCache({ systemOptimizationStage: 2 })

      // 初始化流式更新
      let adviceStreamContent = ''
      let adviceInitialized = false

      const adviceList = await generateOptimizationAdvice(
        localSystemPrompt,
        'system',
        (chunk: string) => {
          adviceStreamContent += chunk

          // 首次收到数据时初始化
          if (!adviceInitialized && chunk.trim()) {
            adviceInitialized = true
            setSystemSuggestions([
              {
                id: 'temp',
                type: 'modify' as const,
                category: 'role' as const,
                title: '正在生成...',
                description: '正在生成...',
                reason: '',
                expectedEffect: '',
                priority: 'medium' as const
              }
            ])
          }

          // 实时解析并更新建议列表
          const suggestions = adviceStreamContent
            .split('\n')
            .map((s) => s.replace(/^[*-]\s*/, '').trim())
            .filter(Boolean)

          if (suggestions.length > 0) {
            setSystemSuggestions(
              suggestions.map((desc, idx) => ({
                id: `sys_${idx}`,
                type: 'modify' as const,
                category: 'role' as const,
                title: desc.substring(0, 50),
                description: desc,
                reason: '',
                expectedEffect: '',
                priority: 'medium' as const
              }))
            )
          }
        }
      )

      // 将建议文本转换为Suggestion对象
      setSystemSuggestions(
        adviceList.map((advice, index) => ({
          id: `sys_${index}`,
          type: 'modify' as const,
          category: 'role' as const,
          title: advice.substring(0, 50),
          description: advice,
          reason: '',
          expectedEffect: '',
          priority: 'medium' as const
        }))
      )

      // 保存建议到缓存
      saveCache({ systemSuggestions: systemSuggestions })

      // 如果是自动模式,继续生成最终优化结果
      if (isAutoMode) {
        setSystemOptimizationStage(3)
        saveCache({ systemOptimizationStage: 3 })

        // 重置格式和语言状态为默认值（因为生成总是返回markdown/zh）
        setFormatState('markdown')
        setLanguageState('zh')

        // 保存状态重置到缓存
        saveCache({
          formatState: 'markdown',
          languageState: 'zh'
        })

        // 初始化流式更新
        let optimizedInitialized = false

        const optimizedPrompt = await applyOptimizationAdvice(
          localSystemPrompt,
          adviceList,
          'system',
          (chunk: string) => {
            // 首次收到数据时初始化
            if (!optimizedInitialized && chunk.trim()) {
              optimizedInitialized = true
              setOptimizedSystemPrompt('正在生成...')
            }

            // 追加内容
            if (optimizedInitialized) {
              setOptimizedSystemPrompt((prev) => {
                if (prev === '正在生成...' || typeof prev === 'string') {
                  return prev === '正在生成...' ? chunk : prev + chunk
                }
                return { ...prev, zh: prev.zh + chunk }
              })
            }
          }
        )

        setOptimizedSystemPrompt(optimizedPrompt)
        optimizeStore.setOptimizedPrompts(optimizedPrompt, '')

        // 保存优化结果到缓存
        saveCache({
          optimizedSystemPrompt: optimizedPrompt,
          activeOptimizeTab: 'final'
        })
        setActiveOptimizeTab('final')
      } else {
        // 手动模式：切换到建议tab
        setActiveOptimizeTab('advice')
      }
    } catch (error: any) {
      console.error('System optimization failed:', error)
      notificationStore.error(`优化失败: ${error.message}`, 3000)
      // 提供备用建议
      setSystemSuggestions([
        {
          id: 'sys_fallback',
          type: 'modify' as const,
          category: 'role' as const,
          title: '增加更清晰的角色定义和职责说明',
          description: '增加更清晰的角色定义和职责说明',
          reason: '优化了表达方式',
          expectedEffect: '提高提示词清晰度',
          priority: 'high' as const
        }
      ])
    } finally {
      setIsGeneratingSystem(false)
      setIsAnalyzing(false)
    }
  }

  // 手动生成优化建议
  const handleGenerateAdvice = async () => {
    if (!originalSystemPrompt) return

    setIsGeneratingSystem(true)
    setSystemOptimizationStage(2)

    try {
      // 初始化流式更新
      let adviceStreamContent = ''
      let adviceInitialized = false

      const adviceList = await generateOptimizationAdvice(
        originalSystemPrompt,
        'system',
        (chunk: string) => {
          adviceStreamContent += chunk

          // 首次收到数据时初始化
          if (!adviceInitialized && chunk.trim()) {
            adviceInitialized = true
            setSystemSuggestions([
              {
                id: 'temp',
                type: 'modify' as const,
                category: 'role' as const,
                title: '正在生成...',
                description: '正在生成...',
                reason: '',
                expectedEffect: '',
                priority: 'medium' as const
              }
            ])
          }

          // 实时解析并更新建议列表
          const suggestions = adviceStreamContent
            .split('\n')
            .map((s) => s.replace(/^[*-]\s*/, '').trim())
            .filter(Boolean)

          if (suggestions.length > 0) {
            setSystemSuggestions(
              suggestions.map((desc, idx) => ({
                id: `sys_${idx}`,
                type: 'modify' as const,
                category: 'role' as const,
                title: desc.substring(0, 50),
                description: desc,
                reason: '',
                expectedEffect: '',
                priority: 'medium' as const
              }))
            )
          }
        }
      )

      setSystemSuggestions(
        adviceList.map((advice, index) => ({
          id: `sys_${index}`,
          type: 'modify' as const,
          category: 'role' as const,
          title: advice.substring(0, 50),
          description: advice,
          reason: '',
          expectedEffect: '',
          priority: 'medium' as const
        }))
      )

      // 保存建议到缓存
      saveCache({ systemSuggestions: systemSuggestions })
    } catch (error: any) {
      console.error('Failed to generate advice:', error)
      notificationStore.error(`生成建议失败: ${error.message}`, 3000)
    } finally {
      setIsGeneratingSystem(false)
    }
  }

  // 执行最终优化
  const handleExecuteFinalOptimized = async () => {
    if (!originalSystemPrompt || systemSuggestions.length === 0) return

    setIsGeneratingSystem(true)
    setSystemOptimizationStage(3)
    saveCache({ systemOptimizationStage: 3 })

    try {
      // 重置格式和语言状态为默认值
      setFormatState('markdown')
      setLanguageState('zh')

      saveCache({
        formatState: 'markdown',
        languageState: 'zh'
      })

      // 初始化流式更新
      let optimizedInitialized = false
      const adviceTexts = systemSuggestions.map((s) => s.description)

      const optimizedPrompt = await applyOptimizationAdvice(
        originalSystemPrompt,
        adviceTexts,
        'system',
        (chunk: string) => {
          // 首次收到数据时初始化
          if (!optimizedInitialized && chunk.trim()) {
            optimizedInitialized = true
            setOptimizedSystemPrompt('正在生成...')
          }

          // 追加内容
          if (optimizedInitialized) {
            setOptimizedSystemPrompt((prev) => {
              if (prev === '正在生成...' || typeof prev === 'string') {
                return prev === '正在生成...' ? chunk : prev + chunk
              }
              return { ...prev, zh: prev.zh + chunk }
            })
          }
        }
      )

      setOptimizedSystemPrompt(optimizedPrompt)
      optimizeStore.setOptimizedPrompts(optimizedPrompt, '')

      // 保存优化结果到缓存
      saveCache({
        optimizedSystemPrompt: optimizedPrompt,
        activeOptimizeTab: 'final'
      })
      setActiveOptimizeTab('final')
    } catch (error: any) {
      console.error('Failed to generate final optimized prompt:', error)
      notificationStore.error(`生成优化结果失败: ${error.message}`, 3000)
    } finally {
      setIsGeneratingSystem(false)
    }
  }

  // 处理复制建议
  const handleCopyAdvice = async () => {
    try {
      await copyToClipboard(optimizeSuggestionsText.join('\n'))
      setIsCopiedAdvice(true)
      notificationStore.success('已复制到剪贴板', 2000)
      setTimeout(() => setIsCopiedAdvice(false), 2000)
    } catch (error) {
      notificationStore.error('复制失败', 2000)
    }
  }

  // 处理复制最终结果
  const handleCopyFinal = async () => {
    try {
      await copyToClipboard(currentOptimizedSystemPrompt)
      setIsCopiedFinal(true)
      notificationStore.success('已复制到剪贴板', 2000)
      setTimeout(() => setIsCopiedFinal(false), 2000)
    } catch (error) {
      notificationStore.error('复制失败', 2000)
    }
  }

  // 处理保存提示词
  const handleSavePrompt = () => {
    setShowSaveDialog(true)
  }

  const handleSaveConfirm = async (formData: {
    title: string
    description: string
    tags: string[]
    isPublic: boolean
    promptType: string
  }) => {
    setIsSaving(true)
    try {
      const result = await post('/api/prompts/', {
        title: formData.title,
        description: formData.description,
        final_prompt: currentOptimizedSystemPrompt,
        language: 'zh',
        format: formatState,
        prompt_type: formData.promptType,
        tags: formData.tags,
        is_public: formData.isPublic ? 1 : 0
      })

      if (result.code === 200) {
        notificationStore.success('提示词保存成功！', 2000)
        setShowSaveDialog(false)
      } else {
        throw new Error(result.message || '保存失败')
      }
    } catch (error: any) {
      console.error('保存失败:', error)
      notificationStore.error(`保存失败: ${error.message}`, 3000)
    } finally {
      setIsSaving(false)
    }
  }

  // 处理对比（暂时未使用）
  // const handleCompareSystemPrompt = () => {
  //   localStorage.setItem('yprompt_trigger_compare', 'true')
  //   onUpdateActiveMode('compare')
  // }

  // 获取评分样式类
  const getScoreClass = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getScoreBarClass = (score: number) => {
    if (score >= 80) return 'bg-green-500'
    if (score >= 60) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  const getAnalysisLabel = (key: string) => {
    const labels: Record<string, string> = {
      role: '角色定义',
      task: '任务描述',
      format: '输出格式',
      constraints: '约束条件',
      example: '示例说明',
      language: '语言表达'
    }
    return labels[key] || key
  }

  // 用户提示词优化模式
  if (activeMode === 'user') {
    return <UserPromptQuickOptimize />
  }

  // 效果对比模式
  if (activeMode === 'compare') {
    return <ComparisonPanel />
  }

  // 系统提示词优化模式
  return (
    <div className="w-full h-full min-h-0 overflow-hidden flex flex-row gap-4">
      {/* 输入区 */}
      <div className="flex flex-col flex-1 min-h-0">
        <div className="bg-white rounded-lg shadow-sm flex flex-col h-full p-4 min-h-0 overflow-hidden">
          <div className="mb-4 flex-shrink-0 flex items-center justify-between">
            <div>
              <h4 className="text-base font-semibold text-gray-800 mb-2">系统提示词</h4>
            </div>
            <button
              onClick={handleSystemRestart}
              className="flex items-center gap-1 px-3 py-1 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
              title="重新开始"
            >
              <RefreshCw className="w-4 h-4" />
              <span>重新开始</span>
            </button>
          </div>

          {/* 文本输入区域 */}
          <div className="flex-1 flex flex-col min-h-0">
            <textarea
              value={localSystemPrompt}
              onChange={(e) => setLocalSystemPrompt(e.target.value)}
              placeholder="在此输入系统提示词...

例如：你是一个专业的英语老师"
              className="w-full h-full p-3 border border-gray-300 rounded-lg focus:outline-none resize-none text-sm"
            />

            <div className="flex items-center justify-between text-xs text-gray-500 mt-2 flex-shrink-0">
              <span>{localSystemPrompt?.length || 0} 字符</span>
              <span>{Math.ceil((localSystemPrompt?.length || 0) / 4)} tokens</span>
            </div>
          </div>

          {/* 底部按钮 */}
          <div className="mt-4 flex justify-end flex-shrink-0">
            <button
              onClick={handleSystemOptimize}
              disabled={!localSystemPrompt?.trim() || isGeneratingSystem}
              className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
            >
              {isGeneratingSystem && (
                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              )}
              <span>{isGeneratingSystem ? '分析优化中...' : '分析并优化'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 预览区 */}
      <div className="flex flex-col flex-1 min-h-0">
        <div className="bg-white rounded-lg shadow-sm flex flex-col h-full min-h-0 overflow-hidden">
          {/* 预览头部 */}
          <div className="p-4 border-b border-gray-200 flex items-center justify-between flex-shrink-0">
            <h4 className="font-semibold text-gray-800">优化预览</h4>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isAutoMode}
                    onChange={(e) => setIsAutoMode(e.target.checked)}
                    className="sr-only peer"
                  />
                  <span className="text-sm text-gray-600">{isAutoMode ? '自动：' : '手动：'}</span>
                  <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>

          {/* 内容区域 */}
          {systemOptimizationStage === 0 ? (
            <div className="flex-1 flex flex-col min-h-0 overflow-hidden p-4">
              <EmptyState />
            </div>
          ) : (
            <div className="flex-1 flex flex-col min-h-0 overflow-hidden p-4">
              {/* Tab Container */}
              <TabContainer isGenerating={isGeneratingSystem}>
                <TabButton
                  isActive={activeOptimizeTab === 'analysis'}
                  activeClass="bg-orange-500 text-white"
                  onClick={() => setActiveOptimizeTab('analysis')}
                >
                  质量分析
                </TabButton>

                {systemOptimizationStage >= 2 && (
                  <TabButton
                    isActive={activeOptimizeTab === 'advice'}
                    activeClass="bg-yellow-500 text-white"
                    onClick={() => setActiveOptimizeTab('advice')}
                  >
                    优化建议
                  </TabButton>
                )}

                {systemOptimizationStage >= 3 && (
                  <TabButton
                    isActive={activeOptimizeTab === 'final'}
                    activeClass="bg-blue-500 text-white"
                    onClick={() => setActiveOptimizeTab('final')}
                  >
                    优化结果
                  </TabButton>
                )}
              </TabContainer>

              {/* 质量分析 Tab */}
              {activeOptimizeTab === 'analysis' && (
                <div className="flex-1 flex flex-col min-h-0">
                  {isAnalyzing ? (
                    <div className="flex-1 flex flex-col overflow-hidden">
                      <div className="flex-1 overflow-y-auto bg-gray-50 rounded-lg p-4">
                        <pre className="text-xs text-gray-700 whitespace-pre-wrap font-mono">
                          {analysisStreamingText || 'AI正在分析中...'}
                        </pre>
                      </div>
                    </div>
                  ) : systemAnalysisResult ? (
                    <div className="flex-1 flex flex-col min-h-0">
                      <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                        {/* 整体评分 */}
                        <div className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="text-sm font-medium text-gray-700">整体评分</h4>
                            <span className={`text-2xl font-bold ${getScoreClass(systemAnalysisResult.overall_score)}`}>
                              {systemAnalysisResult.overall_score}/100
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div
                              className={`h-3 rounded-full transition-all duration-500 ${getScoreBarClass(
                                systemAnalysisResult.overall_score
                              )}`}
                              style={{ width: `${systemAnalysisResult.overall_score}%` }}
                            ></div>
                          </div>
                        </div>

                        {/* 详细分析维度 */}
                        {systemAnalysisResult.analysis && (
                          <div className="grid grid-cols-2 gap-3">
                            {Object.entries(systemAnalysisResult.analysis).map(([key, item]: [string, any]) => (
                              <div key={key} className="border border-gray-200 rounded-lg p-3 hover:shadow-sm transition-shadow">
                                <div className="flex items-center justify-between mb-2">
                                  <span className="text-xs font-medium text-gray-700">{getAnalysisLabel(key)}</span>
                                  <span className={`text-lg font-bold ${getScoreClass(item.score)}`}>{item.score}</span>
                                </div>
                                <p className="text-xs text-gray-600">{item.feedback}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* 手动模式下的执行按钮 */}
                      {!isAutoMode && systemOptimizationStage === 1 && (
                        <div className="pt-4 mt-4 border-t border-gray-100 flex justify-end flex-shrink-0">
                          <button
                            onClick={handleGenerateAdvice}
                            disabled={isGeneratingSystem}
                            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
                          >
                            {isGeneratingSystem && (
                              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                              </svg>
                            )}
                            <span>{isGeneratingSystem ? '生成中...' : '生成优化建议'}</span>
                          </button>
                        </div>
                      )}
                    </div>
                  ) : null}
                </div>
              )}

              {/* 优化建议 Tab */}
              {activeOptimizeTab === 'advice' && (
                <AdviceTab
                  advice={optimizeSuggestionsText}
                  setAdvice={(_newAdvice: string[]) => {
                    // 将字符串数组转换为建议对象数组
                    // 这里简化处理，只更新文本内容
                  }}
                  isAutoMode={isAutoMode}
                  isExecuting={isGeneratingSystem}
                  isGenerating={isGeneratingSystem}
                  currentExecutionStep={systemOptimizationStage === 3 ? 'final' : 'advice'}
                  isCopied={isCopiedAdvice}
                  onRegenerate={handleGenerateAdvice}
                  onCopy={handleCopyAdvice}
                  onAddItem={() => {
                    // AdviceTab 的 onAddItem 不接受参数
                    // 如果需要添加项目，应该通过其他方式处理
                  }}
                  onRemoveItem={(index: number) => {
                    setSystemSuggestions(systemSuggestions.filter((_, i) => i !== index))
                  }}
                  onUpdateItem={(index: number, newValue: string) => {
                    setSystemSuggestions(
                      systemSuggestions.map((s, i) => (i === index ? { ...s, description: newValue } : s))
                    )
                  }}
                  onExecuteFinal={handleExecuteFinalOptimized}
                />
              )}

              {/* 优化结果 Tab */}
              {activeOptimizeTab === 'final' && (
                <FinalTab
                  generatedPrompt={currentOptimizedSystemPrompt}
                  setGeneratedPrompt={setCurrentOptimizedSystemPrompt}
                  isExecuting={false}
                  isGenerating={isGeneratingSystem}
                  currentExecutionStep={null}
                  isCopied={isCopiedFinal}
                  isConvertingFormat={isConvertingFormat}
                  isConvertingLanguage={isConvertingLanguage}
                  isSaving={isSaving}
                  formatState={formatState}
                  languageState={languageState}
                  onRegenerate={handleExecuteFinalOptimized}
                  onCopy={handleCopyFinal}
                  onToggleFormat={() => {
                    // TODO: 实现格式转换
                    notificationStore.info('格式转换功能开发中...', 2000)
                  }}
                  onToggleLanguage={() => {
                    // TODO: 实现语言转换
                    notificationStore.info('语言转换功能开发中...', 2000)
                  }}
                  onSavePrompt={handleSavePrompt}
                />
              )}
            </div>
          )}
        </div>
      </div>

      {/* 保存提示词对话框 */}
      {showSaveDialog && (
        <SavePromptDialog
          isOpen={showSaveDialog}
          promptContent={currentOptimizedSystemPrompt}
          isSaving={isSaving}
          onSave={handleSaveConfirm}
          onCancel={() => setShowSaveDialog(false)}
        />
      )}
    </div>
  )
}
