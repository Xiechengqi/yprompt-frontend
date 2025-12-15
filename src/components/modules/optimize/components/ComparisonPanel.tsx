// React版本的ComparisonPanel组件
import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { MessageSquare, ArrowLeft, RefreshCw, ArrowUp, FileText } from 'lucide-react'
import { marked } from 'marked'
import { useComparison, type ChatMessage } from '../hooks/useComparison'
import SystemPromptModal from './quick/SystemPromptModal'
import { useProviderStore } from '@/stores/providerStore'

export default function ComparisonPanel() {
  const comparison = useComparison()
  const enabledProviders = useProviderStore((state) => state.enabledProviders)
  const getProviderById = useProviderStore((state) => state.getProviderById)
  const getAvailableModelsByProvider = useProviderStore((state) => state.getAvailableModelsByProvider)

  // 对话容器引用
  const leftChatContainerRef = useRef<HTMLDivElement>(null)
  const rightChatContainerRef = useRef<HTMLDivElement>(null)

  // 本地状态
  const [comparisonMode, setComparisonMode] = useState<'system' | 'user'>('user')
  const [sharedInput, setSharedInput] = useState('')
  const [leftInput, setLeftInput] = useState('')
  const [rightInput, setRightInput] = useState('')
  const [isFromOptimize, setIsFromOptimize] = useState(false)

  // 模态框和选择器状态
  const [showLeftSystemPromptModal, setShowLeftSystemPromptModal] = useState(false)
  const [showRightSystemPromptModal, setShowRightSystemPromptModal] = useState(false)
  const [showLeftModelSelector, setShowLeftModelSelector] = useState(false)
  const [showRightModelSelector, setShowRightModelSelector] = useState(false)

  // 系统提示词值
  const [leftSystemPromptValue, setLeftSystemPromptValue] = useState('')
  const [rightSystemPromptValue, setRightSystemPromptValue] = useState('')

  // 模型选择
  const [leftProvider, setLeftProvider] = useState('')
  const [leftModel, setLeftModel] = useState('')
  const [rightProvider, setRightProvider] = useState('')
  const [rightModel, setRightModel] = useState('')

  // 计算属性
  const leftMessages = comparisonMode === 'system' 
    ? comparison.state.leftMessages 
    : comparison.state.leftUserMessages
  const rightMessages = comparisonMode === 'system'
    ? comparison.state.rightMessages
    : comparison.state.rightUserMessages

  const isGenerating = comparison.isGenerating
  const isLeftGenerating = comparison.state.isLeftGenerating
  const isRightGenerating = comparison.state.isRightGenerating

  // 可用的模型
  const leftAvailableModels = useMemo(() => {
    if (!leftProvider) return []
    return getAvailableModelsByProvider(leftProvider)
  }, [leftProvider, getAvailableModelsByProvider])

  const rightAvailableModels = useMemo(() => {
    if (!rightProvider) return []
    return getAvailableModelsByProvider(rightProvider)
  }, [rightProvider, getAvailableModelsByProvider])

  // 模型显示文本
  const leftModelDisplay = useMemo(() => {
    if (!leftProvider || !leftModel) return '使用全局模型'
    const provider = getProviderById(leftProvider)
    const model = leftAvailableModels.find(m => m.id === leftModel)
    return model ? `${provider?.name} - ${model.name}` : '使用全局模型'
  }, [leftProvider, leftModel, leftAvailableModels, getProviderById])

  const rightModelDisplay = useMemo(() => {
    if (!rightProvider || !rightModel) return '使用全局模型'
    const provider = getProviderById(rightProvider)
    const model = rightAvailableModels.find(m => m.id === rightModel)
    return model ? `${provider?.name} - ${model.name}` : '使用全局模型'
  }, [rightProvider, rightModel, rightAvailableModels, getProviderById])

  // 获取实际使用的provider和model（保留以备后用，支持自定义模型）
  // const getLeftProviderAndModel = useCallback((): [ProviderConfig | null, ModelConfig | null] => {
  //   if (leftProvider && leftModel) {
  //     const provider = getProviderById(leftProvider)
  //     const model = leftAvailableModels.find(m => m.id === leftModel)
  //     if (provider && model) return [provider, model]
  //   }
  //   return [currentProvider, currentModel]
  // }, [leftProvider, leftModel, leftAvailableModels, getProviderById, currentProvider, currentModel])

  // const getRightProviderAndModel = useCallback((): [ProviderConfig | null, ModelConfig | null] => {
  //   if (rightProvider && rightModel) {
  //     const provider = getProviderById(rightProvider)
  //     const model = rightAvailableModels.find(m => m.id === rightModel)
  //     if (provider && model) return [provider, model]
  //   }
  //   return [currentProvider, currentModel]
  // }, [rightProvider, rightModel, rightAvailableModels, getProviderById, currentProvider, currentModel])

  // 从localStorage加载数据
  useEffect(() => {
    // 加载保存的模型选择
    try {
      const savedModelConfig = localStorage.getItem('yprompt_comparison_model_config')
      if (savedModelConfig) {
        const modelConfig = JSON.parse(savedModelConfig)
        setLeftProvider(modelConfig.leftProvider || '')
        setLeftModel(modelConfig.leftModel || '')
        setRightProvider(modelConfig.rightProvider || '')
        setRightModel(modelConfig.rightModel || '')
      }
    } catch (e) {
      console.error('加载模型配置失败:', e)
    }

    // 加载对比数据
    try {
      const savedData = localStorage.getItem('yprompt_comparison_data')
      if (savedData) {
        const data = JSON.parse(savedData)
        setIsFromOptimize(true)

        if (data.mode === 'system') {
          setComparisonMode('system')
          comparison.initSystemComparison(data.originalPrompt, data.optimizedPrompt)
        } else if (data.mode === 'user') {
          setComparisonMode('user')
          comparison.initUserComparison(
            data.systemPrompt || '',
            data.originalPrompt,
            data.optimizedPrompt
          )
          setLeftInput(data.originalPrompt)
          setRightInput(data.optimizedPrompt)
        }
      }
    } catch (e) {
      console.error('加载对比数据失败:', e)
    }
  }, [comparison])

  // 同步系统提示词
  useEffect(() => {
    if (comparisonMode === 'system') {
      setLeftSystemPromptValue(comparison.state.systemConfig.leftSystemPrompt)
      setRightSystemPromptValue(comparison.state.systemConfig.rightSystemPrompt)
    } else {
      const shared = comparison.state.userConfig.sharedSystemPrompt
      setLeftSystemPromptValue(shared)
      setRightSystemPromptValue(shared)
    }
  }, [
    comparisonMode,
    comparison.state.systemConfig.leftSystemPrompt,
    comparison.state.systemConfig.rightSystemPrompt,
    comparison.state.userConfig.sharedSystemPrompt
  ])

  // 保存模型配置
  useEffect(() => {
    const modelConfig = {
      leftProvider,
      leftModel,
      rightProvider,
      rightModel
    }
    localStorage.setItem('yprompt_comparison_model_config', JSON.stringify(modelConfig))
  }, [leftProvider, leftModel, rightProvider, rightModel])

  // 自动滚动到底部
  const scrollToBottom = useCallback((container: HTMLDivElement | null) => {
    if (container) {
      setTimeout(() => {
        container.scrollTop = container.scrollHeight
      }, 0)
    }
  }, [])

  useEffect(() => {
    scrollToBottom(leftChatContainerRef.current)
  }, [leftMessages, isLeftGenerating, scrollToBottom])

  useEffect(() => {
    scrollToBottom(rightChatContainerRef.current)
  }, [rightMessages, isRightGenerating, scrollToBottom])

  // 系统提示词模式：发送消息
  const handleSendSystemMessage = useCallback(async () => {
    if (!sharedInput.trim()) return
    comparison.setState(prev => ({
      ...prev,
      systemConfig: {
        ...prev.systemConfig,
        sharedUserInput: sharedInput
      }
    }))
    await comparison.sendSystemMessage()
    setSharedInput('')
  }, [sharedInput, comparison])

  // 用户提示词模式：发送左侧消息
  const handleSendLeftMessage = useCallback(async () => {
    if (!leftInput.trim()) return
    comparison.setState(prev => ({
      ...prev,
      userConfig: {
        ...prev.userConfig,
        leftUserPrompt: leftInput
      }
    }))
    await comparison.sendLeftUserMessage()
  }, [leftInput, comparison])

  // 用户提示词模式：发送右侧消息
  const handleSendRightMessage = useCallback(async () => {
    if (!rightInput.trim()) return
    comparison.setState(prev => ({
      ...prev,
      userConfig: {
        ...prev.userConfig,
        rightUserPrompt: rightInput
      }
    }))
    await comparison.sendRightUserMessage()
  }, [rightInput, comparison])

  // 清空对话
  const handleClearLeft = () => {
    if (confirm('确定清空左侧对话历史吗？')) {
      comparison.clearHistory('left')
    }
  }

  const handleClearRight = () => {
    if (confirm('确定清空右侧对话历史吗？')) {
      comparison.clearHistory('right')
    }
  }

  // 重置
  const handleReset = () => {
    if (confirm('确定要重置所有数据吗？这将清空所有对话和设置。')) {
      comparison.clearHistory('left')
      comparison.clearHistory('right')
      comparison.setState(prev => ({
        ...prev,
        systemConfig: {
          leftSystemPrompt: '',
          rightSystemPrompt: '',
          sharedUserInput: ''
        },
        userConfig: {
          sharedSystemPrompt: '',
          leftUserPrompt: '',
          rightUserPrompt: ''
        }
      }))
      setSharedInput('')
      setLeftInput('')
      setRightInput('')
      setLeftSystemPromptValue('')
      setRightSystemPromptValue('')
      localStorage.removeItem('yprompt_comparison_data')
      localStorage.removeItem('yprompt_trigger_compare')
    }
  }

  // 返回优化页面
  const handleBack = () => {
    localStorage.removeItem('yprompt_trigger_compare')
    const mode = comparisonMode === 'system' ? 'system' : 'user'
    localStorage.setItem('yprompt_optimize_active_mode', mode)
    localStorage.setItem('yprompt_back_to_optimize', 'true')
  }

  // 系统提示词保存处理
  const handleSaveLeftSystemPrompt = () => {
    comparison.setState(prev => {
      if (comparisonMode === 'system') {
        return {
          ...prev,
          systemConfig: {
            ...prev.systemConfig,
            leftSystemPrompt: leftSystemPromptValue
          }
        }
      } else {
        return {
          ...prev,
          userConfig: {
            ...prev.userConfig,
            sharedSystemPrompt: leftSystemPromptValue
          }
        }
      }
    })
  }

  const handleSaveRightSystemPrompt = () => {
    comparison.setState(prev => {
      if (comparisonMode === 'system') {
        return {
          ...prev,
          systemConfig: {
            ...prev.systemConfig,
            rightSystemPrompt: rightSystemPromptValue
          }
        }
      } else {
        return {
          ...prev,
          userConfig: {
            ...prev.userConfig,
            sharedSystemPrompt: rightSystemPromptValue
          }
        }
      }
    })
  }

  // 键盘事件处理
  const handleSharedKeydown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (sharedInput.trim() && !isGenerating) {
        handleSendSystemMessage()
      }
    }
  }

  const handleLeftKeydown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (leftInput.trim() && !isLeftGenerating) {
        handleSendLeftMessage()
      }
    }
  }

  const handleRightKeydown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (rightInput.trim() && !isRightGenerating) {
        handleSendRightMessage()
      }
    }
  }

  // Markdown渲染
  const renderMarkdown = (content: string): string => {
    try {
      return marked(content) as string
    } catch (e) {
      console.error('Markdown渲染失败:', e)
      return content
    }
  }

  // 渲染消息
  const renderMessage = (msg: ChatMessage) => {
    const isUser = msg.role === 'user'
    return (
      <div key={msg.id} className={`flex group ${isUser ? 'justify-end' : 'justify-start'}`}>
        <div className="flex flex-col w-full max-w-xs lg:max-w-md">
          <div
            className={`${
              isUser
                ? 'bg-blue-500 text-white px-4 py-3 rounded-lg ml-auto'
                : 'bg-gray-100 text-gray-800 px-4 py-3 rounded-lg mr-auto'
            } transition-all duration-300 relative`}
          >
            {isUser ? (
              <div className="whitespace-pre-wrap">
                {msg.content}
                {msg.isStreaming && <span className="animate-pulse">▋</span>}
              </div>
            ) : (
              <div
                className="prose prose-sm max-w-none prose-headings:text-gray-800 prose-p:text-gray-800 prose-li:text-gray-800 prose-strong:text-gray-800"
                dangerouslySetInnerHTML={{ __html: renderMarkdown(msg.content) }}
              />
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full min-h-0 overflow-hidden flex flex-col">
      {/* 上部：两个对话窗口 */}
      <div className="flex-1 min-h-0 grid grid-cols-2 gap-4 mb-4">
        {/* 左侧：优化前 */}
        <div className="flex flex-col bg-white rounded-lg shadow-sm overflow-hidden">
          {/* 头部 */}
          <div className="p-4 border-b border-gray-200 flex-shrink-0">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <h4 className="font-semibold text-gray-800">优化前</h4>
                <button
                  onClick={() => setShowLeftSystemPromptModal(true)}
                  className={`flex items-center gap-1 px-2 py-1 hover:bg-gray-100 rounded transition-colors text-sm ${
                    comparisonMode === 'system'
                      ? comparison.state.systemConfig.leftSystemPrompt.trim()
                      : comparison.state.userConfig.sharedSystemPrompt.trim()
                        ? 'text-green-600'
                        : 'text-gray-400'
                  }`}
                  title="设置系统提示词"
                >
                  <FileText className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setShowLeftModelSelector(!showLeftModelSelector)}
                  className={`p-1 hover:bg-gray-100 rounded transition-colors ${
                    leftModel ? 'text-green-600' : 'text-gray-600'
                  }`}
                  title={leftModelDisplay}
                >
                  <svg className="w-4 h-4 hover:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4 4m4-4l-4-4m0 6H4m0 0l4 4m-4-4l4-4"/>
                  </svg>
                </button>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleReset}
                  className="flex items-center gap-1 px-3 py-1 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded transition-colors"
                  title="重置所有数据"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>重置</span>
                </button>
                <button
                  onClick={handleClearLeft}
                  className="flex items-center gap-1 px-3 py-1 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                  title="清空对话"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>清空</span>
                </button>
              </div>
            </div>
          </div>

          {/* 模型选择器 - 左侧 */}
          {showLeftModelSelector && (
            <div className="px-4 pb-2 border-b border-gray-200 bg-gray-50">
              <div className="py-2 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">选择AI模型</label>
                  {leftProvider && (
                    <button
                      onClick={() => {
                        setLeftProvider('')
                        setLeftModel('')
                      }}
                      className="px-2 py-1 text-xs text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded transition-colors"
                      title="重置为全局模型"
                    >
                      重置
                    </button>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <select
                    value={leftProvider}
                    onChange={(e) => {
                      setLeftProvider(e.target.value)
                      setLeftModel('')
                    }}
                    className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">使用全局模型</option>
                    {enabledProviders.map((provider) => (
                      <option key={provider.id} value={provider.id}>
                        {provider.name}
                      </option>
                    ))}
                  </select>
                  <select
                    value={leftModel}
                    onChange={(e) => setLeftModel(e.target.value)}
                    disabled={!leftProvider}
                    className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:bg-gray-100"
                  >
                    <option value="">选择模型</option>
                    {leftAvailableModels.map((model) => (
                      <option key={model.id} value={model.id}>
                        {model.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="text-xs text-gray-500">
                  {!leftProvider ? (
                    <span>当前: 跟随全局模型设置</span>
                  ) : !leftModel ? (
                    <span>请选择模型</span>
                  ) : (
                    <span>当前: {leftModelDisplay}</span>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="flex-1 flex flex-col min-h-0">
            {/* 对话历史 */}
            <div ref={leftChatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
              {leftMessages.length === 0 ? (
                <div className="flex items-center justify-center h-full text-gray-400">
                  <div className="text-center">
                    <MessageSquare className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">暂无对话</p>
                  </div>
                </div>
              ) : (
                leftMessages.map(renderMessage)
              )}
            </div>

            {/* 用户模式：独立输入框 */}
            {comparisonMode === 'user' && (
              <div className="p-3 border-t border-gray-200">
                <div className="relative border border-gray-300 rounded-2xl focus-within:outline-none focus-within:border-gray-300 overflow-hidden" style={{ height: '120px' }}>
                  <div className="absolute top-0 left-0 right-0" style={{ bottom: '48px' }}>
                    <textarea
                      value={leftInput}
                      onChange={(e) => setLeftInput(e.target.value)}
                      onKeyDown={handleLeftKeydown}
                      placeholder="Shift+Enter换行"
                      className="w-full h-full px-2 pt-3 pb-1 border-0 outline-none resize-none disabled:opacity-50 text-base overflow-y-auto bg-transparent"
                      disabled={isLeftGenerating}
                      rows={1}
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-12 flex justify-between items-center px-2 bg-transparent pointer-events-none">
                    <div className="w-8 h-8"></div>
                    <button
                      onClick={handleSendLeftMessage}
                      disabled={!leftInput.trim() || isLeftGenerating}
                      className="w-8 h-8 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center pointer-events-auto"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 右侧：优化后 */}
        <div className="flex flex-col bg-white rounded-lg shadow-sm overflow-hidden">
          {/* 头部 */}
          <div className="p-4 border-b border-gray-200 flex-shrink-0">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <h4 className="font-semibold text-gray-800">优化后</h4>
                <button
                  onClick={() => setShowRightSystemPromptModal(true)}
                  className={`flex items-center gap-1 px-2 py-1 hover:bg-gray-100 rounded transition-colors text-sm ${
                    comparisonMode === 'system'
                      ? comparison.state.systemConfig.rightSystemPrompt.trim()
                      : comparison.state.userConfig.sharedSystemPrompt.trim()
                        ? 'text-green-600'
                        : 'text-gray-400'
                  }`}
                  title="设置系统提示词"
                >
                  <FileText className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setShowRightModelSelector(!showRightModelSelector)}
                  className={`p-1 hover:bg-gray-100 rounded transition-colors ${
                    rightModel ? 'text-green-600' : 'text-gray-600'
                  }`}
                  title={rightModelDisplay}
                >
                  <svg className="w-4 h-4 hover:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4 4m4-4l-4-4m0 6H4m0 0l4 4m-4-4l4-4"/>
                  </svg>
                </button>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleClearRight}
                  className="flex items-center gap-1 px-3 py-1 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                  title="清空对话"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>清空</span>
                </button>
                {isFromOptimize && (
                  <button
                    onClick={handleBack}
                    className="flex items-center gap-1 px-3 py-1 text-sm bg-blue-500 text-white hover:bg-blue-600 rounded transition-colors"
                    title="返回优化页面"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>返回</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* 模型选择器 - 右侧 */}
          {showRightModelSelector && (
            <div className="px-4 pb-2 border-b border-gray-200 bg-gray-50">
              <div className="py-2 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">选择AI模型</label>
                  {rightProvider && (
                    <button
                      onClick={() => {
                        setRightProvider('')
                        setRightModel('')
                      }}
                      className="px-2 py-1 text-xs text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded transition-colors"
                      title="重置为全局模型"
                    >
                      重置
                    </button>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <select
                    value={rightProvider}
                    onChange={(e) => {
                      setRightProvider(e.target.value)
                      setRightModel('')
                    }}
                    className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">使用全局模型</option>
                    {enabledProviders.map((provider) => (
                      <option key={provider.id} value={provider.id}>
                        {provider.name}
                      </option>
                    ))}
                  </select>
                  <select
                    value={rightModel}
                    onChange={(e) => setRightModel(e.target.value)}
                    disabled={!rightProvider}
                    className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:bg-gray-100"
                  >
                    <option value="">选择模型</option>
                    {rightAvailableModels.map((model) => (
                      <option key={model.id} value={model.id}>
                        {model.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="text-xs text-gray-500">
                  {!rightProvider ? (
                    <span>当前: 跟随全局模型设置</span>
                  ) : !rightModel ? (
                    <span>请选择模型</span>
                  ) : (
                    <span>当前: {rightModelDisplay}</span>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="flex-1 flex flex-col min-h-0">
            {/* 对话历史 */}
            <div ref={rightChatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
              {rightMessages.length === 0 ? (
                <div className="flex items-center justify-center h-full text-gray-400">
                  <div className="text-center">
                    <MessageSquare className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">暂无对话</p>
                  </div>
                </div>
              ) : (
                rightMessages.map(renderMessage)
              )}
            </div>

            {/* 用户模式：独立输入框 */}
            {comparisonMode === 'user' && (
              <div className="p-3 border-t border-gray-200">
                <div className="relative border border-gray-300 rounded-2xl focus-within:outline-none focus-within:border-gray-300 overflow-hidden" style={{ height: '120px' }}>
                  <div className="absolute top-0 left-0 right-0" style={{ bottom: '48px' }}>
                    <textarea
                      value={rightInput}
                      onChange={(e) => setRightInput(e.target.value)}
                      onKeyDown={handleRightKeydown}
                      placeholder="Shift+Enter换行"
                      className="w-full h-full px-2 pt-3 pb-1 border-0 outline-none resize-none disabled:opacity-50 text-base overflow-y-auto bg-transparent"
                      disabled={isRightGenerating}
                      rows={1}
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-12 flex justify-between items-center px-2 bg-transparent pointer-events-none">
                    <div className="w-8 h-8"></div>
                    <button
                      onClick={handleSendRightMessage}
                      disabled={!rightInput.trim() || isRightGenerating}
                      className="w-8 h-8 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center pointer-events-auto"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 下部：输入框区域 - 系统模式共用输入框 */}
      {comparisonMode === 'system' && (
        <div className="flex-shrink-0">
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-3">
            <div className="relative border border-gray-300 rounded-2xl focus-within:outline-none focus-within:border-gray-300 overflow-hidden" style={{ height: '120px' }}>
              <div className="absolute top-0 left-0 right-0" style={{ bottom: '48px' }}>
                <textarea
                  value={sharedInput}
                  onChange={(e) => setSharedInput(e.target.value)}
                  onKeyDown={handleSharedKeydown}
                  placeholder="Shift+Enter换行"
                  className="w-full h-full px-2 pt-3 pb-1 border-0 outline-none resize-none disabled:opacity-50 text-base overflow-y-auto bg-transparent"
                  disabled={isGenerating}
                  rows={1}
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-12 flex justify-between items-center px-2 bg-transparent pointer-events-none">
                <div className="w-8 h-8"></div>
                <button
                  onClick={handleSendSystemMessage}
                  disabled={!sharedInput.trim() || isGenerating}
                  className="w-8 h-8 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center pointer-events-auto"
                  title="同时发送到两侧"
                >
                  <ArrowUp className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 系统提示词模态框 - 左侧 */}
      {showLeftSystemPromptModal && (
        <SystemPromptModal
          isOpen={showLeftSystemPromptModal}
          modelValue={leftSystemPromptValue}
          onUpdateModelValue={setLeftSystemPromptValue}
          onClose={() => setShowLeftSystemPromptModal(false)}
          onSave={handleSaveLeftSystemPrompt}
        />
      )}

      {/* 系统提示词模态框 - 右侧 */}
      {showRightSystemPromptModal && (
        <SystemPromptModal
          isOpen={showRightSystemPromptModal}
          modelValue={rightSystemPromptValue}
          onUpdateModelValue={setRightSystemPromptValue}
          onClose={() => setShowRightSystemPromptModal(false)}
          onSave={handleSaveRightSystemPrompt}
        />
      )}
    </div>
  )
}
