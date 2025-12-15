import { useState, useEffect, useMemo } from 'react'
import { Sparkles, Copy, Check, RefreshCw, ArrowLeftRight } from 'lucide-react'
import { useUserPromptQuickOptimize } from '@/hooks/useUserPromptQuickOptimize'
import { useNotificationStore } from '@/stores/notificationStore'
import QuickOptimizeInput from './QuickOptimizeInput'
import SaveUserPromptDialog from '../dialogs/SaveUserPromptDialog'

const ACTIVE_TAB_KEY = 'yprompt_user_optimize_active_tab'

export default function UserPromptQuickOptimize() {
  const optimizeState = useUserPromptQuickOptimize()
  const notificationStore = useNotificationStore()

  const [activeTab, setActiveTab] = useState<'analysis' | 'result'>('analysis')
  const [copied, setCopied] = useState(false)
  const [saving, setSaving] = useState(false)
  const [editablePrompt, setEditablePrompt] = useState('')
  const [showSaveDialog, setShowSaveDialog] = useState(false)

  // 从localStorage恢复activeTab
  useEffect(() => {
    try {
      const savedTab = localStorage.getItem(ACTIVE_TAB_KEY)
      if (savedTab && ['analysis', 'result'].includes(savedTab)) {
        setActiveTab(savedTab as 'analysis' | 'result')
      }
    } catch (e) {
      console.error('读取activeTab失败:', e)
    }
  }, [])

  // 优化阶段：0-未开始，1-分析中或分析完成，2-全部完成
  const optimizationStage = useMemo(() => {
    if (!optimizeState.state.isOptimizing && !optimizeState.hasResult) return 0

    // 如果禁用质量分析，直接进入阶段2
    if (!optimizeState.state.enableQualityAnalysis) {
      return optimizeState.state.isOptimizingPrompt || optimizeState.hasResult ? 2 : 0
    }

    // 启用质量分析的情况
    if (optimizeState.state.isAnalyzing) return 1
    if (
      !optimizeState.state.isAnalyzing &&
      (optimizeState.state.isOptimizingPrompt || optimizeState.hasResult)
    )
      return 2
    return 0
  }, [
    optimizeState.state.isOptimizing,
    optimizeState.hasResult,
    optimizeState.state.enableQualityAnalysis,
    optimizeState.state.isAnalyzing,
    optimizeState.state.isOptimizingPrompt
  ])

  const handleOptimize = async () => {
    // 根据质量分析开关设置初始tab
    const newTab = optimizeState.state.enableQualityAnalysis ? 'analysis' : 'result'
    setActiveTab(newTab)
    localStorage.setItem(ACTIVE_TAB_KEY, newTab)
    await optimizeState.quickOptimize()
  }

  const handleRegenerate = async () => {
    // 直接切换到结果Tab（因为不需要重新分析）
    setActiveTab('result')
    localStorage.setItem(ACTIVE_TAB_KEY, 'result')
    await optimizeState.regenerateOptimization()
  }

  const handleCopy = async (text: string) => {
    const success = await optimizeState.copyToClipboard(text)
    if (success) {
      setCopied(true)
      notificationStore.success('已复制到剪贴板')
      setTimeout(() => setCopied(false), 2000)
    } else {
      notificationStore.error('复制失败')
    }
  }

  // 打开保存弹窗
  const handleSave = () => {
    setShowSaveDialog(true)
  }

  // 实际保存操作
  const handleConfirmSave = async (saveData: {
    title: string
    description: string
    tags: string[]
    isPublic: boolean
    systemPrompt: string
    conversationHistory: string
  }) => {
    setSaving(true)
    try {
      const result = await optimizeState.saveToLibrary(saveData)

      // 根据返回结果显示不同的提示
      if (typeof result === 'object' && result.version) {
        // 更新现有提示词，显示版本号
        notificationStore.success(`提示词已更新至版本 ${result.version}`)
      } else {
        // 新建提示词
        notificationStore.success('已保存到我的提示词')
      }

      setShowSaveDialog(false)
    } catch (error: any) {
      notificationStore.error(error.message || '保存失败')
    } finally {
      setSaving(false)
    }
  }

  // 取消保存
  const handleCancelSave = () => {
    setShowSaveDialog(false)
  }

  // 质量分析完成后自动切换到结果Tab
  useEffect(() => {
    if (
      !optimizeState.state.isAnalyzing &&
      optimizeState.state.isOptimizingPrompt &&
      activeTab === 'analysis'
    ) {
      // 分析刚完成，开始优化，自动切换到结果Tab
      setTimeout(() => {
        setActiveTab('result')
        localStorage.setItem(ACTIVE_TAB_KEY, 'result')
      }, 300)
    }
  }, [optimizeState.state.isAnalyzing, optimizeState.state.isOptimizingPrompt, activeTab])

  // 监听activeTab变化，保存到localStorage
  useEffect(() => {
    try {
      localStorage.setItem(ACTIVE_TAB_KEY, activeTab)
    } catch (e) {
      console.error('保存activeTab失败:', e)
    }
  }, [activeTab])

  // 当前显示的提示词（支持字符串和对象格式）
  const currentOptimizedPrompt = useMemo(() => {
    if (!optimizeState.state.result?.optimizedPrompt) return ''

    if (typeof optimizeState.state.result.optimizedPrompt === 'string') {
      return optimizeState.state.result.optimizedPrompt
    }

    return optimizeState.state.languageState === 'zh'
      ? optimizeState.state.result.optimizedPrompt.zh
      : optimizeState.state.result.optimizedPrompt.en
  }, [optimizeState.state.result, optimizeState.state.languageState])

  // 同步优化结果到可编辑文本框
  useEffect(() => {
    if (currentOptimizedPrompt) {
      setEditablePrompt(currentOptimizedPrompt)
    }
  }, [currentOptimizedPrompt])

  // 辅助函数：评分颜色
  const getScoreClass = (score: number): string => {
    if (score >= 90) return 'text-green-600'
    if (score >= 70) return 'text-blue-600'
    if (score >= 50) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getScoreBarClass = (score: number): string => {
    if (score >= 90) return 'bg-green-500'
    if (score >= 70) return 'bg-blue-500'
    if (score >= 50) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  // 维度标签映射
  const getAnalysisLabel = (key: string): string => {
    const labels: Record<string, string> = {
      clarity: '清晰度',
      specificity: '特定性',
      structure: '结构',
      context: '上下文',
      completeness: '完整性'
    }
    return labels[key] || key
  }

  // 语言转换
  const handleToggleLanguage = async () => {
    try {
      await optimizeState.toggleLanguage()
      notificationStore.success('语言转换成功')
    } catch (error: any) {
      notificationStore.error(error.message || '语言转换失败')
    }
  }

  // 重新开始 - 清除所有数据
  const handleRestart = () => {
    // 清除优化结果
    optimizeState.clearResult()

    // 重置UI状态
    setActiveTab('analysis')
    localStorage.setItem(ACTIVE_TAB_KEY, 'analysis')
    setCopied(false)
    setEditablePrompt('')

    notificationStore.success('已重置所有数据')
  }

  // 处理用户提示词对比
  const handleCompare = () => {
    if (
      !optimizeState.state.draftPrompt ||
      !optimizeState.hasResult ||
      !optimizeState.state.result
    ) {
      notificationStore.warning('需要先完成优化才能对比')
      return
    }

    // 获取优化后的提示词
    const optimizedPrompt =
      typeof optimizeState.state.result.optimizedPrompt === 'string'
        ? optimizeState.state.result.optimizedPrompt
        : optimizeState.state.languageState === 'zh'
        ? optimizeState.state.result.optimizedPrompt.zh
        : optimizeState.state.result.optimizedPrompt.en

    // 通过 localStorage 传递数据给 ComparisonPanel
    const comparisonData = {
      mode: 'user',
      systemPrompt: optimizeState.state.systemPrompt || '',
      originalPrompt: optimizeState.state.draftPrompt,
      optimizedPrompt: optimizedPrompt,
      conversationHistory: optimizeState.state.conversationHistory || ''
    }

    localStorage.setItem('yprompt_comparison_data', JSON.stringify(comparisonData))
    localStorage.setItem('yprompt_trigger_compare', 'true')
    console.log('🔵 准备用户提示词对比:', comparisonData)
  }

  // 从localStorage加载从"我的"页面传递过来的用户提示词
  useEffect(() => {
    const loadUserPromptFromLibrary = () => {
      try {
        const savedData = localStorage.getItem('yprompt_optimize_loaded_user_prompt')
        if (savedData) {
          const data = JSON.parse(savedData)
          console.log('🟢 UserPromptQuickOptimize: 从库加载数据:', {
            draftPrompt: data.draftPrompt?.substring(0, 50),
            systemPrompt: data.systemPrompt?.substring(0, 50),
            conversationHistory: data.conversationHistory?.substring(0, 50)
          })

          optimizeState.setDraftPrompt(data.draftPrompt || '')
          optimizeState.setSystemPrompt(data.systemPrompt || '')
          optimizeState.setConversationHistory(data.conversationHistory || '')

          console.log('🟢 已设置到optimizeState:', {
            draftPrompt: optimizeState.state.draftPrompt?.substring(0, 50),
            systemPrompt: optimizeState.state.systemPrompt?.substring(0, 50),
            conversationHistory: optimizeState.state.conversationHistory?.substring(0, 50)
          })

          // 清除localStorage，避免重复加载
          localStorage.removeItem('yprompt_optimize_loaded_user_prompt')
        }
      } catch (e) {
        console.error('加载用户提示词失败:', e)
      }
    }

    loadUserPromptFromLibrary()

    // 监听localStorage变化（处理父组件异步加载的情况）
    const handleStorageChange = () => {
      const newValue = localStorage.getItem('yprompt_optimize_loaded_user_prompt')
      if (newValue) {
        requestAnimationFrame(() => {
          loadUserPromptFromLibrary()
        })
      }
    }

    window.addEventListener('storage', handleStorageChange)
    // 使用自定义事件监听（因为同源页面localStorage变化不会触发storage事件）
    const interval = setInterval(() => {
      const newValue = localStorage.getItem('yprompt_optimize_loaded_user_prompt')
      if (newValue) {
        loadUserPromptFromLibrary()
      }
    }, 100)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      clearInterval(interval)
    }
  }, [optimizeState])

  return (
    <>
      <div className="h-full min-h-0 overflow-hidden grid grid-cols-2 gap-4">
        {/* 输入区 */}
        <div className="flex flex-col min-h-0">
          <QuickOptimizeInput
            draftPrompt={optimizeState.state.draftPrompt}
            systemPrompt={optimizeState.state.systemPrompt}
            conversationHistory={optimizeState.state.conversationHistory}
            isOptimizing={optimizeState.state.isOptimizing}
            onUpdateDraftPrompt={optimizeState.setDraftPrompt}
            onUpdateSystemPrompt={optimizeState.setSystemPrompt}
            onUpdateConversationHistory={optimizeState.setConversationHistory}
            onOptimize={handleOptimize}
            onRestart={handleRestart}
          />
        </div>

        {/* 结果区 */}
        <div className="flex flex-col min-h-0">
          <div className="bg-white rounded-lg shadow-sm flex flex-col h-full min-h-0 overflow-hidden">
            {/* 预览头部 */}
            <div className="p-4 border-b border-gray-200 flex items-center justify-between flex-shrink-0">
              <h4 className="font-semibold text-gray-800">优化预览</h4>
              <div className="flex items-center space-x-2">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={optimizeState.state.enableQualityAnalysis}
                    onChange={(e) => optimizeState.setEnableQualityAnalysis(e.target.checked)}
                    disabled={optimizeState.state.isOptimizing}
                    className="sr-only peer"
                  />
                  <span className="text-sm text-gray-600 mr-2">质量分析：</span>
                  <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 peer-disabled:opacity-50 peer-disabled:cursor-not-allowed"></div>
                </label>
              </div>
            </div>

            {/* 空状态 */}
            {optimizationStage === 0 && (
              <div className="flex-1 flex flex-col min-h-0 overflow-hidden p-4">
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center text-gray-400">
                    <Sparkles className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p className="text-sm">输入草稿提示词后点击"开始优化"</p>
                  </div>
                </div>
              </div>
            )}

            {/* 有结果或正在优化 */}
            {optimizationStage >= 1 && (
              <div className="flex-1 flex flex-col min-h-0 overflow-hidden p-4">
                {/* Tab Container（仅在启用质量分析时显示） */}
                {optimizeState.state.enableQualityAnalysis && (
                  <div className="flex space-x-2 mb-4 flex-shrink-0">
                    <button
                      onClick={() => setActiveTab('analysis')}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors text-sm ${
                        activeTab === 'analysis'
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      质量分析
                    </button>
                    {optimizationStage >= 2 && (
                      <button
                        onClick={() => setActiveTab('result')}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors text-sm ${
                          activeTab === 'result'
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        优化结果
                      </button>
                    )}
                  </div>
                )}

                {/* 质量分析Tab（仅在启用时显示） */}
                {optimizeState.state.enableQualityAnalysis && activeTab === 'analysis' && (
                  <div className="flex-1 flex flex-col min-h-0">
                    {/* 流式输出中 */}
                    {optimizeState.state.isAnalyzing ? (
                      <div className="flex-1 flex flex-col overflow-hidden">
                        <div className="flex-1 overflow-y-auto bg-gray-50 rounded-lg p-4">
                          <pre className="text-xs text-gray-700 whitespace-pre-wrap font-mono">
                            {optimizeState.state.analysisText || 'AI正在分析中...'}
                          </pre>
                        </div>
                      </div>
                    ) : (
                      /* 分析完成 */
                      optimizeState.hasResult &&
                      optimizeState.state.result && (
                        <div className="flex-1 flex flex-col min-h-0">
                          <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                            {/* 整体评分 */}
                            <div className="border border-gray-200 rounded-lg p-4">
                              <div className="flex items-center justify-between mb-3">
                                <h4 className="text-sm font-medium text-gray-700">整体评分</h4>
                                <span
                                  className={`text-2xl font-bold ${getScoreClass(
                                    optimizeState.state.result.qualityAnalysis.overall_score
                                  )}`}
                                >
                                  {optimizeState.state.result.qualityAnalysis.overall_score}/100
                                </span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-3">
                                <div
                                  className={`h-3 rounded-full transition-all duration-500 ${getScoreBarClass(
                                    optimizeState.state.result.qualityAnalysis.overall_score
                                  )}`}
                                  style={{
                                    width: `${optimizeState.state.result.qualityAnalysis.overall_score}%`
                                  }}
                                ></div>
                              </div>
                            </div>

                            {/* 详细分析维度 */}
                            <div className="grid grid-cols-2 gap-3">
                              {Object.entries(optimizeState.state.result.qualityAnalysis.analysis).map(
                                ([key, item]) => {
                                  if (!item) return null
                                  return (
                                    <div
                                      key={key}
                                      className="border border-gray-200 rounded-lg p-3 hover:shadow-sm transition-shadow"
                                    >
                                      <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs font-medium text-gray-700">
                                          {getAnalysisLabel(key)}
                                        </span>
                                        <span className={`text-lg font-bold ${getScoreClass(item.score)}`}>
                                          {item.score}
                                        </span>
                                      </div>
                                      <p className="text-xs text-gray-600">{item.feedback}</p>
                                    </div>
                                  )
                                }
                              )}
                            </div>

                            {/* 具体问题分析 */}
                            {optimizeState.state.result.qualityAnalysis.issues &&
                              optimizeState.state.result.qualityAnalysis.issues.length > 0 && (
                                <div className="border border-orange-200 bg-orange-50 rounded-lg p-4">
                                  <h4 className="text-sm font-semibold text-orange-900 mb-3 flex items-center">
                                    <svg
                                      className="w-4 h-4 mr-2"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                      ></path>
                                    </svg>
                                    发现的具体问题
                                  </h4>
                                  <ul className="space-y-2">
                                    {optimizeState.state.result.qualityAnalysis.issues.map((issue, idx) => (
                                      <li key={idx} className="text-sm text-orange-800 flex items-start">
                                        <span className="text-orange-600 mr-2 flex-shrink-0">{idx + 1}.</span>
                                        <span className="flex-1">{issue}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                          </div>
                        </div>
                      )
                    )}
                  </div>
                )}

                {/* 优化结果Tab（禁用质量分析时直接显示，启用时通过tab切换） */}
                {(!optimizeState.state.enableQualityAnalysis || activeTab === 'result') && (
                  <div className="flex-1 flex flex-col min-h-0">
                    {/* 流式输出中 */}
                    {optimizeState.state.isOptimizingPrompt ? (
                      <div className="flex-1 flex flex-col overflow-hidden">
                        <div className="flex-1 overflow-y-auto bg-gray-50 rounded-lg p-4">
                          <pre className="text-xs text-gray-700 whitespace-pre-wrap font-mono">
                            {optimizeState.state.optimizedText || 'AI正在优化中...'}
                          </pre>
                        </div>
                      </div>
                    ) : (
                      /* 优化完成 */
                      optimizeState.hasResult &&
                      optimizeState.state.result && (
                        <div className="border rounded-lg overflow-hidden flex flex-col flex-1">
                          {/* 蓝色头部 */}
                          <div className="bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700 flex items-center justify-between flex-shrink-0">
                            <span>最终提示词</span>
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={handleRegenerate}
                                disabled={optimizeState.state.isOptimizing}
                                className="text-blue-500 hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                                title="重新生成"
                              >
                                <RefreshCw
                                  className={`w-4 h-4 ${optimizeState.state.isOptimizing ? 'animate-spin' : ''}`}
                                />
                              </button>
                              <button
                                onClick={() => handleCopy(currentOptimizedPrompt)}
                                className="text-blue-500 hover:text-blue-600"
                                title="复制到剪贴板"
                              >
                                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                              </button>
                            </div>
                          </div>

                          {/* 内容区 */}
                          <div className="p-3 bg-white flex-1 flex flex-col overflow-hidden">
                            <textarea
                              value={editablePrompt}
                              onChange={(e) => setEditablePrompt(e.target.value)}
                              className="w-full flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none resize-none"
                            />

                            {/* 底部按钮 */}
                            {currentOptimizedPrompt && (
                              <div className="space-y-2 pt-4 flex-shrink-0">
                                {/* 第一行：语言转换、保存 */}
                                <div className="flex space-x-2">
                                  <button
                                    onClick={handleToggleLanguage}
                                    disabled={optimizeState.state.isConvertingLanguage}
                                    className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                  >
                                    {optimizeState.state.isConvertingLanguage && (
                                      <RefreshCw className="w-4 h-4 animate-spin" />
                                    )}
                                    <span>
                                      {optimizeState.state.isConvertingLanguage
                                        ? '转换中...'
                                        : optimizeState.state.languageState === 'zh'
                                        ? '转为英文'
                                        : '转为中文'}
                                    </span>
                                  </button>
                                  <button
                                    onClick={handleSave}
                                    disabled={saving}
                                    className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                  >
                                    {saving && <RefreshCw className="w-4 h-4 animate-spin" />}
                                    <span>{saving ? '保存中...' : '保存到数据库'}</span>
                                  </button>
                                </div>
                                {/* 第二行：对比按钮 */}
                                <div className="flex">
                                  <button
                                    onClick={handleCompare}
                                    className="w-full flex items-center justify-center space-x-1 px-3 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                  >
                                    <ArrowLeftRight className="w-4 h-4" />
                                    <span>对比优化效果</span>
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 保存用户提示词弹窗 */}
      {showSaveDialog && (
        <SaveUserPromptDialog
          isOpen={showSaveDialog}
          promptContent={currentOptimizedPrompt}
          systemPrompt={optimizeState.state.systemPrompt}
          conversationHistory={optimizeState.state.conversationHistory}
          isSaving={saving}
          onSave={handleConfirmSave}
          onCancel={handleCancelSave}
        />
      )}
    </>
  )
}
